import { NextRequest, NextResponse } from 'next/server';

const DOMAIN_BLOCKLIST = [
  'google', 'gstatic', 'googleapis', 'kakao', 'youtube', 'naver',
  'facebook', 'instagram', 'twitter', 'tistory', 'adobe', 'jquery',
  'cloudflare', 'cdn', 'amazonaws', 'unpkg', 'jsdelivr', 'wp.com',
  'pstatic', 'daumcdn', 'kakaocdn', 'bootstrapcdn', 'fontawesome',
  'typekit', 'fonts.com', 'gravatar', 'gmpg.org', 'ogp.me',
  'schema.org', 'w3.org', 'xmlsoap.org', 'microsoft', 'apple',
  'icloud', 'akamai', 'fastly', 'vercel', 'netlify', 'github',
  'doubleclick', 'adsense', 'analytics', 'wix', 'squarespace',
  'go.kr', 'or.kr', 'ac.kr', 'ne.kr', 'lawmaking.go.kr',
  'scourt.go.kr', 'moleg.go.kr', 'law.go.kr', 'supreme.court',
  'mycafe24.com', 'cafe24.com', 'imweb.me', 'modoo.at', 'sixshop.com',
  'godaddy.com', 'hosting.kr', 'gabia.com', 'whaledesign',
];

// www.sowise.co.kr → sowise.co.kr / www.daeryunlaw.com → daeryunlaw.com
function getRootDomain(domain: string): string {
  return domain.replace(/^www\./, '');
}

async function fetchHtml(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(6000),
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' },
    });
    return res.ok ? await res.text() : '';
  } catch {
    return '';
  }
}

async function checkUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(4000),
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    return res.ok;
  } catch {
    return false;
  }
}

function extractJsonLdTypes(html: string): string[] {
  const matches = html.match(/"@type"\s*:\s*"([^"]+)"/g) || [];
  const types = matches.map((m) => m.match(/"([^"]+)"$/)?.[1] || '').filter(Boolean);
  return [...new Set(types)];
}

function extractSitemapCount(xml: string): number {
  return (xml.match(/<loc>/g) || []).length;
}

function extractOgCount(html: string): number {
  let count = 0;
  if (html.includes('og:title')) count++;
  if (html.includes('og:description')) count++;
  if (html.includes('og:image')) count++;
  return count;
}

function checkSuccessCases(html: string): boolean {
  return (
    html.includes('/cases/') ||
    html.includes('/success-cases/') ||
    html.includes('/성공사례/') ||
    html.includes('/사례/')
  );
}

