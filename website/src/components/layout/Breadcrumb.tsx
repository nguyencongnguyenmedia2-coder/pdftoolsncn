import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbSchema } from '@/lib/seo';

interface BreadcrumbProps {
  items: { name: string; path: string }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const fullItems = [{ name: 'Trang chủ', path: '/' }, ...items];
  const schema = getBreadcrumbSchema(fullItems);

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#A5A0BC]">
        {fullItems.map((item, idx) => {
          const isLast = idx === fullItems.length - 1;
          return (
            <li key={item.path} className="inline-flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#A78BFA]/50" />}
              {isLast ? (
                <span className="font-semibold text-[#A78BFA]" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  {idx === 0 && <Home className="w-3.5 h-3.5 text-[#A78BFA]" />}
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

