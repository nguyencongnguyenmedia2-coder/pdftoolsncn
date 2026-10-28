import { MetadataRoute } from 'next';
import { PRODUCT_CONFIG } from '@/config/product';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = PRODUCT_CONFIG.siteUrl.replace(/\/$/, '');
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

