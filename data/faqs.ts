export type Faq = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

export const FAQS: Faq[] = [
  // ── 비용·기간 ──────────────────────────────────────────────
  {
    id: 'faq-cost-01',
    category: 'cost',
    question: '법률사무소 홈페이지 제작 비용은 얼마인가요?',
    answer:
      '기본 패키지 기준 330만원~(VAT 별도)부터 시작합니다. AI·SEO 최적화(llms.txt, JSON-LD, sitemap 포함) 풀패키지는 550만원~입니다. 사무소 규모·페이지 수·콘텐츠 분량에 따라 맞춤 견적을 제공합니다. 전화 또는 상담 신청 폼으로 문의 주시면 1영업일 내 견적서를 드립니다.',
  },
  {
    id: 'faq-cost-02',
    category: 'cost',
    question: '제작 기간은 얼마나 걸리나요?',
    answer:
      '기본 사이트는 3~4주, AI·SEO 풀패키지는 5~6주 내 납품합니다. 콘텐츠(성공사례·FAQ)가 준비된 경우 더 빠르게 진행 가능합니다. 착수 후 매주 진행 현황을 공유드립니다.',
  },
  {
    id: 'faq-cost-03',
    category: 'cost',
    question: '제작 후 유지보수 비용이 따로 있나요?',
    answer:
      '납품 후 1개월 무상 수정 지원이 포함됩니다. 이후 월정 유지보수 계약(월 11만원~)을 선택하실 수 있으며, 성공사례 추가·FAQ 업데이트·SEO 점검 등을 포함합니다. 유지보수 없이 자체 관리도 가능하도록 가이드를 드립니다.',
  },
  {
    id: 'faq-cost-04',
    category: 'cost',
    question: '계약금과 잔금 납부 시점은 언제인가요?',
    answer:
      '계약 체결 후 계약금 50%를 납부하시면 작업을 시작합니다. 납품 완료 및 검수 후 잔금 50%를 납부하시는 방식입니다. 세금계산서는 각 납부 시점에 발행합니다.',
  },
  {
    id: 'faq-cost-05',
    category: 'cost',
    question: '도메인·호스팅 비용은 별도인가요?',
    answer:
      '도메인(연 1~3만원)과 Vercel 호스팅(무료~월 2만원)은 고객 명의로 직접 결제하시는 방식을 권장합니다. 필요하신 경우 대행 등록도 가능합니다. Vercel 무료 플랜으로도 법률사무소 사이트 운영이 충분합니다.',
  },

  // ── AI·SEO ─────────────────────────────────────────────────
  {
    id: 'faq-seo-01',
    category: 'ai-seo',
    question: 'AI 검색 최적화가 일반 SEO와 다른 점은 무엇인가요?',
    answer:
      'ChatGPT·Perplexity·Claude 같은 AI 챗봇은 구글 검색과 다른 방식으로 정보를 수집합니다. llms.txt 파일을 통해 AI 봇에게 사무소 정보를 구조화해서 제공하면, "교통사고 전문 변호사 추천해줘" 같은 질문에 사무소가 노출될 가능성이 높아집니다. 저희는 구글 SEO와 AI 검색을 동시에 최적화합니다.',
  },
  {
    id: 'faq-seo-02',
    category: 'ai-seo',
    question: 'llms.txt가 무엇인가요?',
    answer:
      'llms.txt는 AI 언어모델(LLM)이 웹사이트를 이해하도록 돕는 구조화된 안내 파일입니다. robots.txt가 검색 크롤러를 위한 것처럼, llms.txt는 AI 봇을 위한 파일입니다. 사무소 소개·전문 분야·성공사례·자주 묻는 질문을 Q&A 형식으로 20개 이상 작성해야 효과적입니다.',
  },
  {
    id: 'faq-seo-03',
    category: 'ai-seo',
    question: 'JSON-LD 구조화 데이터가 왜 필요한가요?',
    answer:
      'JSON-LD는 구글이 사이트를 이해하도록 돕는 코드입니다. LegalService 스키마를 적용하면 구글 검색 결과에 별점·FAQ·주소 등 리치결과가 표시됩니다. 리치결과가 노출되면 클릭률(CTR)이 평균 2~3배 증가합니다. 모든 법률사무소 사이트에 필수 적용을 권장합니다.',
  },
  {
    id: 'faq-seo-04',
    category: 'ai-seo',
    question: '제작 후 구글 1페이지 진입까지 얼마나 걸리나요?',
    answer:
      '일반적으로 신규 사이트 기준 2~4개월이 소요됩니다. SEO 최적화 구조로 제작하면 초기 색인 속도가 빠르고, 성공사례·FAQ 콘텐츠가 많을수록 유리합니다. 단, 검색 순위는 구글 알고리즘에 따라 달라지므로 보장드리기 어렵습니다. 지속적인 콘텐츠 업데이트가 중요합니다.',
  },
  {
    id: 'faq-seo-05',
    category: 'ai-seo',
    question: '네이버 검색 최적화도 함께 해주시나요?',
    answer:
      '네이버 서치어드바이저 등록, 사이트맵 제출, 메타태그 인증까지 기본 포함입니다. 네이버 블로그·카페 콘텐츠 전략은 별도 컨설팅으로 제공합니다. 법률 분야는 구글 비중이 지속 증가하고 있어 구글 SEO를 우선 권장합니다.',
  },

  // ── 기술·스택 ───────────────────────────────────────────────
  {
    id: 'faq-tech-01',
    category: 'tech',
    question: '어떤 기술로 제작하나요?',
    answer:
      'Next.js 15(App Router) + TypeScript + Tailwind CSS 조합으로 제작합니다. Vercel로 배포하여 전 세계 CDN에서 빠르게 로딩됩니다. PageSpeed Insights 기준 SEO 100점, 성능 90점 이상을 목표로 합니다. WordPress 대비 보안·속도·SEO 모든 면에서 우수합니다.',
  },
  {
    id: 'faq-tech-02',
    category: 'tech',
    question: 'WordPress나 카페24로 제작하는 것과 차이가 있나요?',
    answer:
      'WordPress·카페24는 플러그인 의존도가 높아 속도가 느리고, SEO 설정이 복잡합니다. Next.js는 서버사이드 렌더링으로 초기 로딩이 빠르고, JSON-LD·sitemap·robots.txt를 코드로 정밀하게 제어할 수 있습니다. 법률사무소처럼 신뢰도가 중요한 사이트에는 Next.js가 훨씬 유리합니다.',
  },
  {
    id: 'faq-tech-03',
    category: 'tech',
    question: '사이트 수정은 어떻게 하나요? 직접 관리할 수 있나요?',
    answer:
      '납품 시 수정 가이드와 GitHub 저장소를 함께 제공합니다. 개발 지식이 없어도 데이터 파일(성공사례·FAQ)은 텍스트 수정으로 관리 가능합니다. 디자인·레이아웃 수정이 필요하면 유지보수 계약 또는 건당 수정 서비스를 이용하실 수 있습니다.',
  },
  {
    id: 'faq-tech-04',
    category: 'tech',
    question: 'GA4·구글 서치콘솔 연동도 해주시나요?',
    answer:
      'GA4 설치, 전화 클릭·상담신청 전환 이벤트 설정, Google Search Console 등록, 사이트맵 제출까지 기본 포함입니다. Naver Search Advisor, Bing Webmaster Tools 등록도 함께 진행합니다.',
  },
  {
    id: 'faq-tech-05',
    category: 'tech',
    question: '모바일에서도 잘 보이나요?',
    answer:
      '모바일 퍼스트로 설계합니다. 법률사무소 방문자의 70~80%가 모바일이기 때문에, 모바일 상담신청 버튼·전화 연결 CTA를 최우선으로 배치합니다. iOS Safari·Android Chrome 모두 테스트 후 납품합니다.',
  },

  // ── 콘텐츠 ─────────────────────────────────────────────────
  {
    id: 'faq-content-01',
    category: 'content',
    question: '성공사례는 몇 개부터 시작할 수 있나요?',
    answer:
      '최소 10개 이상을 권장합니다. SEO 효과를 위해서는 독립 URL로 각각 페이지를 구성해야 합니다. 의뢰인 실명·식별 정보 없이 사건 유형·배상 금액·결과 중심으로 작성합니다. 초기 데이터가 부족하면 기존 사건 기록을 바탕으로 콘텐츠 작성 대행도 지원합니다.',
  },
  {
    id: 'faq-content-02',
    category: 'content',
    question: 'FAQ는 몇 개가 적당한가요?',
    answer:
      '카테고리별 5개 이상, 총 20개 이상을 권장합니다. 실제 의뢰인이 검색하는 질문 형태(예: "교통사고 합의금 얼마나 받을 수 있나요?")로 작성해야 검색 유입 효과가 있습니다. FAQ는 JSON-LD FAQPage 스키마와 연동하여 구글 리치결과에도 노출됩니다.',
  },
  {
    id: 'faq-content-03',
    category: 'content',
    question: '사무소 사진이나 변호사 프로필 사진이 없어도 되나요?',
    answer:
      '사진이 있으면 신뢰도가 높아지지만, 없어도 제작은 가능합니다. 사무소 외관 사진, 대표 변호사 프로필 사진, 상담 공간 사진을 제공해주시면 가장 좋습니다. WebP 포맷으로 최적화하여 페이지 속도에 영향이 없도록 처리합니다.',
  },
  {
    id: 'faq-content-04',
    category: 'content',
    question: '카피·문구 작성도 해주시나요?',
    answer:
      '법률 마케팅 카피라이팅을 함께 제공합니다. 과장 표현·허위 광고 없이 신뢰도 높은 문장으로 작성합니다. 변호사법 광고 규정을 준수하는 범위에서 최대한 설득력 있는 문구를 제안합니다. 메인 헤드라인, CTA 문구, 서비스 소개 텍스트 포함입니다.',
  },
  {
    id: 'faq-content-05',
    category: 'content',
    question: '제작 사례나 포트폴리오를 볼 수 있나요?',
    answer:
      '이 사이트의 "제작 사례" 메뉴에서 확인하실 수 있습니다. 실제 운영 중인 사이트 링크와 제작 기간·성과를 함께 공개하고 있습니다. 비공개 사례는 상담 시 NDA 체결 후 별도 공유해 드립니다.',
  },

  // ── 일반 ────────────────────────────────────────────────────
  {
    id: 'faq-general-01',
    category: 'general',
    question: '법률사무소가 아니어도 제작 가능한가요?',
    answer:
      '현재는 법률사무소·법무법인·로펌·변호사 사무소에 특화하여 서비스하고 있습니다. 세무사·회계사·변리사 등 사사 분야도 문의 주시면 검토 후 안내 드립니다.',
  },
  {
    id: 'faq-general-02',
    category: 'general',
    question: '대면 미팅이 필요한가요?',
    answer:
      '화상 미팅(구글밋·줌)과 이메일만으로도 전국 어디서나 진행 가능합니다. 서울 서초구 사무소 방문을 원하시면 사전 예약 후 내방 가능합니다. 초기 상담은 무료로 진행합니다.',
  },
  {
    id: 'faq-general-03',
    category: 'general',
    question: '기존 사이트 리뉴얼도 가능한가요?',
    answer:
      '기존 사이트의 콘텐츠를 최대한 활용하여 리뉴얼합니다. 현재 사이트 URL을 보내주시면 SEO 진단 리포트를 무료로 제공해 드립니다. 리뉴얼 시에도 기존 URL 구조를 유지하거나 301 리다이렉트를 설정하여 검색 순위 손실을 최소화합니다.',
  },
  {
    id: 'faq-general-04',
    category: 'general',
    question: '상담부터 납품까지 어떻게 진행되나요?',
    answer:
      '① 무료 초기 상담(30분) → ② 기획서·견적서 제출(1영업일) → ③ 계약 및 계약금 납부 → ④ 기획·디자인 시안 확인(1주) → ⑤ 개발·콘텐츠 작업(2~4주) → ⑥ 검수 및 수정(1주) → ⑦ 배포·서치콘솔 등록 → ⑧ 가이드 전달 및 잔금 납부 순서로 진행합니다.',
  },
  {
    id: 'faq-general-05',
    category: 'general',
    question: '어떤 법률 분야 사이트를 제작해 봤나요?',
    answer:
      '교통사고·산업재해·형사·이혼·의료사고·기업법무·부동산 분야 사이트를 제작했습니다. 각 분야별 검색 키워드 특성과 타겟 의뢰인 유형을 반영한 맞춤 구조로 설계합니다. 제작 사례 페이지에서 분야별 사례를 확인하세요.',
  },
];

/** 카테고리별 필터 */
export function getFaqsByCategory(category: string): Faq[] {
  return FAQS.filter((f) => f.category === category);
}

/** 일반 FAQ (홈·가이드 페이지용) */
export function getGeneralFaqs(limit?: number): Faq[] {
  const general = FAQS.filter((f) => f.category === 'general');
  return limit ? general.slice(0, limit) : general;
}
