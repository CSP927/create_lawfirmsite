import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getFaqsByCategory } from '@/data/faqs';

type Props = { params: Promise<{ slug: string }> };

const SERVICE_DATA: Record<
  string,
  {
    icon: string;
    title: string;
    subtitle: string;
    desc: string;
    price: string;
    period: string;
    includes: string[];
    faqCategory: string;
    jsonLdType: string;
  }
> = {
  'ai-seo': {
    icon: '🤖',
    title: 'AI·SEO 최적화',
    subtitle: 'ChatGPT·구글 동시 최적화 풀패키지',
    desc: 'AI 챗봇과 구글·네이버 검색 모두에서 법률사무소가 상위 노출되도록 llms.txt·JSON-LD·sitemap을 전략적으로 설계합니다.',
    price: '550만원~',
    period: '5~6주',
    includes: [
      'llms.txt Q&A 20개 이상 작성',
      'JSON-LD 전 스키마 적용 (LegalService·FAQPage·Organization·WebSite)',
      'sitemap.xml 동적 생성',
      'robots.txt AI 봇 허용 설정',
      'Google Search Console + Naver Search Advisor 등록',
      'GA4 전환 이벤트 설정 (전화 클릭·상담신청)',
      'PageSpeed Insights SEO 100점 최적화',
      'Rich Results Test 검증',
    ],
    faqCategory: 'ai-seo',
    jsonLdType: 'AI·SEO 최적화 서비스',
  },
  'website-build': {
    icon: '🌐',
    title: '홈페이지 신규 제작',
    subtitle: 'Next.js 15 기반 고성능 법률 사이트',
    desc: 'Next.js 15(App Router) + TypeScript + Tailwind CSS로 SEO에 최적화된 법률사무소 홈페이지를 처음부터 제작합니다. Vercel 배포까지 원스톱 제공.',
    price: '330만원~',
    period: '3~4주',
    includes: [
      'Next.js 15 App Router 기반 개발',
      '모바일 퍼스트 반응형 디자인',
      '성공사례 독립 URL 페이지 구성',
      'FAQ 페이지 + JSON-LD FAQPage',
      '상담신청 폼 (모바일 키보드 최적화)',
      'WebP 이미지 최적화',
      'GitHub 저장소 + 수정 가이드 제공',
      'Vercel 배포 + 도메인 연결 (Gabia)',
    ],
    faqCategory: 'tech',
    jsonLdType: '홈페이지 제작 서비스',
  },
  'llms-txt': {
    icon: '📄',
    title: 'llms.txt 설계',
    subtitle: 'AI 챗봇 추천 최적화 전략 파일',
    desc: 'ChatGPT·Perplexity·Claude 등 AI 챗봇이 "전문 변호사 추천해줘"라는 질문에 사무소를 노출시킬 수 있도록 llms.txt를 전략적으로 설계합니다.',
    price: '110만원~',
    period: '1~2주',
    includes: [
      '사무소 전문 분야 분석 및 키워드 도출',
      'AI 추천 Q&A 20개 이상 작성',
      '경쟁 사무소 llms.txt 벤치마크',
      '기존 사이트 설치 및 검증',
      'AI 챗봇 노출 테스트 리포트',
      '6개월 후 효과 점검 (선택)',
    ],
    faqCategory: 'ai-seo',
    jsonLdType: 'llms.txt 설계 서비스',
  },
  'json-ld': {
    icon: '🔖',
    title: 'JSON-LD 구조화 데이터',
    subtitle: '구글 리치결과 노출 극대화',
    desc: 'LegalService·FAQPage·Organization·WebSite 스키마를 정밀하게 적용하여 구글 검색 결과에 FAQ·별점·주소 등 리치결과를 노출시킵니다.',
    price: '88만원~',
    period: '1~2주',
    includes: [
      'LegalService 스키마 구축',
      'FAQPage 스키마 (FAQ 데이터 연동)',
      'Organization + WebSite 스키마',
      'BreadcrumbList 스키마',
      'Rich Results Test 100% 통과',
      '기존 사이트 적용 가능',
    ],
    faqCategory: 'ai-seo',
    jsonLdType: 'JSON-LD 구조화 데이터 서비스',
  },
  consulting: {
    icon: '📊',
    title: '법률 마케팅 컨설팅',
    subtitle: '데이터 기반 법률 마케팅 전략',
    desc: '키워드 전략 재설계, 광고 ROI 분석, 콘텐츠 로드맵, GA4 전환 최적화까지 법률사무소에 특화된 디지털 마케팅 전략을 수립합니다.',
    price: '220만원~',
    period: '4~6주',
    includes: [
      '현재 사이트·광고 SEO 진단 리포트',
      '핵심 키워드 발굴 및 경쟁도 분석',
      '콘텐츠 로드맵 (성공사례·FAQ 계획)',
      'GA4 전환 이벤트 셋업 및 분석',
      '광고 키워드·랜딩페이지 개선 제안',
      '월간 성과 리포트 (3개월)',
    ],
    faqCategory: 'general',
    jsonLdType: '법률 마케팅 컨설팅 서비스',
  },
};

export async function generateStaticParams() {
  return Object.keys(SERVICE_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICE_DATA[slug];
  if (!s) return {};
  return {
    title: s.title,
    description: s.desc,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const s = SERVICE_DATA[slug];
  if (!s) notFound();

  const relatedFaqs = getFaqsByCategory(s.faqCategory).slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: s.desc,
    provider: {
      '@type': 'Organization',
      name: '로이어비즈랩',
    },
    serviceType: s.jsonLdType,
    areaServed: { '@type': 'Country', name: 'KR' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/services" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
          ← 서비스 목록
        </Link>

        {/* 헤더 */}
        <div className="mb-10">
          <span className="text-4xl mb-4 block">{s.icon}</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{s.title}</h1>
          <p className="text-blue-600 font-medium mb-4">{s.subtitle}</p>
          <p className="text-gray-600 leading-relaxed">{s.desc}</p>
        </div>

        {/* 가격·기간 */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-blue-50 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-500 mb-1">시작 가격</p>
            <p className="text-2xl font-bold text-blue-600">{s.price}</p>
            <p className="text-xs text-gray-400 mt-1">VAT 별도</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 text-center">
            <p className="text-xs text-gray-500 mb-1">진행 기간</p>
            <p className="text-2xl font-bold text-gray-900">{s.period}</p>
          </div>
        </div>

        {/* 포함 항목 */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">포함 항목</h2>
          <ul className="space-y-3">
            {s.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="text-blue-500 mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 관련 FAQ */}
        {relatedFaqs.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4">관련 질문</h2>
            <div className="space-y-3">
              {relatedFaqs.map((faq) => (
                <details
                  key={faq.id}
                  className="border border-gray-200 rounded-xl overflow-hidden group"
                >
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-gray-900 text-sm list-none">
                    {faq.question}
                    <span className="text-gray-400 group-open:rotate-180 transition-transform ml-3 flex-shrink-0">
                      ▼
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-blue-700 rounded-2xl p-8 text-center text-white">
          <p className="text-lg font-bold mb-2">{s.title} 문의하기</p>
          <p className="text-blue-200 text-sm mb-6">초기 상담 무료 · 1영업일 내 답변</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors text-sm"
            >
              무료 상담 신청
            </Link>
            <a
              href="tel:01058864776"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              📞 010-5886-4776
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
