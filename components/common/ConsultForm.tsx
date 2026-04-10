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

// 전화번호 자동 하이픈 함수
function formatPhone(value: string) {
  const numbers = value.replace(/\D/g, '');

  if (numbers.length < 4) return numbers;
  if (numbers.length < 8) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  }
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
}

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

    // 🔥 phone만 따로 처리
    if (name === 'phone') {
      const formatted = formatPhone(value);
      setForm((prev) => ({ ...prev, phone: formatted }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    // 숫자만 추출
    const cleanPhone = form.phone.replace(/\D/g, '');

    if (!form.name || !cleanPhone) {
      alert('이름과 연락처는 필수 입력 항목입니다.');
      return;
    }

    // 길이 검증 (한국 휴대폰 기준)
    if (!/^\d{10,11}$/.test(cleanPhone)) {
      alert('올바른 전화번호를 입력해주세요.');
      return;
    }

    setState('loading');

    try {
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          phone: cleanPhone, // 서버에는 숫자만 보냄
        }),
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
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            inputMode="numeric"   // 📱 모바일 숫자 키패드
            maxLength={13}        // 010-1234-5678 길이 제한
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 나머지 코드는 그대로 유지 */}
      
      <button
        onClick={handleSubmit}
        disabled={state === 'loading'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3.5 rounded-lg text-sm"
      >
        {state === 'loading' ? '전송 중...' : '무료 상담 신청하기'}
      </button>

      {state === 'error' && (
        <p className="text-center text-sm text-red-500">
          전송 중 오류가 발생했습니다. 전화로 문의해 주세요: {SITE.phone}
        </p>
      )}
    </div>
  );
}