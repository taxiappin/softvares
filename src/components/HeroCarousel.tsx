import React, { useState, useEffect, useRef } from 'react';
import { HeroSlide } from '../types';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoplayEnabled: boolean;
  autoplayInterval: number;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides,
  autoplayEnabled,
  autoplayInterval = 8000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(!autoplayEnabled);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % total);
    }, autoplayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, autoplayInterval, total]);

  const slide = slides[currentSlide] || slides[0];

  // Visual background classes based on theme
  const getThemeBg = (theme: string) => {
    if (theme === 'dark') return 'bg-[#0c1626] text-[#e9eff8]';
    if (theme === 'amber') return 'bg-[var(--amber)] text-[#141821]';
    return 'bg-[var(--cobalt)] text-white';
  };

  const isLightControl = slide.theme === 'amber';

  return (
    <section
      id="top"
      className="relative overflow-hidden transition-colors duration-700 min-h-[620px] md:min-h-[720px] flex flex-col justify-between"
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStart === null) return;
        const diff = touchStart - e.changedTouches[0].clientX;
        if (diff > 50) nextSlide();
        else if (diff < -50) prevSlide();
        setTouchStart(null);
      }}
      aria-label="Featured hero carousel"
    >
      {/* Background slide wrapper */}
      <div className={`w-full flex-1 transition-colors duration-700 ${getThemeBg(slide.theme)} relative`}>
        {/* Soft watermark brand emblem decoration */}
        <svg
          className="absolute right-[-10%] md:right-[-5%] top-1/2 -translate-y-1/2 w-[70vw] md:w-[50vw] max-w-[760px] opacity-[0.08] pointer-events-none z-0"
          viewBox="8 8 48 48"
          aria-hidden="true"
        >
          <path
            d="M43 20H27a7 7 0 0 0 0 14h10a7 7 0 0 1 0 14H20"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </svg>

        <div className="w-[min(1280px,100%-48px)] mx-auto relative z-10 py-12 md:py-20 lg:py-24 pb-28 md:pb-32 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 md:gap-14 items-center">
          {/* Left Text Block */}
          <div className="space-y-6">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.04]"
              style={{ fontFamily: 'var(--font-d)' }}
            >
              {slide.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-[48ch] leading-relaxed">
              {slide.lead}
            </p>
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href={slide.ctaPrimaryHref}
                className={`inline-flex items-center justify-center min-h-[48px] px-6 rounded-md font-bold text-base transition-colors shadow-sm ${
                  slide.theme === 'amber'
                    ? 'bg-[#141821] text-white hover:bg-black'
                    : 'bg-white text-[#141821] hover:bg-[#e9edff]'
                }`}
              >
                {slide.ctaPrimaryText}
              </a>
              <a
                href={slide.ctaSecondaryHref}
                className={`inline-flex items-center justify-center min-h-[48px] px-6 rounded-md font-bold text-base border-2 transition-colors ${
                  slide.theme === 'amber'
                    ? 'border-[#141821] text-[#141821] hover:bg-[#141821] hover:text-white'
                    : 'border-white text-white hover:bg-white hover:text-[#141821]'
                }`}
              >
                {slide.ctaSecondaryText}
              </a>
            </div>
          </div>

          {/* Right Interactive Visual Mockup */}
          <div className="relative w-full max-w-[580px] lg:max-w-none mx-auto h-[380px] sm:h-[420px] md:h-[460px] text-xs sm:text-sm">
            {/* SLIDE 1 MOCKUP: Web + Mobile */}
            {slide.mockType === 'web-mobile' && (
              <div className="relative w-full h-full">
                {/* Browser window */}
                <div className="absolute left-0 top-4 w-[78%] sm:w-[74%] h-[82%] bg-white rounded-xl shadow-2xl text-[#141821] overflow-hidden border border-black/10">
                  <div className="h-9 bg-[#f1f3f7] border-b border-[#e3e6ec] flex items-center gap-1.5 px-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ccd2dd]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ccd2dd]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ccd2dd]" />
                    <span className="ml-3 bg-white rounded-full px-3 py-0.5 text-[0.72rem] text-[#6a7284]">
                      app.brightcart.io/overview
                    </span>
                  </div>
                  <div className="p-4 sm:p-5 space-y-4">
                    <div className="flex justify-between items-baseline">
                      <strong className="text-base sm:text-lg font-bold">Overview</strong>
                      <span className="text-xs text-[#6a7284]">Last 30 days</span>
                    </div>
                    {/* KPIs */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="border border-[#e6e9ef] rounded-lg p-2 sm:p-2.5 bg-[#fcfdfe]">
                        <small className="block text-[0.7rem] text-[#6a7284]">Revenue</small>
                        <b className="text-sm sm:text-base font-bold text-[#141821]">
                          {slide.stats.revenue || '$48.2k'}
                        </b>
                        <span className="text-[0.7rem] font-bold text-[#0a8f4a] block">+12.4%</span>
                      </div>
                      <div className="border border-[#e6e9ef] rounded-lg p-2 sm:p-2.5 bg-[#fcfdfe]">
                        <small className="block text-[0.7rem] text-[#6a7284]">Orders</small>
                        <b className="text-sm sm:text-base font-bold text-[#141821]">
                          {slide.stats.orders || '1,284'}
                        </b>
                        <span className="text-[0.7rem] font-bold text-[#0a8f4a] block">+8.1%</span>
                      </div>
                      <div className="border border-[#e6e9ef] rounded-lg p-2 sm:p-2.5 bg-[#fcfdfe]">
                        <small className="block text-[0.7rem] text-[#6a7284]">Conversion</small>
                        <b className="text-sm sm:text-base font-bold text-[#141821]">
                          {slide.stats.conversion || '4.8%'}
                        </b>
                        <span className="text-[0.7rem] font-bold text-[#0a8f4a] block">+0.6%</span>
                      </div>
                    </div>
                    {/* Mini Area Chart SVG */}
                    <div className="h-20 sm:h-24 border border-[#e6e9ef] rounded-lg p-1.5 bg-[#fcfdfe] relative overflow-hidden">
                      <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="w-full h-full">
                        <defs>
                          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#1b4dff" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#1b4dff" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0 62C20 58 30 44 50 47S80 26 100 31S130 52 150 36S185 10 210 19S255 24 280 8L300 5V80H0Z"
                          fill="url(#areaGrad)"
                        />
                        <path
                          d="M0 62C20 58 30 44 50 47S80 26 100 31S130 52 150 36S185 10 210 19S255 24 280 8L300 5"
                          fill="none"
                          stroke="var(--cobalt)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    {/* Rows */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between items-center text-xs py-1 border-t border-[#eef0f4]">
                        <span className="text-[#545c6d]">Order #10482</span>
                        <span className="font-bold text-[#0a8f4a] bg-green-50 px-2 py-0.5 rounded text-[0.75rem]">
                          Paid
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs py-1 border-t border-[#eef0f4]">
                        <span className="text-[#545c6d]">Order #10481</span>
                        <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[0.75rem]">
                          Shipped
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Smartphone mockup */}
                <div className="absolute right-0 bottom-0 w-[42%] sm:w-[38%] h-[88%] bg-[#0b1220] rounded-[2rem] p-2 shadow-2xl border border-white/20">
                  <div className="relative h-full bg-white rounded-[1.6rem] overflow-hidden p-3.5 pt-6 text-[#141821] flex flex-col justify-between">
                    <div className="w-12 h-2.5 bg-[#0b1220] rounded-full mx-auto mb-2" />
                    <div>
                      <span className="text-[0.7rem] text-[#6a7284]">Good morning</span>
                      <b className="block text-sm font-bold">Priya</b>
                      <div className="mt-2 bg-[var(--cobalt)] text-white p-2.5 rounded-xl shadow-xs">
                        <small className="text-[0.65rem] opacity-80 block">Available balance</small>
                        <b className="text-base font-bold font-['Bricolage_Grotesque']">
                          {slide.stats.balance || '$12,480.50'}
                        </b>
                      </div>
                    </div>
                    <div className="space-y-1.5 my-2">
                      <div className="flex justify-between text-[0.72rem] py-1 border-t border-[#f0f2f7]">
                        <span>Coffee Lab</span>
                        <b className="text-red-500">-$4.20</b>
                      </div>
                      <div className="flex justify-between text-[0.72rem] py-1 border-t border-[#f0f2f7]">
                        <span>Salary</span>
                        <b className="text-[#0a8f4a]">+$3,200</b>
                      </div>
                      <div className="flex justify-between text-[0.72rem] py-1 border-t border-[#f0f2f7]">
                        <span>Metro pass</span>
                        <b>-$28.00</b>
                      </div>
                    </div>
                    <div className="h-6 border-t border-[#f0f2f7] flex justify-around items-center">
                      <span className="w-3.5 h-1.5 bg-[var(--cobalt)] rounded-full" />
                      <span className="w-2 h-1.5 bg-gray-300 rounded-full" />
                      <span className="w-2 h-1.5 bg-gray-300 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 2 MOCKUP: AI Chat + Invoice Parser */}
            {slide.mockType === 'ai-chat' && (
              <div className="relative w-full h-full">
                {/* AI Chat Card */}
                <div className="absolute left-0 top-0 w-[72%] sm:w-[68%] h-[88%] bg-[#142238] border border-[#27405c] rounded-xl shadow-2xl p-4 text-[#e8eef7] flex flex-col justify-between">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-[#27405c] font-bold text-xs sm:text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2ee6c4] shadow-[0_0_8px_#2ee6c4]" />
                    <span>Finance Copilot</span>
                  </div>
                  <div className="space-y-2.5 overflow-hidden my-2">
                    <div className="ml-auto bg-[#243a57] rounded-lg p-2.5 max-w-[85%] text-xs">
                      Which vendor invoices are overdue this quarter?
                    </div>
                    <div className="mr-auto bg-[#0f3a3b] border border-[#1a6a66] rounded-lg p-2.5 max-w-[90%] text-xs space-y-1.5">
                      <p>3 invoices are overdue, totalling $18,240.</p>
                      <div className="bg-black/20 p-2 rounded text-[0.7rem] space-y-1">
                        <div className="flex justify-between text-[#8fa0bb]">
                          <span>Apex Supply</span>
                          <span>$9,800</span>
                        </div>
                        <div className="flex justify-between text-[#8fa0bb]">
                          <span>Brightline</span>
                          <span>$5,440</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto bg-[#243a57] rounded-lg p-2 max-w-[85%] text-xs">
                      Draft reminders for all three.
                    </div>
                    <div className="mr-auto bg-[#0f3a3b] border border-[#1a6a66] rounded-lg p-2 text-xs">
                      Done. 3 drafts are ready.
                      <span className="inline-block mt-1 px-2 py-0.5 bg-[#2ee6c4] text-[#062b26] font-bold rounded text-[0.68rem]">
                        Review drafts
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Extracted Invoice Card */}
                <div className="absolute right-0 top-12 w-[55%] sm:w-[50%] bg-white rounded-xl shadow-2xl p-4 text-[#141821] border border-gray-200">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-xs sm:text-sm">Invoice INV-2048</h4>
                    <span className="bg-emerald-50 text-[#087a6d] font-bold text-[0.68rem] px-2 py-0.5 rounded-full">
                      AI Verified
                    </span>
                  </div>
                  <p className="text-[0.68rem] text-[#6a7284] mb-3">Uploaded 09:41, 3 fields extracted</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-t border-gray-100">
                      <span className="text-[#6a7284]">Vendor</span>
                      <b>Apex Supply</b>
                    </div>
                    <div className="flex justify-between py-1 border-t border-gray-100">
                      <span className="text-[#6a7284]">Amount</span>
                      <b className="text-emerald-700 font-bold">$9,800.00</b>
                    </div>
                    <div className="flex justify-between py-1 border-t border-gray-100">
                      <span className="text-[#6a7284]">Due date</span>
                      <b>12 Sep 2026</b>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 bg-[#e4f8f4] text-[#087a6d] font-semibold text-[0.72rem] p-1.5 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-[#0a9b8b]" />
                    <span>Processed in 1.2s</span>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 3 MOCKUP: Cloud Architecture + Migration */}
            {slide.mockType === 'cloud-architecture' && (
              <div className="relative w-full h-full flex flex-col justify-between">
                {/* SVG Architecture Diagram */}
                <div className="w-full bg-white rounded-xl shadow-2xl p-4 text-[#141821] border border-gray-200 h-[68%]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-xs sm:text-sm">Order Platform Architecture</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[0.7rem] font-bold px-2.5 py-0.5 rounded-full">
                      Live Kubernetes
                    </span>
                  </div>
                  <svg viewBox="0 0 460 170" className="w-full h-full">
                    {/* Animated Flow Lines */}
                    <path d="M50 85 H74" className="animate-pipeline stroke-[#98a2b5] fill-none stroke-[1.8]" />
                    <path d="M134 85 H166" className="animate-pipeline stroke-[#98a2b5] fill-none stroke-[1.8]" />
                    <path d="M236 85 C252 85 252 30 274 30" className="animate-pipeline stroke-[#98a2b5] fill-none stroke-[1.8]" />
                    <path d="M236 85 H274" className="animate-pipeline stroke-[#98a2b5] fill-none stroke-[1.8]" />
                    <path d="M236 85 C252 85 252 140 274 140" className="animate-pipeline stroke-[#98a2b5] fill-none stroke-[1.8]" />
                    <path d="M356 30 C374 30 374 85 392 85" className="animate-pipeline stroke-[#98a2b5] fill-none stroke-[1.8]" />
                    <path d="M356 85 H392" className="animate-pipeline stroke-[#98a2b5] fill-none stroke-[1.8]" />
                    <path d="M356 140 C374 140 374 85 392 85" className="animate-pipeline stroke-[#98a2b5] fill-none stroke-[1.8]" />

                    {/* Nodes */}
                    <circle cx="30" cy="85" r="20" fill="var(--cobalt)" />
                    <text x="30" y="89" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Users</text>

                    <rect x="74" y="65" width="60" height="40" rx="8" fill="#fff" stroke="#c9cfdb" strokeWidth="1.5" />
                    <text x="104" y="89" textAnchor="middle" fill="#141821" fontSize="10" fontWeight="bold">CDN</text>

                    <rect x="166" y="65" width="70" height="40" rx="8" fill="#fff" stroke="#c9cfdb" strokeWidth="1.5" />
                    <text x="201" y="89" textAnchor="middle" fill="#141821" fontSize="10" fontWeight="bold">API Gateway</text>

                    <rect x="274" y="12" width="82" height="34" rx="6" fill="#fff" stroke="#c9cfdb" strokeWidth="1.5" />
                    <text x="315" y="33" textAnchor="middle" fill="#141821" fontSize="9.5" fontWeight="bold">Orders</text>

                    <rect x="274" y="68" width="82" height="34" rx="6" fill="#fff" stroke="#c9cfdb" strokeWidth="1.5" />
                    <text x="315" y="89" textAnchor="middle" fill="#141821" fontSize="9.5" fontWeight="bold">Payments</text>

                    <rect x="274" y="123" width="82" height="34" rx="6" fill="#fff" stroke="#c9cfdb" strokeWidth="1.5" />
                    <text x="315" y="144" textAnchor="middle" fill="#141821" fontSize="9.5" fontWeight="bold">Inventory</text>

                    <rect x="392" y="62" width="64" height="46" rx="8" fill="#141821" />
                    <text x="424" y="89" textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="bold">Database</text>
                  </svg>
                </div>

                {/* Progress + Stats Row */}
                <div className="grid grid-cols-2 gap-3 h-[28%]">
                  <div className="bg-white rounded-xl shadow-xl p-3 text-[#141821] flex flex-col justify-between">
                    <small className="text-[#6a7284] text-[0.7rem] font-semibold">Migration progress</small>
                    <b className="text-xl sm:text-2xl font-bold font-['Bricolage_Grotesque'] text-[var(--cobalt)]">
                      {slide.stats.migrated || '78%'}
                    </b>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-[var(--cobalt)] h-full w-[78%] rounded-full" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-xl p-3 text-[#141821] flex flex-col justify-between">
                    <small className="text-[#6a7284] text-[0.7rem] font-semibold">Cloud spend cut</small>
                    <b className="text-xl sm:text-2xl font-bold font-['Bricolage_Grotesque'] text-[#0a9b8b]">
                      {slide.stats.costCut || '-32%'}
                    </b>
                    <div className="flex items-end gap-1 h-3">
                      <span className="w-2.5 bg-gray-300 h-full rounded-xs" />
                      <span className="w-2.5 bg-gray-300 h-[80%] rounded-xs" />
                      <span className="w-2.5 bg-gray-300 h-[65%] rounded-xs" />
                      <span className="w-2.5 bg-[#0a9b8b] h-[45%] rounded-xs" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Carousel Navigation Bottom Controls */}
      <div className="absolute left-0 right-0 bottom-6 z-20">
        <div className="w-[min(1280px,100%-48px)] mx-auto flex items-center gap-3.5">
          {/* Prev Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className={`w-10 h-10 rounded-md border-2 grid place-items-center transition-colors ${
              isLightControl
                ? 'border-[#141821] text-[#141821] hover:bg-[#141821] hover:text-white'
                : 'border-white text-white hover:bg-white hover:text-[var(--cobalt)]'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className={`w-10 h-10 rounded-md border-2 grid place-items-center transition-colors ${
              isLightControl
                ? 'border-[#141821] text-[#141821] hover:bg-[#141821] hover:text-white'
                : 'border-white text-white hover:bg-white hover:text-[var(--cobalt)]'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Pause / Play Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
            className={`w-10 h-10 rounded-md border-2 grid place-items-center transition-colors ${
              isLightControl
                ? 'border-[#141821] text-[#141821] hover:bg-[#141821] hover:text-white'
                : 'border-white text-white hover:bg-white hover:text-[var(--cobalt)]'
            }`}
          >
            {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
          </button>

          {/* Indicators */}
          <div className="flex gap-2.5 ml-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="py-4 w-12 sm:w-16 group focus:outline-none"
              >
                <div
                  className={`h-1.5 rounded-full overflow-hidden transition-colors ${
                    isLightControl ? 'bg-black/20' : 'bg-white/30'
                  }`}
                >
                  <div
                    className={`h-full transition-all duration-300 ${
                      i === currentSlide
                        ? isLightControl ? 'bg-[#141821] w-full' : 'bg-white w-full'
                        : 'w-0'
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Counter */}
          <div
            className={`ml-auto font-bold text-sm tracking-wider tabular-nums ${
              isLightControl ? 'text-[#141821]' : 'text-white'
            }`}
          >
            {currentSlide + 1} / {total}
          </div>
        </div>
      </div>
    </section>
  );
};
