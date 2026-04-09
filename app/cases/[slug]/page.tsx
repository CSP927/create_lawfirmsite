import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSuccessCaseBySlug, SUCCESS_CASES } from '@/data/success-cases';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SUCCESS_CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getSuccessCaseBySlug(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: `${c.summary} 결과: ${c.result}`,
    alternates: { canonical: `/cases/${slug}` },
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const c = getSuccessCaseBySlug(slug);
  if (!c) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link href="/cases" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        ← 제작 사례 목록
      </Link>
      <div className="flex gap-2 flex-wrap mb-4">
        {c.tags.map((tag) => (
          <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
            {tag}
          </span>
        ))}
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{c.title}</h1>
      <p className="text-gray-500 text-sm mb-8">{c.period} · {c.date}</p>
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
        <p className="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wide">결과</p>
        <p className="text-blue-700 font-bold text-lg leading-snug">{c.result}</p>
      </div>
      <div className="prose prose-gray max-w-none text-sm leading-relaxed">
        <h2 className="text-base font-bold text-gray-900 mb-2">의뢰 배경</h2>
        <p className="text-gray-600 mb-6">{c.summary}</p>
        <h2 className="text-base font-bold text-gray-900 mb-2">제공 서비스</h2>
        <p className="text-gray-600">{c.category} 서비스를 통해 {c.result}를 달성했습니다.</p>
      </div>
      <div className="mt-10 pt-8 border-t text-center">
        <p className="text-gray-600 mb-4 text-sm">비슷한 결과를 원하신다면?</p>
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
