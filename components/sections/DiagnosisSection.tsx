'use client';

import { useState } from 'react';
import Link from 'next/link';

type DiagnosisItem = {
  key: string;
  label: string;
  desc: string;
  pass: boolean;
  point: number;
};

type DiagnosisResult = {
  items: DiagnosisItem[];
  totalScore: number;
  seoScore: number;
};

function ScoreCircle({ score }: { score: number }) {
  const color = score >= 80 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
  const label = score >= 80 ? '✅ 양호' : score >= 50 ? '⚠️ 주의' : '✖ 위험';
  const desc =
    score >= 80
      ? 'AI 검색에 잘 노출될 수 있는 상태입니다.'
      : score >= 50
      ? '일부 항목 개선이 필요합니다.'
      : 'AI에게 전혀 학습되지 않은 상태입니다. 즉시 개선이 필요합니다.';

  return (
    <div className="text-center">
      <p className="text-xs text-gray-400 mb-3">pagespeed.web.dev 기반 분석</p>
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3" />
          <circle
            cx="18" cy="18" r="15.9" fill="none"
            stroke={color} strokeWidth="3"
            strokeDasharray={`${score} 100`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{score}</span>
          <span className="text-xs text-gray-400">/ 100</span>
        </div>
      </div>
      <p className="font-bold text-lg mb-1" style={{ color }}>{label}</p>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function DiagnosisSection() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState('');

  const handleDiagnose = async () => {
    if (!url) {
      setError('URL을 입력해주세요.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/diagnosis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      setError(e.message || '분석 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const failItems = result?.items.filter((i) => !i.pass) ?? [];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
          AI 검색 적합도 무료 진단
        </h2>
        <p className="text-center text-gray-500 mb-10 text-sm">
          사이트 URL을 입력하면 AI 검색 최적화 상태를 즉시 분석해드립니다
        </p>

        {/* 입력 */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleDiagnose()}
            placeholder="https://www.example.com"
            className="flex-1 border border-gray-300 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button
            onClick={handleDiagnose}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors whitespace-nowrap"
          >
            {loading ? '분석 중...' : '무료 진단'}
          </button>
        </div>

        {error && (
          <p className="text-center text-sm text-red-500 mb-6">{error}</p>
        )}

        {loading && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-4 animate-spin inline-block">⚙️</div>
            <p className="text-sm">사이트를 분석하고 있습니다...<br />약 10~20초 소요됩니다.</p>
          </div>
        )}

        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 항목별 결과 */}
            <div>
              <p className="text-sm font-bold text-gray-700 mb-4">항목별 분석 결과</p>
              <div className="space-y-3">
                {result.items.map((item) => (
                  <div
                    key={item.key}
                    className={`flex items-center justify-between p-4 rounded-xl border ${
                      item.pass
                        ? 'bg-green-50 border-green-100'
                        : 'bg-red-50 border-red-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-lg ${item.pass ? 'text-green-500' : 'text-red-400'}`}>
                        {item.pass ? '✅' : '✖'}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        item.pass
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {item.pass ? '적용' : '미적용'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 점수 + CTA */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <ScoreCircle score={result.totalScore} />
              </div>

              {failItems.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <p className="text-sm font-bold text-gray-800 mb-3">
                    개선 시 획득 가능 점수: +{failItems.reduce((a, i) => a + i.point, 0)}점
                  </p>
                  <ul className="space-y-2 mb-5">
                    {failItems.map((item) => (
                      <li key={item.key} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-gray-600">
                          <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                          {item.label}
                        </span>
                        <span className="text-red-500 font-medium">+{item.point}점 가능</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="block w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-xl text-sm text-center transition-colors"
                  >
                    무료 개선 상담 신청하기 →
                  </Link>
                </div>
              )}

              {failItems.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                  <p className="text-green-600 font-bold mb-2">🎉 모든 항목 통과!</p>
                  <p className="text-sm text-gray-500">AI 검색 최적화가 잘 되어 있습니다.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}