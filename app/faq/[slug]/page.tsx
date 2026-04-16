import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getFaqBySlug, getFaqsByCategory, FAQS } from '@/data/faqs';

type Props = { params: Promise<{ slug: string }> };

const CATEGORY_LABELS: Record<string, string> = {
  cost:    '💰 비용·기간',
  'ai-seo': '🤖 AI·SEO',
  tech:    '⚙️ 기술·스택',
  content: '📝 콘텐츠',
  general: '📋 일반',
};

export async function generateStaticParams() {
  return FAQS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const faq = getFaqBySlug(slug);
  if (!faq) return {};
  return {
    title: faq.question,
    description: faq.answer.slice(0, 120),
    alternates: { canonical: `/faq/${slug}` },
  };
}

export default async function FaqDetailPage({ params }: Props) {
  const { slug } = await params;
  const faq = getFaqBySlug(slug);
  if (!faq) notFound();

  const categoryLabel = CATEGORY_LABELS[faq.category] ?? faq.category;

  // 같은 카테고리의 다른 FAQ (최대 3개)
  const related = getFaqsByCategory(faq.category)
    .filter((f) => f.slug !== slug)
    .slice(0, 3);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* 뒤로가기 */}
        <Link href="/faq" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
          ← 자주 묻는 질문 목록
        </Link>

        {/* 카테고리 배지 */}
        <div className="mb-4">
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
            {categoryLabel}
          </span>
        </div>

        {/* 질문 */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-snug">
          {faq.question}
        </h1>

        {/* 답변 */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 mb-10">
          <p className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">답변</p>
          <p className="text-gray-700 leading-relaxed text-sm">{faq.answer}</p>
        </div>

        {/* 관련 질문 */}
        {related.length > 0 && (
          <div className="mt-10 pt-8 border-t">
            <h2 className="text-sm font-bold text-gray-800 mb-4">같은 카테고리 질문</h2>
            <div className="space-y-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/faq/${r.slug}`}
                  className="block border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 hover:border-blue-200 hover:text-blue-700 transition-colors"
                >
                  {r.question}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 pt-8 border-t text-center">
          <p className="text-gray-600 mb-4 text-sm">더 궁금한 점이 있으신가요?</p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            무료 상담 신청
          </Link>
        </div>
      </div>
    </>
  );
}
