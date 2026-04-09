'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE, NAV_LINKS } from '@/lib/constants';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // iOS 스크롤 버그 수정: position:fixed + top:-scrollY 방식
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [open]);

  const toggleMenu = useCallback(() => setOpen((v) => !v), []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled ? 'bg-white shadow-sm' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">{SITE.name}</span>
            <span className="hidden sm:inline text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded">
              AI·SEO
            </span>
          </Link>

          {/* PC 네비 */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname === link.href ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* PC CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={SITE.phoneHref}
              className="text-sm font-bold text-gray-800 hover:text-blue-600"
            >
              {SITE.phone}
            </a>
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              무료 상담
            </Link>
          </div>

          {/* 모바일 햄버거 */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700"
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-current transition-transform duration-200 ${
                  open ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-opacity duration-200 ${
                  open ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-transform duration-200 ${
                  open ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* 모바일 드로어 — 오른쪽 슬라이드 + 100dvh */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      <div
        className={`fixed top-0 right-0 z-50 h-[100dvh] w-72 bg-white shadow-2xl transition-transform duration-300 md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-5 border-b">
            <span className="font-bold text-gray-900">{SITE.name}</span>
            <button onClick={() => setOpen(false)} className="p-1 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-5 py-3.5 text-sm font-medium border-b border-gray-50 transition-colors hover:bg-blue-50 hover:text-blue-600 ${
                  pathname === link.href ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="p-5 border-t space-y-3">
            <a
              href={SITE.phoneHref}
              className="flex items-center justify-center gap-2 w-full py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg text-sm"
            >
              📞 {SITE.phone}
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center w-full py-3 bg-blue-600 text-white font-bold rounded-lg text-sm"
              onClick={() => setOpen(false)}
            >
              무료 상담 신청
            </Link>
          </div>
        </div>
      </div>

      {/* 헤더 높이만큼 여백 */}
      <div className="h-16" />
    </>
  );
}
