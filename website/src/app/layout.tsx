import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { constructMetadata, getSoftwareApplicationSchema, getWebsiteSchema } from '@/lib/seo';
import { PRODUCT_CONFIG } from '@/config/product';

export const metadata: Metadata = constructMetadata({
  title: `${PRODUCT_CONFIG.name} — Mọi công cụ PDF cần thiết, ngay trên máy tính của bạn`,
  description: PRODUCT_CONFIG.subTagline,
  path: '/',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const softwareSchema = getSoftwareApplicationSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <html lang="vi" className="dark">
      <head>
        <link rel="icon" href="/images/logo-ncn.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#0D0B18] text-[#F8FAFC] antialiased flex flex-col justify-between selection:bg-[#7657F6]/35 selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-xl focus:bg-[#7657F6] focus:text-white focus:font-bold"
        >
          Chuyển đến nội dung chính
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

