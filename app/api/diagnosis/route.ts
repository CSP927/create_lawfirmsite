import { NextRequest, NextResponse } from 'next/server';

const PAGESPEED_API_KEY = 'AIzaSyA2hXiinruK-4zbqmiIE22vkqHNN9KN-Vw';

async function fetchHtml(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      headers: { 'User-Agent': 'Mozilla/5.0' },
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
      signal: AbortSignal.timeout(5000),
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function fetchPageSpeedSeo(url: string): Promise<number> {
  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=SEO&key=${PAGESPEED_API_KEY}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    const score = data?.lighthouseResult?.categories?.seo?.score;
    return score != null ? Math.round(score * 100) : 0;
  } catch {
    return 0;
  }
}

function extractLlmsInfo(content: string) {
  return { exists: content.length > 0, length: content.length };
}

function extractJsonLdTypes(html: string): string[] {
  const matches = html.match(/"@type"\s*:\s*"([^"]+)"/g) || [];
  const types = matches.map((m) => m.match(/"([^"]+)"$/)?.[1] || '').filter(Boolean);
  return [...new Set(types)];
}

function extractSitemapCount(sitemapXml: string): number {
  const urls = sitemapXml.match(/<loc>/g);
  return urls ? urls.length : 0;
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
  // www 제거한 루트 도메인 (예: www.daeryunlaw.com → daeryunlaw.com)
  const rootDomain = domain.replace(/^www\./, '');
  const blocklist = ['google', 'kakao', 'youtube', 'naver', 'facebook', 'instagram', 'twitter', 'tistory', 'pf.kakao'];

  const linkMatches = html.match(/href="https?:\/\/([^"\/]+)/g) || [];
  const externalDomains = linkMatches
    .map((m) => m.replace(/href="https?:\/\//, '').split('/')[0].toLowerCase())
    .filter((d) => {
      if (!d || !d.includes('.')) return false;
      if (d.includes(rootDomain)) return false;
      if (blocklist.some((b) => d.includes(b))) return false;
      return true;
    });

  const unique = [...new Set(externalDomains)];
  if (unique.length > 0) {
    return { pass: true, desc: `독립 도메인: ${unique[0]}` };
  }
  return { pass: false, desc: '없음' };
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: 'URL이 필요합니다' }, { status: 400 });

    const baseUrl = url.startsWith('http') ? url.replace(/\/$/, '') : `https://${url}`.replace(/\/$/, '');
    const urlObj = new URL(baseUrl);
    const domain = urlObj.hostname;

    const [html, llmsContent, sitemapContent, robotsExists, seoScore] = await Promise.all([
      fetchHtml(baseUrl),
      fetch(`${urlObj.origin}/llms.txt`, { signal: AbortSignal.timeout(5000) }).then((r) => r.ok ? r.text() : '').catch(() => ''),
      fetch(`${urlObj.origin}/sitemap.xml`, { signal: AbortSignal.timeout(5000) }).then((r) => r.ok ? r.text() : '').catch(() => ''),
      checkUrl(`${urlObj.origin}/robots.txt`),
      fetchPageSpeedSeo(baseUrl),
    ]);

    const llmsInfo = extractLlmsInfo(llmsContent);
    const jsonLdTypes = extractJsonLdTypes(html);
    const hasFaqPage = html.includes('FAQPage');
    const sitemapCount = extractSitemapCount(sitemapContent);
    const ogCount = extractOgCount(html);
    const hasSuccessCases = checkSuccessCases(html);
    const specializedSite = checkSpecializedSite(html, domain);

    const items = [
      {
        key: 'llmsTxt',
        label: 'llms.txt 파일',
        desc: llmsInfo.exists ? `llms.txt 존재 (${llmsInfo.length}자)` : 'llms.txt 없음 (404)',
        pass: llmsInfo.exists,
        point: 20,
      },
      {
        key: 'jsonLd',
        label: 'JSON-LD 구조화 데이터',
        desc: jsonLdTypes.length > 0
          ? `JSON-LD ${jsonLdTypes.length}개 (${jsonLdTypes.slice(0, 3).join(', ')})`
          : 'JSON-LD 없음',
        pass: jsonLdTypes.length > 0,
        point: 20,
      },
      {
        key: 'faqPage',
        label: 'FAQPage 스키마',
        desc: hasFaqPage ? 'FAQPage 적용됨' : 'FAQPage 없음',
        pass: hasFaqPage,
        point: 15,
      },
      {
        key: 'successCases',
        label: '성공사례 독립 URL',
        desc: hasSuccessCases ? '성공사례 페이지 있음' : '없음',
        pass: hasSuccessCases,
        point: 15,
      },
      {
        key: 'sitemap',
        label: 'sitemap.xml 등록',
        desc: sitemapCount > 0 ? `sitemap 존재 (${sitemapCount}개)` : 'sitemap 없음',
        pass: sitemapCount > 0,
        point: 10,
      },
      {
        key: 'robotsTxt',
        label: 'robots.txt 설정',
        desc: robotsExists ? 'robots.txt 정상' : '없음',
        pass: robotsExists,
        point: 5,
      },
      {
        key: 'pageSpeed',
        label: '페이지 로딩 속도',
        desc: `OG ${ogCount}/3`,
        pass: seoScore >= 80,
        point: seoScore >= 80 ? 8 : Math.round(seoScore / 10),
      },
      {
        key: 'ogTags',
        label: 'Open Graph 메타태그',
        desc: ogCount >= 2 ? '있음' : '없음',
        pass: ogCount >= 2,
        point: 4,
      },
      {
        key: 'specializedSite',
        label: '전문영역 독립 사이트',
        desc: specializedSite.desc,
        pass: specializedSite.pass,
        point: 3,
      },
    ];

    const totalScore = items.reduce((acc, item) => acc + (item.pass ? item.point : 0), 0);

    return NextResponse.json({ items, totalScore, seoScore, domain });
  } catch (e) {
    return NextResponse.json({ error: '분석 중 오류가 발생했습니다' }, { status: 500 });
  }
}