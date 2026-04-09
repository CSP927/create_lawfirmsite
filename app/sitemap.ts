import { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { SUCCESS_CASES } from '@/data/success-cases';
import { FAQS } from '@/data/faqs';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/ai-seo`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/services/website-build`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/services/llms-txt`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/services/json-ld`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/services/consulting`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/cases`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
  ];

  const casePages: MetadataRoute.Sitemap = SUCCESS_CASES.map((c) => ({
    url: `${base}/cases/${c.slug}`,
    lastModified: new Date(c.date),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...staticPages, ...casePages];
}
