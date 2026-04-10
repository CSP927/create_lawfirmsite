import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { getLatestSuccessCases } from '@/data/success-cases';
import { getGeneralFaqs } from '@/data/faqs';
import ConsultForm from '@/components/common/ConsultForm';
import DiagnosisSection from '@/components/sections/DiagnosisSection';

export const metadata: Metadata = {
  title: `${SITE.name} | 법률사무소 AI·SEO 홈페이지 제작 전문`,
  description: SITE.description,
  alternates: { canonical: '/' },
};

const SERVICES_PREVIEW = [
  {
    icon: '🤖',
    title: 'AI 검색 최적화',
    desc: 'ChatGPT·Perplexity·Claude에서 사무소가 추천되도록 llms.txt와 구조화 데이터를 설계합니다.',
    href: '/services/ai-seo',
  },
  {
    icon: '🌐',
    title: '홈페이지 신규 제작',
    desc: 'Next.js 15 기반 고성능 사이트를 5~6주 만에 납품합니다. SEO 100점 목표.',
    href: '/services/website-build',
  },
  {
    icon: '📄',
    title: 'llms.txt 설계',
    desc: 'AI 봇이 사무소를 정확히 이해하도록 Q&A 20개 이상의 llms.txt를 작성합니다.',
    href: '/services/llms-txt',
  },
  {
    icon: '🔖',
    title: 'JSON-LD 구조화',
    desc: 'LegalService·FAQPage 스키마로 구글 리치결과(FAQ·별점·주소)를 노출시킵니다.',
    href: '/services/json-ld',
  },
  {
    icon: '📊',
    title: '법률 마케팅 컨설팅',
    desc: '키워드 전략, 광고 ROI 개선, 콘텐츠 로드맵까지 데이터 기반으로 설계합니다.',
    href: '/services/consulting',
  },
];

const faqJsonLd = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

export default function HomePage() {
  const latestCases = getLatestSuccessCases(3);
  const generalFaqs = getGeneralFaqs(5);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(generalFaqs)) }}
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-5">
            🏆 법률사무소 AI·SEO 홈페이지 제작 전문
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            ChatGPT가 추천하는<br />
            <span className="text-yellow-300">법률사무소 홈페이지</span>를<br />
            만듭니다
          </h1>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            llms.txt · JSON-LD · SEO 최적화까지<br className="md:hidden" />
            AI 검색 시대에 맞는 홈페이지를 제작합니다
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-700 font-bold px-8 py-3.5 rounded-lg hover:bg-blue-50 transition-colors"
            >
              무료 상담 신청
            </Link>
            <a
              href={SITE.phoneHref}
              className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              📞 {SITE.phone}
            </a>
            <a
              href={SITE.kakaoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-gray-900 font-bold px-8 py-3.5 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              💬 카카오 상담
            </a>
          </div>
        </div>
      </section>

      {/* ── 신뢰 지표 ─────────────────────────────────────────── */}
      <section className="border-b bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: '50+', label: '제작 완료 사이트' },
            { num: '3개월', label: '평균 1페이지 진입' },
            { num: '100점', label: 'PageSpeed SEO 목표' },
            { num: '20+', label: 'llms.txt Q&A 기본 포함' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-2xl font-bold text-blue-600">{item.num}</p>
              <p className="text-sm text-gray-600 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 서비스 ────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
            서비스
          </h2>
          <p className="text-center text-gray-500 mb-10">
            법률사무소에 특화된 AI·SEO 솔루션을 원스톱으로 제공합니다
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_PREVIEW.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <span className="text-3xl mb-3 block">{s.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 제작 사례 ─────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
            제작 사례
          </h2>
          <p className="text-center text-gray-500 mb-10">실제 성과로 증명합니다</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestCases.map((c) => (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
              >
                <div className="flex gap-2 flex-wrap mb-3">
                  {c.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm leading-snug">{c.title}</h3>
                <p className="text-blue-600 font-bold text-sm">{c.result}</p>
                <p className="text-xs text-gray-400 mt-2">{c.period}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/cases"
              className="inline-block border border-gray-300 text-gray-700 font-medium px-6 py-2.5 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors text-sm"
            >
              전체 사례 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── AI 검색 적합도 무료 진단 ──────────────────────────── */}
      <DiagnosisSection />

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            {generalFaqs.map((faq) => (
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
          <div className="text-center mt-6">
            <Link
              href="/faq"
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              전체 FAQ 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA + 상담폼 ──────────────────────────────────────── */}
      <section className="py-16 px-4 bg-blue-700 text-white" id="consult">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            무료 상담 신청
          </h2>
          <p className="text-center text-blue-200 mb-8 text-sm">
            1영업일 내 연락드립니다 · 초기 상담 무료
          </p>
          <div className="bg-white rounded-2xl p-6 md:p-8">
            <ConsultForm />
          </div>
        </div>
      </section>
      {/* ── 모바일 하단 고정 CTA ─────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 flex">
        <a
          href={SITE.phoneHref}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white font-bold text-sm"
        >
          📞 전화 상담
        </a>
        <a
          href={SITE.kakaoHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-yellow-400 text-gray-900 font-bold text-sm"
        >
          💬 카카오 상담
        </a>
      </div>

      {/* 모바일 하단 버튼 여백 */}
      <div className="h-14 md:hidden" />
    </>
  );
}