import { NextRequest, NextResponse } from 'next/server';

const PAGESPEED_API_KEY = 'AIzaSyA2hXiinruK-4zbqmiIE22vkqHNN9KN-Vw';

async function checkUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(5000) });
    return res.ok;
  } catch {
    return false;
  }
}

async function fetchPageSpeed(url: string): Promise<number> {
  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=SEO&key=${PAGESPEED_API_KEY}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    const score = data?.lighthouseResult?.categories?.seo?.score;
    return score ? Math.round(score * 100) : 0;
  } catch {
    return 0;
  }
}

async function checkJsonLd(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    const html = await res.text();
    return html.includes('application/ld+json');
  } catch {
    return false;
  }
}

async function checkFaqPage(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    const html = await res.text();
    return html.includes('FAQPage');
  } catch {
    return false;
  }
}

async function checkOgTags(url: string): Promise<number> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    const html = await res.text();
    let count = 0;
    if (html.includes('og:title')) count++;
    if (html.includes('og:description')) count++;
    if (html.includes('og:image')) count++;
    return count;
  } catch {
    return 0;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: 'URL이 필요합니다' }, { status: 400 });

    const baseUrl = url.startsWith('http') ? url : `https://${url}`;
    const domain = new URL(baseUrl).origin;

    const [
      llmsTxt,
      sitemap,
      robotsTxt,
      jsonLd,
      faqPage,
      ogCount,
      seoScore,
    ] = await Promise.all([
      checkUrl(`${domain}/llms.txt`),
      checkUrl(`${domain}/sitemap.xml`),
      checkUrl(`${domain}/robots.txt`),
      checkJsonLd(baseUrl),
      checkFaqPage(baseUrl),
      checkOgTags(baseUrl),
      fetchPageSpeed(baseUrl),
    ]);

    const items = [
      { key: 'llmsTxt', label: 'llms.txt 파일', desc: llmsTxt ? '적용됨' : 'llms.txt 없음 (404)', pass: llmsTxt, point: 20 },
      { key: 'jsonLd', label: 'JSON-LD 구조화 데이터', desc: jsonLd ? '적용됨' : 'JSON-LD 없음', pass: jsonLd, point: 20 },
      { key: 'faqPage', label: 'FAQPage 스키마', desc: faqPage ? '적용됨' : 'FAQPage 없음', pass: faqPage, point: 15 },
      { key: 'sitemap', label: 'sitemap.xml 등록', desc: sitemap ? '적용됨' : 'sitemap 없음', pass: sitemap, point: 10 },
      { key: 'robotsTxt', label: 'robots.txt 설정', desc: robotsTxt ? '적용됨' : '없음', pass: robotsTxt, point: 10 },
      { key: 'ogTags', label: 'Open Graph 메타태그', desc: `OG ${ogCount}/3`, pass: ogCount >= 2, point: 10 },
      { key: 'seoScore', label: '페이지 SEO 점수', desc: `PageSpeed SEO ${seoScore}점`, pass: seoScore >= 80, point: 15 },
    ];

    const totalScore = items.reduce((acc, item) => acc + (item.pass ? item.point : 0), 0);

    return NextResponse.json({ items, totalScore, seoScore });
  } catch (e) {
    return NextResponse.json({ error: '분석 중 오류가 발생했습니다' }, { status: 500 });
  }
}