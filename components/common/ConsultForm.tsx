'use client';

import { useState, useCallback } from 'react';
import { SITE } from '@/lib/constants';

const INTEREST_OPTIONS = [
  'AI·SEO 풀패키지',
  '홈페이지 신규 제작',
  '기존 사이트 리뉴얼',
  'llms.txt 설치',
  'JSON-LD 구조화',
  '법률 마케팅 컨설팅',
] as const;

type FormData = {
  name: string;
  phone: string;
  office: string;
  interest: string;
  message: string;
};

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ConsultForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    office: '',
    interest: '',
    message: '',
  });
  const [state, setState] = useState<FormState>('idle');

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!form.name || !form.phone) {
      alert('이름과 연락처는 필수 입력 항목입니다.');
      return;
    }
    setState('loading');

    try {
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('failed');

      setState('success');
      setForm({ name: '', phone: '', office: '', interest: '', message: '' });

      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'consult_submit', {
          event_category: 'conversion',
          event_label: form.interest,
        });
      }
    } catch {
      setState('error');
    }
  }, [form]);

  if (state === 'success') {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">✅</div>
        <p className="text-xl font-bold text-gray-900 mb-2">상담 신청이 완료되었습니다</p>
        <p className="text-gray-600">1영업일 내에 연락드리겠습니다.</p>
        <p className="mt-4 text-sm text-gray-500">
          긴급 문의:{' '}
          <a href={SITE.phoneHref} className="text-blue-600 font-medium">
            {SITE.phone}
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="홍길동"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            연락처 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="010-0000-0000"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">사무소명</label>
        <input
          type="text"
          name="office"
          value={form.office}
          onChange={handleChange}
          placeholder="OO법률사무소 / OO법무법인"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">관심 서비스</label>
        <select
          name="interest"
          value={form.interest}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">선택해주세요</option>
          {INTEREST_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">문의 내용</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="현재 사이트 URL, 제작 요청 사항, 예산 등을 자유롭게 적어주세요."
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={state === 'loading'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3.5 rounded-lg text-sm transition-colors"
      >
        {state === 'loading' ? '전송 중...' : '무료 상담 신청하기'}
      </button>

      {state === 'error' && (
        <p className="text-center text-sm text-red-500">
          전송 중 오류가 발생했습니다. 전화로 문의해 주세요: {SITE.phone}
        </p>
      )}

      <p className="text-center text-xs text-gray-400">
        입력하신 정보는 상담 목적으로만 사용됩니다.
      </p>
    </div>
  );
}
