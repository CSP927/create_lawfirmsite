import Link from 'next/link';
import { SITE, NAV_LINKS, SERVICES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* 회사 정보 */}
          <div>
            <p className="text-white font-bold text-lg mb-1">{SITE.name}</p>
            <p className="text-xs text-gray-500 mb-4">{SITE.nameEn}</p>
            <p className="text-sm leading-relaxed">
              법률사무소·로펌·법무법인을 위한<br />
              AI·SEO 최적화 홈페이지 제작 전문
            </p>
          </div>

          {/* 서비스 */}
          <div>
            <p className="text-white font-semibold mb-4 text-sm">서비스</p>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <p className="text-white font-semibold mb-4 text-sm">연락처</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={SITE.phoneHref} className="hover:text-white transition-colors">
                  📞 {SITE.phone}
                </a>
              </li>
              <li className="leading-relaxed">📍 {SITE.address}</li>
              <li>
                <a
                  href={SITE.kakaoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  💬 카카오톡 채널
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© 2025 {SITE.name} ({SITE.nameEn}). 대표: {SITE.ceo}</p>
          <nav className="flex gap-4">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-gray-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
