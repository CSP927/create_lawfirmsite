'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Inquiry = {
  date: string;
  name: string;
  phone: string;
  office: string;
  interest: string;
  message: string;
};

// ✅ 전화번호 안전 처리 함수
function getCleanPhone(phone: any) {
  return String(phone || '').replace(/\D/g, '');
}

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (!auth) {
      router.push('/admin');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/consult');
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
    } catch {
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">상담 문의 관리</h1>
          <p className="text-xs text-gray-500 mt-0.5">총 {inquiries.length}건</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-gray-700 border border-gray-300 px-4 py-2 rounded-lg transition-colors"
        >
          로그아웃
        </button>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="text-center py-20 text-gray-400">불러오는 중...</div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">📭</p>
            <p>아직 상담 문의가 없습니다.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">날짜</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">이름</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">연락처</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">사무소명</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">관심 서비스</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">문의 내용</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {inquiries.map((item, i) => {
                    const cleanPhone = getCleanPhone(item.phone);

                    return (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{item.date}</td>
                        <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>

                        <td className="px-4 py-3 text-gray-700">
                          {cleanPhone ? (
                            <a
                              href={`tel:${cleanPhone}`}
                              className="text-blue-600 hover:underline"
                            >
                              {item.phone}
                            </a>
                          ) : (
                            <span className="text-gray-400">번호 없음</span>
                          )}
                        </td>

                        <td className="px-4 py-3 text-gray-700">{item.office || '-'}</td>

                        <td className="px-4 py-3">
                          {item.interest ? (
                            <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">
                              {item.interest}
                            </span>
                          ) : '-'}
                        </td>

                        <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                          {item.message || '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}