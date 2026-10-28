import type { Metadata } from 'next';
import { PRODUCT_CONFIG } from '@/config/product';
import { RELEASE_CONFIG } from '@/config/release';

interface PageSEOOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}

const DEFAULT_KEYWORDS = [
  'PDF Tools NCN',
  'Phần mềm PDF cho Windows',
  'Công cụ PDF tiếng Việt',
  'Phần mềm gộp PDF',
  'Phần mềm tách PDF',
  'Chuyển Word sang PDF',
  'Chuyển Excel sang PDF',
  'Nén PDF trên máy tính',
  'Công cụ PDF offline',
];

export function constructMetadata({
  title,
  description,
  path = '/',
  keywords = [],
}: PageSEOOptions): Metadata {
  const baseUrl = PRODUCT_CONFIG.siteUrl.replace(/\/$/, '');
  const canonicalUrl = `${baseUrl}${path === '/' ? '' : path}`;
  const fullTitle = title.includes(PRODUCT_CONFIG.name)
    ? title
    : `${title} | ${PRODUCT_CONFIG.name}`;

  return {
    metadataBase: new URL(baseUrl),
    title: fullTitle,
    description,
    keywords: Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords])),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: PRODUCT_CONFIG.name,
      locale: PRODUCT_CONFIG.locale,
      type: 'website',
      images: [
        {
          url: PRODUCT_CONFIG.ogImagePath,
          width: 1200,
          height: 630,
          alt: `${PRODUCT_CONFIG.name} — Ứng dụng xử lý PDF trên Windows`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [PRODUCT_CONFIG.ogImagePath],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function getSoftwareApplicationSchema() {
  const baseUrl = PRODUCT_CONFIG.siteUrl.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: PRODUCT_CONFIG.name,
    operatingSystem: RELEASE_CONFIG.supportedWindows,
    applicationCategory: 'BusinessApplication',
    softwareVersion: RELEASE_CONFIG.version,
    fileSize: RELEASE_CONFIG.fileSize,
    inLanguage: 'vi',
    description: PRODUCT_CONFIG.subTagline,
    url: baseUrl,
    downloadUrl: RELEASE_CONFIG.downloadAvailable
      ? `${baseUrl}${RELEASE_CONFIG.installerUrl}`
      : undefined,
    author: {
      '@type': 'Organization',
      name: PRODUCT_CONFIG.brand,
    },
  };
}

export function getWebsiteSchema() {
  const baseUrl = PRODUCT_CONFIG.siteUrl.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: PRODUCT_CONFIG.name,
    url: baseUrl,
    inLanguage: 'vi',
    description: PRODUCT_CONFIG.tagline,
  };
}

export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  const baseUrl = PRODUCT_CONFIG.siteUrl.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${baseUrl}${item.path === '/' ? '' : item.path}`,
    })),
  };
}

