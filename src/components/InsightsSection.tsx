import React from 'react';
import { InsightArticle } from '../types';
import { ArrowRight } from 'lucide-react';

interface InsightsSectionProps {
  sectionTitle: string;
  sectionDesc: string;
  articles: InsightArticle[];
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  sectionTitle,
  sectionDesc,
  articles,
}) => {
  const getColorVar = (key: string) => {
    if (key === 'coral') return 'var(--coral)';
    if (key === 'teal') return 'var(--teal)';
    if (key === 'amber') return 'var(--amber)';
    return 'var(--cobalt)';
  };

  return (
    <section id="insights" className="py-16 md:py-24 bg-white border-b border-[#d5dae3]">
      <div className="w-[min(1280px,100%-48px)] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#141821]"
              style={{ fontFamily: 'var(--font-d)' }}
            >
              {sectionTitle}
            </h2>
            <p className="text-[#545c6d] text-base sm:text-lg mt-3 leading-relaxed">
              {sectionDesc}
            </p>
          </div>
          <a
            href="#insights"
            className="font-bold text-sm sm:text-base text-[var(--cobalt)] hover:underline inline-flex items-center gap-1.5"
          >
            <span>View all articles</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((art, idx) => {
            const color = getColorVar(art.colorKey);
            return (
              <a
                key={art.id}
                href={art.link}
                className="flex flex-col bg-white border border-[#d5dae3] rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                {/* Visual Art Header */}
                <div
                  className="h-48 w-full relative overflow-hidden flex items-center justify-center p-6 border-b border-[#d5dae3]"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${color} 14%, #ffffff)`,
                  }}
                >
                  {idx === 0 && (
                    <svg viewBox="0 0 400 250" className="w-full h-full drop-shadow-sm">
                      <rect x="60" y="40" width="120" height="220" rx="20" fill="#141821" />
                      <rect x="68" y="48" width="104" height="204" rx="14" fill="#fff" />
                      <rect x="78" y="62" width="84" height="56" rx="8" fill={color} />
                      <rect x="78" y="128" width="60" height="8" rx="4" fill="#dde1e8" />
                      <rect x="78" y="144" width="84" height="8" rx="4" fill="#e6e9ef" />
                      <rect x="210" y="70" width="130" height="200" rx="20" fill="#fff" stroke="#c9cfdb" />
                      <rect x="222" y="86" width="106" height="60" rx="8" fill="#fbd0c8" />
                    </svg>
                  )}
                  {idx === 1 && (
                    <svg viewBox="0 0 300 190" className="w-full h-full drop-shadow-sm">
                      <g fill={color}>
                        <circle cx="70" cy="60" r="10" />
                        <circle cx="150" cy="40" r="10" />
                        <circle cx="230" cy="80" r="10" />
                        <circle cx="110" cy="130" r="10" />
                        <circle cx="200" cy="145" r="10" />
                      </g>
                      <g stroke={color} strokeWidth="2" fill="none">
                        <path d="M70 60 150 40 230 80 200 145 110 130Z" />
                        <path d="M150 40 110 130M150 40 200 145M70 60 200 145" />
                      </g>
                    </svg>
                  )}
                  {idx === 2 && (
                    <svg viewBox="0 0 300 190" className="w-full h-full drop-shadow-sm">
                      <g fill={color}>
                        <rect x="50" y="110" width="30" height="50" />
                        <rect x="95" y="90" width="30" height="70" />
                        <rect x="140" y="70" width="30" height="90" opacity="0.7" />
                        <rect x="185" y="100" width="30" height="60" opacity="0.5" />
                        <rect x="230" y="125" width="30" height="35" opacity="0.35" />
                      </g>
                      <path d="M50 60 120 40 190 66 260 30" stroke="#141821" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </svg>
                  )}
                </div>

                {/* Article Info */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <small className="font-bold text-xs uppercase tracking-wider text-[#545c6d]">
                      {art.category}
                    </small>
                    <h3
                      className="text-lg sm:text-xl font-bold text-[#141821] group-hover:text-[var(--cobalt)] transition-colors leading-snug"
                      style={{ fontFamily: 'var(--font-d)' }}
                    >
                      {art.title}
                    </h3>
                  </div>

                  <div className="pt-2">
                    <span className="font-bold text-sm text-[var(--cobalt)] group-hover:underline inline-flex items-center gap-1">
                      Read article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
