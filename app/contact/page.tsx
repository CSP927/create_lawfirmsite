import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';
import ConsultForm from '@/components/common/ConsultForm';

export const metadata: Metadata = {
  title: '무료 상담 신청',
  description: `법률사무소 AI·SEO 홈페이지 제작 무료 상담 신청. ${SITE.phone} | 1영업일 내 답변.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">무료 상담 신청</h1>
      <p className="text-center text-gray-500 mb-10 text-sm">
        1영업일 내에 연락드립니다 · 초기 상담 무료
      </p>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <ConsultForm />
      </div>
      <div className="mt-8 text-center text-sm text-gray-500 space-y-1">
        <p>📞 전화 문의: <a href={SITE.phoneHref} className="text-blue-600 font-medium">{SITE.phone}</a></p>
        <p>📍 {SITE.address}</p>
      </div>
    </div>
  );
}