function checkSpecializedSite(html: string, domain: string): { pass: boolean; desc: string } {
  const rootDomain = getRootDomain(domain); // www 제거한 도메인
  const linkMatches = html.match(/href="https?:\/\/([^"\/]+)/g) || [];
  const externalDomains = linkMatches
    .map((m) => m.replace(/href="https?:\/\//, '').split('/')[0].toLowerCase().replace(/^www\./, ''))
    .filter((d) => {
      if (!d || !d.includes('.')) return false;
      if (d === rootDomain) return false; // 완전히 동일한 도메인만 제외
      if (DOMAIN_BLOCKLIST.some((b) => d.includes(b))) return false;
      return true;
    });
  const unique = [...new Set(externalDomains)];
  return unique.length > 0
    ? { pass: true, desc: `독립 도메인: ${unique[0]}` }
    : { pass: false, desc: '없음' };
}

function calcSeoScore(html: string, hasLlms: boolean, hasJsonLd: boolean, hasSitemap: boolean, hasRobots: boolean): number {
  let score = 0;
  if (html.includes('<title>') && !html.includes('<title></title>')) score += 15;
  if (html.includes('name="description"') || html.includes("name='description'")) score += 15;
  if (html.includes('rel="canonical"') || html.includes("rel='canonical'")) score += 10;
  if (html.includes('og:title')) score += 10;
  if (hasJsonLd) score += 15;
  if (hasLlms) score += 10;
  if (hasSitemap) score += 10;
  if (hasRobots) score += 5;
  if (html.includes('name="viewport"') || html.includes("name='viewport'")) score += 10;
  return Math.min(score, 100);
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: 'URL이 필요합니다' }, { status: 400 });

    const baseUrl = url.startsWith('http') ? url.replace(/\/$/, '') : `https://${url}`.replace(/\/$/, '');
    const urlObj = new URL(baseUrl);
    const domain = urlObj.hostname;

    const [html, llmsContent, robotsContent] = await Promise.all([
      fetchHtml(baseUrl),
      fetch(`${urlObj.origin}/llms.txt`, { signal: AbortSignal.timeout(4000), redirect: 'follow' }).then((r) => r.ok ? r.text() : '').catch(() => ''),
      fetch(`${urlObj.origin}/robots.txt`, { signal: AbortSignal.timeout(4000), redirect: 'follow' }).then((r) => r.ok ? r.text() : '').catch(() => ''),
    ]);

    const robotsExists = robotsContent.length > 0;

    // robots.txt에서 sitemap URL 추출 후 체크
    const sitemapUrls: string[] = [];
    const robotsSitemapMatches = robotsContent.match(/Sitemap:\s*(.+)/gi) || [];
    robotsSitemapMatches.forEach((line) => {
      const u = line.replace(/Sitemap:\s*/i, '').trim();
      if (u.startsWith('http')) sitemapUrls.push(u);
    });
    if (sitemapUrls.length === 0) sitemapUrls.push(`${urlObj.origin}/sitemap.xml`);

    // 모든 sitemap URL 체크
    const sitemapContents = await Promise.all(
      sitemapUrls.map((u) =>
        fetch(u, { signal: AbortSignal.timeout(4000), redirect: 'follow' }).then((r) => r.ok ? r.text() : '').catch(() => '')
      )
    );
    const sitemapContent = sitemapContents.join('');

    const llmsLength = llmsContent.length;
    const jsonLdTypes = extractJsonLdTypes(html);
    const hasFaqPage = html.includes('FAQPage');
    const sitemapCount = extractSitemapCount(sitemapContent);
    const ogCount = extractOgCount(html);
    const hasSuccessCases = checkSuccessCases(html);
    const specializedSite = checkSpecializedSite(html, domain);
    const seoScore = calcSeoScore(html, llmsLength > 0, jsonLdTypes.length > 0, sitemapCount > 0, robotsExists);

    const items = [
      { key: 'llmsTxt', label: 'llms.txt 파일', desc: llmsLength > 0 ? `llms.txt 존재 (${llmsLength}자)` : 'llms.txt 없음 (404)', pass: llmsLength > 0, point: 20 },
      { key: 'jsonLd', label: 'JSON-LD 구조화 데이터', desc: jsonLdTypes.length > 0 ? `JSON-LD ${jsonLdTypes.length}개 (${jsonLdTypes.slice(0, 3).join(', ')})` : 'JSON-LD 없음', pass: jsonLdTypes.length > 0, point: 20 },
      { key: 'faqPage', label: 'FAQPage 스키마', desc: hasFaqPage ? 'FAQPage 적용됨' : 'FAQPage 없음', pass: hasFaqPage, point: 15 },
      { key: 'successCases', label: '성공사례 독립 URL', desc: hasSuccessCases ? '성공사례 페이지 있음' : '없음', pass: hasSuccessCases, point: 15 },
      { key: 'sitemap', label: 'sitemap.xml 등록', desc: sitemapCount > 0 ? `sitemap 존재 (${sitemapCount}개)` : 'sitemap 없음', pass: sitemapCount > 0, point: 10 },
      { key: 'robotsTxt', label: 'robots.txt 설정', desc: robotsExists ? 'robots.txt 정상' : '없음', pass: robotsExists, point: 5 },
      { key: 'pageSpeed', label: '페이지 SEO 점수', desc: `SEO 분석 ${seoScore}점`, pass: seoScore >= 70, point: seoScore >= 70 ? 8 : 0 },
      { key: 'ogTags', label: 'Open Graph 메타태그', desc: `OG ${ogCount}/3`, pass: ogCount >= 2, point: 4 },
      { key: 'specializedSite', label: '전문영역 독립 사이트', desc: specializedSite.desc, pass: specializedSite.pass, point: 3 },
    ];

    const totalScore = items.reduce((acc, item) => acc + (item.pass ? item.point : 0), 0);
    return NextResponse.json({ items, totalScore, domain });
  } catch {
    return NextResponse.json({ error: '분석 중 오류가 발생했습니다' }, { status: 500 });
  }
}