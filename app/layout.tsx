import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/constants';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | 법률사무소 AI·SEO 홈페이지 제작 전문`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: SITE.keywords,
  metadataBase: new URL(SITE.url),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | 법률사무소 AI·SEO 홈페이지 제작 전문`,
    description: SITE.description,
    images: [                          // ← 이것만 추가
      {
        url: `${SITE.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} 썸네일`,
      },
    ],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      alternateName: SITE.nameEn,
      url: SITE.url,
      telephone: SITE.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '반포대로20길 7-13',
        addressLocality: '서초구',
        addressRegion: '서울특별시',
        postalCode: '06533',
        addressCountry: 'KR',
      },
      founder: { '@type': 'Person', name: SITE.ceo },
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE.url}/#localbusiness`,
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
      description: SITE.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '반포대로20길 7-13',
        addressLocality: '서초구',
        addressRegion: '서울특별시',
        postalCode: '06533',
        addressCountry: 'KR',
      },
      areaServed: { '@type': 'Country', name: 'KR' },
      serviceType: [
        '법률사무소 홈페이지 제작',
        'AI 검색 최적화',
        'SEO 최적화',
        'llms.txt 설계',
        'JSON-LD 구조화 데이터',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      inLanguage: 'ko-KR',
      publisher: { '@id': `${SITE.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* GA4: NEXT_PUBLIC_GA4_ID 환경변수 설정 후 활성화 */}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={notoSansKR.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
