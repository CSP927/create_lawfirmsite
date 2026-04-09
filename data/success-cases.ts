export type SuccessCase = {
  slug: string;
  group: 'lawfirm' | 'lawoffice' | 'legalcorp';
  category: string;
  title: string;
  summary: string;
  result: string;
  period: string;
  tags: string[];
  date: string;
};

export const SUCCESS_CASES: SuccessCase[] = [
  {
    slug: 'lawfirm-seo-rank-01',
    group: 'lawfirm',
    category: 'ai-seo',
    title: '교통사고 전문 법무법인 — 구글 상위 3위 달성',
    summary:
      '교통사고 손해배상 전문 법무법인. 기존 사이트는 SEO 구조 전무, 월 유입 200명 수준이었습니다.',
    result: '리뉴얼 3개월 후 구글 "교통사고 법무법인" 3위, 월 유입 4,200명 달성',
    period: '제작 기간 4주',
    tags: ['법무법인', '교통사고', 'SEO', 'AI검색'],
    date: '2025-11',
  },
  {
    slug: 'lawoffice-ai-search-01',
    group: 'lawoffice',
    category: 'llms-txt',
    title: '형사 전문 법률사무소 — ChatGPT 추천 1위 등재',
    summary:
      '형사사건 전문 법률사무소. llms.txt 미설치, AI 챗봇 검색 시 경쟁사만 노출되는 문제.',
    result: 'llms.txt + JSON-LD 구축 후 ChatGPT·Perplexity "형사 전문 변호사 추천" 상위 노출',
    period: '제작 기간 3주',
    tags: ['법률사무소', '형사', 'llms.txt', 'ChatGPT'],
    date: '2025-10',
  },
  {
    slug: 'legalcorp-jsonld-01',
    group: 'legalcorp',
    category: 'json-ld',
    title: '의료사고 로펌 — 구글 리치결과 FAQ 노출',
    summary:
      '의료사고·의료소송 전문 로펌. 구글 검색 시 FAQ 리치결과 미노출, 클릭률 저조.',
    result: 'FAQPage + LegalService JSON-LD 적용 후 리치결과 노출, CTR 3.2배 증가',
    period: '제작 기간 2주',
    tags: ['로펌', '의료사고', 'JSON-LD', '리치결과'],
    date: '2025-09',
  },
  {
    slug: 'lawfirm-full-build-01',
    group: 'lawfirm',
    category: 'website-build',
    title: '산재 전문 법무법인 — 신규 사이트 0→1 제작',
    summary:
      '산업재해 전문 법무법인 신규 설립. 도메인·호스팅부터 SEO 구조까지 전체 구축 의뢰.',
    result: 'Next.js 기반 완전 신규 제작, 오픈 2달 만에 네이버 "산재 법무법인" 1페이지 진입',
    period: '제작 기간 5주',
    tags: ['법무법인', '산재', '신규제작', 'Next.js'],
    date: '2025-08',
  },
  {
    slug: 'lawoffice-mobile-01',
    group: 'lawoffice',
    category: 'website-build',
    title: '이혼 전문 법률사무소 — 모바일 전환율 개선',
    summary:
      '이혼·가사 전문 법률사무소. 모바일 비중 78%인데 모바일 상담신청 전환율 0.3%.',
    result: '모바일 최우선 리뉴얼 + CTA 최적화 후 전환율 2.1%로 7배 개선',
    period: '제작 기간 3주',
    tags: ['법률사무소', '이혼', '모바일', 'CTA'],
    date: '2025-07',
  },
  {
    slug: 'legalcorp-consulting-01',
    group: 'legalcorp',
    category: 'consulting',
    title: '기업법무 로펌 — 법률 마케팅 전략 컨설팅',
    summary:
      '기업법무·M&A 전문 로펌. 광고비 월 500만원 지출 대비 문의 월 3건으로 ROI 심각.',
    result: '키워드 재설계 + 성공사례 페이지 확충 후 광고비 동일, 월 문의 41건으로 개선',
    period: '컨설팅 기간 6주',
    tags: ['로펌', '기업법무', '마케팅', '컨설팅'],
    date: '2025-06',
  },
];

/** 그룹별 필터 */
export function getSuccessCasesByGroup(
  group: SuccessCase['group'],
  limit?: number,
): SuccessCase[] {
  const filtered = SUCCESS_CASES.filter((c) => c.group === group);
  return limit ? filtered.slice(0, limit) : filtered;
}

/** slug로 단일 조회 */
export function getSuccessCaseBySlug(slug: string): SuccessCase | undefined {
  return SUCCESS_CASES.find((c) => c.slug === slug);
}

/** 최신순 n개 */
export function getLatestSuccessCases(n: number): SuccessCase[] {
  return [...SUCCESS_CASES]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, n);
}

/** 카테고리별 필터 */
export function getSuccessCasesByCategory(category: string): SuccessCase[] {
  return SUCCESS_CASES.filter((c) => c.category === category);
}
