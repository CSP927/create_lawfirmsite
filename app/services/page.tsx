import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '서비스',
  description: '법률사무소·로펌·법무법인을 위한 AI·SEO 홈페이지 제작 서비스 전체 목록.',
  alternates: { canonical: '/services' },
};

const SERVICES = [
  {
    slug: 'ai-seo',
    icon: '🤖',
    title: 'AI·SEO 최적화',
    desc: 'ChatGPT·Perplexity·Claude 등 AI 챗봇과 구글·네이버 검색 동시 최적화. llms.txt·JSON-LD·sitemap 전체 설계.',
    tags: ['llms.txt', 'JSON-LD', 'sitemap', 'robots.txt'],
    price: '550만원~',
  },
  {
    slug: 'website-build',
    icon: '🌐',
    title: '홈페이지 신규 제작',
    desc: 'Next.js 15 + TypeScript + Tailwind CSS 기반 고성능 법률 사이트. SEO 100점 목표, Vercel 배포 포함.',
    tags: ['Next.js 15', 'TypeScript', 'Vercel', 'Tailwind CSS'],
    price: '330만원~',
  },
  {
    slug: 'llms-txt',
    icon: '📄',
    title: 'llms.txt 설계',
    desc: 'AI 봇이 사무소를 정확히 이해하고 추천하도록 Q&A 20개 이상의 llms.txt를 전략적으로 작성합니다.',
    tags: ['ChatGPT', 'Perplexity', 'Claude', 'AI 추천'],
    price: '110만원~',
  },
  {
    slug: 'json-ld',
    icon: '🔖',
    title: 'JSON-LD 구조화 데이터',
    desc: 'LegalService·FAQPage·Organization·WebSite 스키마로 구글 리치결과(FAQ·별점·주소) 노출을 극대화합니다.',
    tags: ['LegalService', 'FAQPage', '리치결과', 'CTR 향상'],
    price: '88만원~',
  },
  {
    slug: 'consulting',
    icon: '📊',
    title: '법률 마케팅 컨설팅',
    desc: '키워드 전략·광고 ROI 분석·콘텐츠 로드맵·GA4 전환 설정까지 데이터 기반 법률 마케팅 전략을 수립합니다.',
    tags: ['키워드 전략', 'GA4', '광고 ROI', '콘텐츠 로드맵'],
    price: '220만원~',
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">서비스</h1>
      <p className="text-center text-gray-500 mb-12">
        법률사무소에 특화된 AI·SEO 솔루션을 원스톱으로 제공합니다
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="bg-white border border-gray-200 rounded-xl p-7 hover:shadow-md hover:border-blue-200 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-3xl">{s.icon}</span>
              <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {s.price}
              </span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {s.title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{s.desc}</p>
            <div className="flex flex-wrap gap-2">
              {s.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-12 text-center bg-blue-50 rounded-2xl p-8">
        <p className="text-lg font-bold text-gray-900 mb-2">어떤 서비스가 필요한지 모르겠다면?</p>
        <p className="text-gray-600 text-sm mb-5">무료 상담에서 사무소 상황에 맞는 서비스를 추천해 드립니다.</p>
        <Link
          href="/contact"
          className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          무료 상담 신청
        </Link>
      </div>
    </div>
  );
}
