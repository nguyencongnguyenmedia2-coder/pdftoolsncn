'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ALL_FEATURES, FEATURE_GROUPS } from '@/content/features';
import { FeatureGroupId } from '@/types';
import { FeatureCard } from './FeatureCard';

export const FeatureGrid: React.FC<{ showViewAllButton?: boolean }> = ({
  showViewAllButton = true,
}) => {
  const [activeGroup, setActiveGroup] = useState<'all' | FeatureGroupId>('all');

  const filtered =
    activeGroup === 'all'
      ? ALL_FEATURES
      : ALL_FEATURES.filter((f) => f.groupId === activeGroup);

  return (
    <section id="tinh-nang" className="py-16 lg:py-24 bg-[#151228]/50 border-y border-[#A78BFA]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[#1C1834] border border-[#A78BFA]/25 text-xs font-semibold text-[#A78BFA]">
            Danh mục tính năng thực tế
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            Mọi công cụ PDF cần thiết trong một giao diện thống nhất
          </h2>
          <p className="text-sm sm:text-base text-[#A5A0BC]">
            Phân loại rõ ràng theo 5 nhóm chức năng. Trạng thái của từng công cụ được công bố minh bạch theo đúng phiên bản phát hành thực tế.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => setActiveGroup('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeGroup === 'all'
                ? 'bg-[#7657F6] text-white shadow-glow'
                : 'bg-[#1C1834] text-[#A5A0BC] hover:text-white border border-[#A78BFA]/18'
            }`}
          >
            Tất cả ({ALL_FEATURES.length})
          </button>
          {FEATURE_GROUPS.map((grp) => (
            <button
              key={grp.id}
              type="button"
              onClick={() => setActiveGroup(grp.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeGroup === grp.id
                  ? 'bg-[#7657F6] text-white shadow-glow'
                  : 'bg-[#1C1834] text-[#A5A0BC] hover:text-white border border-[#A78BFA]/18'
              }`}
            >
              {grp.shortName}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

        {showViewAllButton && (
          <div className="mt-12 text-center">
            <Link
              href="/features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-[#1C1834] hover:bg-[#7657F6] border border-[#A78BFA]/30 transition-all"
            >
              <span>Xem trang tổng hợp chi tiết các nhóm công cụ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

