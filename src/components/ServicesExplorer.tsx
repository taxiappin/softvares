import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { Check, ArrowRight } from 'lucide-react';

interface ServicesExplorerProps {
  sectionTitle: string;
  sectionDesc: string;
  services: ServiceItem[];
  selectedServiceId?: string;
  onSelectServiceForContact: (serviceName: string) => void;
}

export const ServicesExplorer: React.FC<ServicesExplorerProps> = ({
  sectionTitle,
  sectionDesc,
  services,
  selectedServiceId,
  onSelectServiceForContact,
}) => {
  const [activeId, setActiveId] = useState(selectedServiceId || services[0]?.id || 'web');

  const activeService = services.find((s) => s.id === activeId) || services[0];

  const getColorVar = (key: string) => {
    if (key === 'primary') return 'var(--cobalt)';
    if (key === 'coral') return 'var(--coral)';
    if (key === 'teal') return 'var(--teal)';
    if (key === 'amber') return 'var(--amber)';
    if (key === 'violet') return 'var(--violet)';
    return 'var(--cobalt)';
  };

  const activeColor = getColorVar(activeService.colorKey);

  return (
    <section id="services" className="py-16 md:py-24 bg-white border-b border-[#d5dae3]">
      <div className="w-[min(1280px,100%-48px)] mx-auto">
        {/* Section Header */}
        <div className="mb-10 md:mb-14 max-w-3xl">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#141821]"
            style={{ fontFamily: 'var(--font-d)' }}
          >
            {sectionTitle}
          </h2>
          <p className="text-[#545c6d] text-lg sm:text-xl mt-3 leading-relaxed">
            {sectionDesc}
          </p>
        </div>

        {/* Explorer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 lg:gap-14 items-start">
          {/* Vertical / Horizontal Tabs */}
          <div
            className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 scrollbar-none sticky top-24"
            role="tablist"
            aria-label="Services tabs"
          >
            {services.map((svc) => {
              const isSelected = svc.id === activeService.id;
              const svcColor = getColorVar(svc.colorKey);
              return (
                <button
                  key={svc.id}
                  onClick={() => setActiveId(svc.id)}
                  role="tab"
                  aria-selected={isSelected}
                  className={`flex-none lg:w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-white border-[#d5dae3] shadow-md shadow-black/5'
                      : 'border-transparent hover:bg-[#f5f6f8]'
                  }`}
                  style={{
                    borderLeftWidth: isSelected ? '4px' : '1px',
                    borderLeftColor: isSelected ? svcColor : 'transparent',
                  }}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-[3px] mt-1 flex-shrink-0"
                    style={{ backgroundColor: svcColor }}
                  />
                  <div>
                    <b
                      className="block text-base font-bold text-[#141821]"
                      style={{ fontFamily: 'var(--font-d)' }}
                    >
                      {svc.name}
                    </b>
                    <span className="hidden sm:block text-[#545c6d] text-xs sm:text-sm mt-0.5 leading-snug">
                      {svc.short}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Service Panel */}
          <div
            className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center bg-[#fcfdfe] p-6 sm:p-8 md:p-10 rounded-2xl border border-[#d5dae3] animate-fadeIn"
            key={activeService.id}
          >
            {/* Visual illustration box */}
            <div
              className="rounded-xl aspect-[13/10] overflow-hidden flex items-center justify-center p-6 relative border border-black/5 shadow-inner"
              style={{
                backgroundColor: `color-mix(in srgb, ${activeColor} 12%, #ffffff)`,
              }}
            >
              {/* Dynamic SVG graphic depending on service */}
              {activeService.id === 'web' && (
                <svg viewBox="0 0 520 340" className="w-full h-full drop-shadow-md">
                  <rect x="50" y="34" width="420" height="272" rx="12" fill="#fff" />
                  <path d="M50 46a12 12 0 0 1 12-12h396a12 12 0 0 1 12 12v22H50z" fill="#eceef2" />
                  <circle cx="72" cy="51" r="5" fill="#ccd2dd" />
                  <circle cx="90" cy="51" r="5" fill="#ccd2dd" />
                  <circle cx="108" cy="51" r="5" fill="#ccd2dd" />
                  <rect x="74" y="92" width="200" height="120" rx="8" fill={activeColor} />
                  <rect x="92" y="112" width="110" height="12" rx="3" fill="#fff" />
                  <rect x="92" y="134" width="150" height="8" rx="3" fill="#fff" opacity="0.65" />
                  <rect x="92" y="150" width="120" height="8" rx="3" fill="#fff" opacity="0.65" />
                  <rect x="92" y="176" width="64" height="20" rx="4" fill="#141821" />
                  <rect x="292" y="92" width="154" height="56" rx="8" fill="#eceef2" />
                  <rect x="292" y="156" width="154" height="56" rx="8" fill="#eceef2" />
                  <rect x="74" y="224" width="104" height="64" rx="8" fill="#eceef2" />
                  <rect x="188" y="224" width="104" height="64" rx="8" fill="#eceef2" />
                  <rect x="302" y="224" width="144" height="64" rx="8" fill="#eceef2" />
                </svg>
              )}

              {activeService.id === 'mobile' && (
                <svg viewBox="0 0 460 320" className="w-full h-full drop-shadow-md">
                  <rect x="110" y="20" width="130" height="280" rx="22" fill="#141821" />
                  <rect x="118" y="28" width="114" height="264" rx="16" fill="#fff" />
                  <rect x="130" y="55" width="90" height="70" rx="10" fill={activeColor} />
                  <rect x="130" y="140" width="90" height="10" rx="5" fill="#eceef2" />
                  <rect x="130" y="160" width="60" height="10" rx="5" fill="#eceef2" />
                  <rect x="260" y="40" width="120" height="250" rx="20" fill="#141821" />
                  <rect x="268" y="48" width="104" height="234" rx="14" fill="#fff" />
                  <rect x="280" y="70" width="80" height="60" rx="8" fill={activeColor} opacity="0.25" />
                  <rect x="280" y="145" width="80" height="10" rx="5" fill="#eceef2" />
                  <rect x="280" y="165" width="80" height="40" rx="8" fill="#eceef2" />
                </svg>
              )}

              {activeService.id === 'ai' && (
                <svg viewBox="0 0 460 320" className="w-full h-full drop-shadow-md">
                  <rect x="40" y="40" width="220" height="50" rx="10" fill="#fff" />
                  <rect x="58" y="58" width="140" height="8" rx="4" fill="#eceef2" />
                  <rect x="160" y="110" width="240" height="64" rx="12" fill={activeColor} />
                  <rect x="180" y="130" width="180" height="8" rx="4" fill="#fff" />
                  <rect x="180" y="146" width="130" height="8" rx="4" fill="#fff" opacity="0.7" />
                  <rect x="40" y="200" width="180" height="48" rx="10" fill="#fff" />
                  <circle cx="360" cy="220" r="10" fill={activeColor} />
                  <circle cx="400" cy="200" r="10" fill={activeColor} />
                  <circle cx="440" cy="225" r="10" fill={activeColor} />
                  <path d="M360 220 L400 200 L440 225 L400 250 Z" stroke={activeColor} strokeWidth="3" fill="none" />
                </svg>
              )}

              {activeService.id === 'cloud' && (
                <svg viewBox="0 0 460 320" className="w-full h-full drop-shadow-md">
                  <path
                    d="M130 220a44 44 0 0 1 4-88 60 60 0 0 1 114-12 50 50 0 0 1 56 50 40 40 0 0 1-8 50z"
                    fill="#fff"
                  />
                  <rect x="150" y="160" width="65" height="18" rx="4" fill={activeColor} />
                  <rect x="150" y="186" width="110" height="12" rx="4" fill="#eceef2" />
                  <line x1="80" y1="260" x2="380" y2="260" stroke="#ccd2dd" strokeWidth="2" strokeDasharray="4 4" />
                  <rect x="90" y="240" width="56" height="40" rx="8" fill="#141821" />
                  <rect x="230" y="240" width="56" height="40" rx="8" fill="#141821" />
                  <rect x="350" y="240" width="56" height="40" rx="8" fill="#141821" />
                </svg>
              )}

              {activeService.id === 'design' && (
                <svg viewBox="0 0 460 320" className="w-full h-full drop-shadow-md">
                  <rect x="40" y="40" width="280" height="230" rx="12" fill="#fff" />
                  <rect x="60" y="60" width="240" height="24" rx="6" fill="#eceef2" />
                  <rect x="60" y="100" width="110" height="80" rx="8" fill={activeColor} />
                  <circle cx="360" cy="70" r="14" fill={activeColor} />
                  <circle cx="395" cy="70" r="14" fill="#f0492f" />
                  <circle cx="360" cy="110" r="14" fill="#f2a900" />
                  <circle cx="395" cy="110" r="14" fill="#141821" />
                  <rect x="330" y="150" width="100" height="110" rx="10" fill="#fff" />
                  <text x="380" y="220" textAnchor="middle" fontSize="50" fontWeight="bold" fill="#141821" fontFamily="Bricolage Grotesque">
                    Aa
                  </text>
                </svg>
              )}
            </div>

            {/* Details & bullets */}
            <div className="space-y-5">
              <h3
                className="text-2xl sm:text-3xl font-bold text-[#141821]"
                style={{ fontFamily: 'var(--font-d)' }}
              >
                {activeService.name}
              </h3>
              <p className="text-[#545c6d] text-base leading-relaxed">
                {activeService.lead}
              </p>

              {/* Checkmarks */}
              <ul className="space-y-2.5 pt-1">
                {activeService.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base font-medium text-[#1d2330]">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: activeColor }}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeService.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-semibold px-3 py-1 rounded-md bg-[#eceef2] text-[#1d2330]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSelectServiceForContact(activeService.name)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-bold text-sm sm:text-base text-white transition-all shadow-sm hover:opacity-95"
                  style={{ backgroundColor: activeColor }}
                >
                  <span>{activeService.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
