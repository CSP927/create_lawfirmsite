import type { Metadata } from 'next';
import { FAQS, getFaqsByCategory } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'FAQ · 자주 묻는 질문',
  description: '법률사무소 AI·SEO 홈페이지 제작 관련 자주 묻는 질문 모음.',
  alternates: { canonical: '/faq' },
};

const CATEGORIES = [
  { key: 'cost', label: '💰 비용·기간' },
  { key: 'ai-seo', label: '🤖 AI·SEO' },
  { key: 'tech', label: '⚙️ 기술·스택' },
  { key: 'content', label: '📝 콘텐츠' },
  { key: 'general', label: '📋 일반' },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">자주 묻는 질문</h1>
        <p className="text-center text-gray-500 mb-12 text-sm">
          총 {FAQS.length}개 질문 · 카테고리별로 정리했습니다
        </p>
        {CATEGORIES.map(({ key, label }) => {
          const items = getFaqsByCategory(key);
          if (!items.length) return null;
          return (
            <div key={key} className="mb-10">
              <h2 className="text-base font-bold text-gray-800 mb-4 px-1">{label}</h2>
              <div className="space-y-3">
                {items.map((faq) => (
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
          );
        })}
      </div>
    </>
  );
}
