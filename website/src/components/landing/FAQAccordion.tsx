'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '@/types';
import { FAQ_ITEMS } from '@/content/faq';

interface FAQAccordionProps {
  items?: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items = FAQ_ITEMS }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  return (
    <div className="space-y-3">
      {items.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className={`rounded-2xl border transition-colors ${
              isOpen
                ? 'bg-[#1C1834] border-[#7657F6]/60'
                : 'bg-[#151228] border-[#A78BFA]/18 hover:border-[#A78BFA]/40'
            }`}
          >
            <h3>
              <button
                type="button"
                expanded-state={isOpen ? 'true' : 'false'}
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#7657F6] rounded-2xl"
              >
                <span className="text-sm font-bold text-[#F8FAFC]">{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#A78BFA] flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>

            {isOpen && (
              <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-[#A5A0BC] leading-relaxed border-t border-[#A78BFA]/10">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

