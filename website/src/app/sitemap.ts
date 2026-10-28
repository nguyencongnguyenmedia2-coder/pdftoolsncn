import { MetadataRoute } from 'next';
import { PRODUCT_CONFIG } from '@/config/product';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = PRODUCT_CONFIG.siteUrl.replace(/\/$/, '');
  const now = new Date();

  const routes = [
    { path: '', priority: 1.0 },
    { path: '/download', priority: 0.95 },
    { path: '/features', priority: 0.9 },
    { path: '/features/merge-pdf', priority: 0.85 },
    { path: '/features/split-pdf', priority: 0.85 },
    { path: '/features/convert-pdf', priority: 0.85 },
    { path: '/features/compress-pdf', priority: 0.85 },
    { path: '/features/ocr', priority: 0.85 },
    { path: '/guide', priority: 0.8 },
    { path: '/faq', priority: 0.75 },
    { path: '/changelog', priority: 0.7 },
    { path: '/contact', priority: 0.7 },
    { path: '/privacy', priority: 0.6 },
    { path: '/terms', priority: 0.6 },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: r.priority,
  }));
}

