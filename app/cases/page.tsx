import type { Metadata } from 'next';
import Link from 'next/link';
import { SUCCESS_CASES } from '@/data/success-cases';

export const metadata: Metadata = {
  title: '제작 사례',
  description: '로이어비즈랩이 제작한 법률사무소·로펌·법무법인 AI·SEO 홈페이지 제작 사례를 확인하세요.',
  alternates: { canonical: '/cases' },
};

export default function CasesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">제작 사례</h1>
      <p className="text-center text-gray-500 mb-12">실제 성과로 증명합니다</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUCCESS_CASES.map((c) => (
          <Link
            key={c.slug}
            href={`/cases/${c.slug}`}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-200 transition-all"
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
            <h2 className="font-bold text-gray-900 mb-2 text-sm leading-snug">{c.title}</h2>
            <p className="text-blue-600 font-bold text-sm mb-2">{c.result}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{c.summary}</p>
            <p className="text-xs text-gray-400 mt-3">{c.period} · {c.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
