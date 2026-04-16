export const SITE = {
  name: '로이어비즈랩',
  nameEn: 'LawyerBizlab',
  domain: 'create-lawfirmsite.co.kr',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://create-lawfirmsite.vercel.app',
  phone: process.env.NEXT_PUBLIC_PHONE || '010-5886-4776',
  phoneHref: process.env.NEXT_PUBLIC_PHONE_HREF || 'tel:01058864776',
  kakaoHref: process.env.NEXT_PUBLIC_KAKAO_HREF || 'https://pf.kakao.com/_UcTSb',
  address: '서울 서초구 반포대로20길 7-13',
  addressDetail: '서울특별시 서초구 반포대로20길 7-13',
  ceo: '장명관',
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || '',
  description:
    'AI·SEO 최적화 법률사무소 홈페이지 제작 전문. 로펌·법무법인·법률사무소를 위한 검색 상위노출, JSON-LD 구조화 데이터, llms.txt 설계까지 원스톱 제공.',
  keywords:
    '법률사무소 홈페이지 제작, 로펌 웹사이트, AI 검색 최적화, SEO 법률, llms.txt, JSON-LD 법률, 법무법인 홈페이지',
} as const;

export const SERVICES = [
  { slug: 'ai-seo', label: 'AI·SEO 최적화' },
  { slug: 'website-build', label: '홈페이지 제작' },
  { slug: 'llms-txt', label: 'llms.txt 설계' },
  { slug: 'json-ld', label: 'JSON-LD 구조화' },
  { slug: 'consulting', label: '법률 마케팅 컨설팅' },
] as const;

export const NAV_LINKS = [
  { href: '/', label: '홈' },
  { href: '/services', label: '서비스' },
  { href: '/cases', label: '제작 사례' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: '상담 신청' },
] as const;
