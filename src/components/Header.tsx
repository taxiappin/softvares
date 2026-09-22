import React, { useState, useEffect, useRef } from 'react';
import { SiteData } from '../types';
import { BrandLogo } from './BrandLogo';
import { Search, ChevronDown, Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  data: SiteData;
  onOpenSearch: () => void;
  onSelectService: (serviceId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  data,
  onOpenSearch,
  onSelectService,
}) => {
  const [activeMega, setActiveMega] = useState<'services' | 'industries' | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [industriesExpanded, setIndustriesExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMega(null);
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePointerEnterMega = (type: 'services' | 'industries') => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setActiveMega(type);
    }, 100);
  };

  const handlePointerLeaveHdr = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setActiveMega(null);
    }, 220);
  };

  const getColorVar = (colorKey: string) => {
    if (colorKey === 'primary') return 'var(--cobalt)';
    if (colorKey === 'coral') return 'var(--coral)';
    if (colorKey === 'teal') return 'var(--teal)';
    if (colorKey === 'amber') return 'var(--amber)';
    if (colorKey === 'violet') return 'var(--violet)';
    return 'var(--cobalt)';
  };

  return (
    <header
      id="hdr"
      className={`sticky top-0 z-50 bg-white border-b border-[#d5dae3] transition-shadow duration-300 ${
        isScrolled ? 'shadow-[0_10px_30px_-18px_rgba(20,24,33,0.35)]' : ''
      }`}
      onPointerLeave={handlePointerLeaveHdr}
    >
      <div className="w-[min(1280px,100%-48px)] mx-auto flex items-center h-16">
        {/* Brand Logo */}
        <a
          href="#top"
          className="mr-6 flex items-center hover:opacity-90 transition-opacity"
          aria-label={`${data.brand.name} home`}
        >
          <BrandLogo brand={data.brand} />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-stretch h-full" aria-label="Primary">
          {/* Services dropdown */}
          <div className="relative flex items-stretch">
            <button
              type="button"
              className={`flex items-center gap-1.5 px-3.5 font-semibold text-[0.95rem] transition-colors relative ${
                activeMega === 'services' ? 'text-[var(--cobalt)]' : 'text-[#141821] hover:text-[var(--cobalt)]'
              }`}
              onClick={() => setActiveMega(activeMega === 'services' ? null : 'services')}
              onPointerEnter={() => handlePointerEnterMega('services')}
              aria-expanded={activeMega === 'services'}
            >
              Services
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMega === 'services' ? 'rotate-180' : ''
                }`}
              />
              <span
                className={`absolute left-3.5 right-3.5 bottom-[-1px] h-[3px] bg-[var(--cobalt)] transition-transform duration-200 ${
                  activeMega === 'services' ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          </div>

          {/* Industries dropdown */}
          <div className="relative flex items-stretch">
            <button
              type="button"
              className={`flex items-center gap-1.5 px-3.5 font-semibold text-[0.95rem] transition-colors relative ${
                activeMega === 'industries' ? 'text-[var(--cobalt)]' : 'text-[#141821] hover:text-[var(--cobalt)]'
              }`}
              onClick={() => setActiveMega(activeMega === 'industries' ? null : 'industries')}
              onPointerEnter={() => handlePointerEnterMega('industries')}
              aria-expanded={activeMega === 'industries'}
            >
              Industries
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMega === 'industries' ? 'rotate-180' : ''
                }`}
              />
              <span
                className={`absolute left-3.5 right-3.5 bottom-[-1px] h-[3px] bg-[var(--cobalt)] transition-transform duration-200 ${
                  activeMega === 'industries' ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          </div>

          <a
            href="#work"
            className="flex items-center px-3.5 font-semibold text-[0.95rem] text-[#141821] hover:text-[var(--cobalt)] relative group"
          >
            Our work
            <span className="absolute left-3.5 right-3.5 bottom-[-1px] h-[3px] bg-[var(--cobalt)] scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
          </a>
          <a
            href="#approach"
            className="flex items-center px-3.5 font-semibold text-[0.95rem] text-[#141821] hover:text-[var(--cobalt)] relative group"
          >
            Approach
            <span className="absolute left-3.5 right-3.5 bottom-[-1px] h-[3px] bg-[var(--cobalt)] scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
          </a>
          <a
            href="#insights"
            className="flex items-center px-3.5 font-semibold text-[0.95rem] text-[#141821] hover:text-[var(--cobalt)] relative group"
          >
            Insights
            <span className="absolute left-3.5 right-3.5 bottom-[-1px] h-[3px] bg-[var(--cobalt)] scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
          </a>
          <a
            href="#contact"
            className="flex items-center px-3.5 font-semibold text-[0.95rem] text-[#141821] hover:text-[var(--cobalt)] relative group"
          >
            Contact
            <span className="absolute left-3.5 right-3.5 bottom-[-1px] h-[3px] bg-[var(--cobalt)] scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
          </a>
        </nav>

        {/* Right header actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="w-10 h-10 grid place-items-center rounded-md hover:bg-[#eceef2] transition-colors text-[#545c6d] hover:text-[#141821]"
            aria-label="Search site"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Client Portal */}
          <a
            href={data.navigation.portalHref}
            className="hidden md:inline-block font-semibold text-[0.93rem] px-2.5 hover:text-[var(--cobalt)] transition-colors"
          >
            {data.navigation.portalText}
          </a>

          {/* Primary CTA */}
          <a
            href={data.navigation.ctaHref}
            className="hidden lg:inline-flex items-center justify-center min-h-[40px] px-4 rounded-md font-bold text-sm bg-[var(--cobalt)] text-white hover:bg-[var(--cobalt-d)] transition-colors shadow-xs"
          >
            {data.navigation.ctaText}
          </a>

          {/* Mobile Burger Toggle */}
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="lg:hidden w-10 h-10 grid place-items-center rounded-md hover:bg-[#eceef2] transition-colors"
            aria-label={mobileDrawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileDrawerOpen}
          >
            {mobileDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Services Mega Menu */}
      {activeMega === 'services' && (
        <div className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-[#d5dae3] shadow-[0_28px_40px_-28px_rgba(20,24,33,0.3)] animate-fadeIn">
          <div className="w-[min(1280px,100%-48px)] mx-auto grid grid-cols-[2fr_1fr] gap-12 py-8">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {data.services.items.map((svc) => (
                <a
                  key={svc.id}
                  href="#services"
                  onClick={() => {
                    onSelectService(svc.id);
                    setActiveMega(null);
                  }}
                  className="flex gap-3.5 p-3.5 rounded-lg hover:bg-[#f5f6f8] transition-colors group"
                >
                  <div
                    className="flex-none w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
                    style={{ backgroundColor: `color-mix(in srgb, ${getColorVar(svc.colorKey)} 14%, #fff)` }}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-[3px]"
                      style={{ backgroundColor: getColorVar(svc.colorKey) }}
                    />
                  </div>
                  <div>
                    <b className="block text-[1rem] leading-tight text-[#141821] group-hover:text-[var(--cobalt)]">
                      {svc.name}
                    </b>
                    <span className="block text-[#545c6d] text-[0.9rem] leading-snug mt-1">
                      {svc.short}
                    </span>
                  </div>
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setActiveMega(null)}
                className="flex gap-3.5 p-3.5 rounded-lg hover:bg-[#f5f6f8] transition-colors group"
              >
                <div className="flex-none w-10 h-10 rounded-lg bg-[#eceef2] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#141821]" />
                </div>
                <div>
                  <b className="block text-[1rem] leading-tight text-[#141821] group-hover:text-[var(--cobalt)]">
                    Support and maintenance
                  </b>
                  <span className="block text-[#545c6d] text-[0.9rem] leading-snug mt-1">
                    Security patches and a named engineer
                  </span>
                </div>
              </a>
            </div>

            {/* Services Promo Card */}
            <div className="bg-[var(--cobalt)] text-white rounded-xl p-7 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10 space-y-3">
                <h3 className="text-xl font-bold font-['Bricolage_Grotesque']">
                  Not sure where to start?
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Book a free 30 minute product review with a senior engineer and leave with a clear next step.
                </p>
              </div>
              <div className="relative z-10 pt-4">
                <a
                  href="#contact"
                  onClick={() => setActiveMega(null)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-bold text-sm bg-white text-[#141821] hover:bg-[#e9edff] transition-colors"
                >
                  Book a review
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <Sparkles className="absolute -right-6 -bottom-6 w-36 h-36 text-white/10 pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      {/* Industries Mega Menu */}
      {activeMega === 'industries' && (
        <div className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-[#d5dae3] shadow-[0_28px_40px_-28px_rgba(20,24,33,0.3)] animate-fadeIn">
          <div className="w-[min(1280px,100%-48px)] mx-auto grid grid-cols-[2fr_1fr] gap-12 py-8">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {data.industries.items.map((ind) => (
                <a
                  key={ind.id}
                  href="#industries"
                  onClick={() => setActiveMega(null)}
                  className="flex gap-3.5 p-3.5 rounded-lg hover:bg-[#f5f6f8] transition-colors group"
                >
                  <div className="flex-none w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <span className="w-3.5 h-3.5 rounded-[3px] bg-[var(--cobalt)]" />
                  </div>
                  <div>
                    <b className="block text-[1rem] leading-tight text-[#141821] group-hover:text-[var(--cobalt)]">
                      {ind.title}
                    </b>
                    <span className="block text-[#545c6d] text-[0.9rem] leading-snug mt-1">
                      {ind.description}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Industries Promo Card */}
            <div className="bg-[#141821] text-white rounded-xl p-7 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10 space-y-3">
                <h3 className="text-xl font-bold font-['Bricolage_Grotesque']">
                  See it in your industry
                </h3>
                <p className="text-white/85 text-sm leading-relaxed">
                  Browse real applications, architectures and case studies we have shipped for teams like yours.
                </p>
              </div>
              <div className="relative z-10 pt-4">
                <a
                  href="#work"
                  onClick={() => setActiveMega(null)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-bold text-sm bg-white text-[#141821] hover:bg-gray-100 transition-colors"
                >
                  View our work
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-x-0 bottom-0 top-16 bg-white z-40 overflow-y-auto px-6 py-6 border-t border-[#d5dae3] flex flex-col justify-between">
          <div className="space-y-1 divide-y divide-[#d5dae3]">
            {/* Collapsible Services */}
            <div className="py-3">
              <button
                type="button"
                onClick={() => setServicesExpanded(!servicesExpanded)}
                className="w-full flex justify-between items-center py-2 text-lg font-bold text-[#141821]"
              >
                <span>Services</span>
                <span className="text-2xl font-light">{servicesExpanded ? '−' : '+'}</span>
              </button>
              {servicesExpanded && (
                <div className="pl-4 space-y-2.5 pt-2 pb-1">
                  {data.services.items.map((s) => (
                    <a
                      key={s.id}
                      href="#services"
                      onClick={() => {
                        onSelectService(s.id);
                        setMobileDrawerOpen(false);
                      }}
                      className="block text-[#545c6d] font-semibold text-[0.98rem] hover:text-[var(--cobalt)] py-1"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Collapsible Industries */}
            <div className="py-3">
              <button
                type="button"
                onClick={() => setIndustriesExpanded(!industriesExpanded)}
                className="w-full flex justify-between items-center py-2 text-lg font-bold text-[#141821]"
              >
                <span>Industries</span>
                <span className="text-2xl font-light">{industriesExpanded ? '−' : '+'}</span>
              </button>
              {industriesExpanded && (
                <div className="pl-4 space-y-2.5 pt-2 pb-1">
                  {data.industries.items.map((ind) => (
                    <a
                      key={ind.id}
                      href="#industries"
                      onClick={() => setMobileDrawerOpen(false)}
                      className="block text-[#545c6d] font-semibold text-[0.98rem] hover:text-[var(--cobalt)] py-1"
                    >
                      {ind.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="py-3">
              <a
                href="#work"
                onClick={() => setMobileDrawerOpen(false)}
                className="block py-2 text-lg font-bold text-[#141821]"
              >
                Our work
              </a>
            </div>
            <div className="py-3">
              <a
                href="#approach"
                onClick={() => setMobileDrawerOpen(false)}
                className="block py-2 text-lg font-bold text-[#141821]"
              >
                Approach
              </a>
            </div>
            <div className="py-3">
              <a
                href="#insights"
                onClick={() => setMobileDrawerOpen(false)}
                className="block py-2 text-lg font-bold text-[#141821]"
              >
                Insights
              </a>
            </div>
            <div className="py-3">
              <a
                href="#contact"
                onClick={() => setMobileDrawerOpen(false)}
                className="block py-2 text-lg font-bold text-[#141821]"
              >
                Contact
              </a>
            </div>
            <div className="py-3">
              <a
                href={data.navigation.portalHref}
                onClick={() => setMobileDrawerOpen(false)}
                className="block py-2 text-base font-semibold text-[#545c6d]"
              >
                {data.navigation.portalText}
              </a>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <button
              onClick={() => {
                setMobileDrawerOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md border border-[#d5dae3] font-semibold text-sm text-[#141821]"
            >
              <Search className="w-4 h-4 text-[#545c6d]" />
              <span>Search Website</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileDrawerOpen(false)}
              className="w-full flex items-center justify-center min-h-[48px] rounded-md font-bold text-base bg-[var(--cobalt)] text-white shadow-sm"
            >
              {data.navigation.ctaText}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
