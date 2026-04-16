import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQS, getFaqsByCategory } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'FAQ · 자주 묻는 질문',
  description: '법률사무소 AI·SEO 홈페이지 제작 관련 자주 묻는 질문 모음.',
  alternates: { canonical: '/faq' },
};

const CATEGORIES = [
  { key: 'cost',    label: '💰 비용·기간' },
  { key: 'ai-seo', label: '🤖 AI·SEO' },
  { key: 'tech',    label: '⚙️ 기술·스택' },
  { key: 'content', label: '📝 콘텐츠' },
  { key: 'general', label: '📋 일반' },
];

export default function FaqPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">자주 묻는 질문</h1>
      <p className="text-center text-gray-500 mb-12 text-sm">
        총 {FAQS.length}개 질문 · 카테고리별로 정리했습니다
      </p>

      {CATEGORIES.map(({ key, label }) => {
        const items = getFaqsByCategory(key);
        if (!items.length) return null;
        return (
          <div key={key} className="mb-12">
            <h2 className="text-base font-bold text-gray-800 mb-4 px-1">{label}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((faq) => (
                <Link
                  key={faq.id}
                  href={`/faq/${faq.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-200 transition-all"
                >
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium mb-3 inline-block">
                    {label}
                  </span>
                  <p className="font-semibold text-gray-900 text-sm leading-snug mb-2">
                    {faq.question}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {faq.answer}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
