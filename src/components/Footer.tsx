import React from 'react';
import { SiteData } from '../types';
import { BrandLogo } from './BrandLogo';
import { Globe } from 'lucide-react';

interface FooterProps {
  data: SiteData;
  onOpenCookiePref: () => void;
}

export const Footer: React.FC<FooterProps> = ({ data, onOpenCookiePref }) => {
  const { footer, brand, services, industries } = data;

  return (
    <footer className="bg-[#f5f6f8] border-t border-[#d5dae3] pt-16 pb-8">
      <div className="w-[min(1280px,100%-48px)] mx-auto">
        {/* Main 5-Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-[#d5dae3]">
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <BrandLogo brand={brand} />
            <p className="text-sm text-[#545c6d] leading-relaxed max-w-[32ch]">
              {footer.tagline}
            </p>
          </div>

          {/* Column 1: Services */}
          <div className="space-y-3">
            <h4
              className="text-sm font-bold uppercase tracking-wider text-[#141821]"
              style={{ fontFamily: 'var(--font-b)' }}
            >
              {footer.servicesTitle}
            </h4>
            <ul className="space-y-2 text-sm">
              {services.items.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="text-[#545c6d] hover:text-[var(--cobalt)] transition-colors">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Industries */}
          <div className="space-y-3">
            <h4
              className="text-sm font-bold uppercase tracking-wider text-[#141821]"
              style={{ fontFamily: 'var(--font-b)' }}
            >
              {footer.industriesTitle}
            </h4>
            <ul className="space-y-2 text-sm">
              {industries.items.map((ind) => (
                <li key={ind.id}>
                  <a href="#industries" className="text-[#545c6d] hover:text-[var(--cobalt)] transition-colors">
                    {ind.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h4
              className="text-sm font-bold uppercase tracking-wider text-[#141821]"
              style={{ fontFamily: 'var(--font-b)' }}
            >
              {footer.companyTitle}
            </h4>
            <ul className="space-y-2 text-sm">
              {footer.companyLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-[#545c6d] hover:text-[var(--cobalt)] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="space-y-3">
            <h4
              className="text-sm font-bold uppercase tracking-wider text-[#141821]"
              style={{ fontFamily: 'var(--font-b)' }}
            >
              {footer.supportTitle}
            </h4>
            <ul className="space-y-2 text-sm">
              {footer.supportLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-[#545c6d] hover:text-[var(--cobalt)] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal & Copyright bottom row */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#545c6d]">
          <div className="flex items-center gap-2 font-medium text-[#141821]">
            <Globe className="w-4 h-4 text-[#545c6d]" />
            <span>{footer.location}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {footer.legalLinks.map((link, idx) => (
              <a key={idx} href={link.href} className="hover:underline">
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={onOpenCookiePref}
              className="hover:underline text-left"
            >
              Cookie preferences
            </button>
          </div>

          <div>
            &copy; {footer.copyrightYear} {brand.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
