import React, { useState, useEffect } from 'react';

interface CookieBannerProps {
  forceShow?: boolean;
  onCloseForce?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ forceShow, onCloseForce }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (forceShow) {
      setIsVisible(true);
      return;
    }

    const consent = localStorage.getItem('sv-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [forceShow]);

  const handleChoice = (type: 'all' | 'essential') => {
    localStorage.setItem('sv-cookie-consent', type);
    setIsVisible(false);
    if (onCloseForce) onCloseForce();
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent banner"
      className="fixed inset-x-0 bottom-0 z-50 bg-white border-t border-[#d5dae3] p-4 sm:p-5 shadow-[0_-20px_40px_-24px_rgba(20,24,33,0.3)] animate-slideUp"
    >
      <div className="w-[min(1280px,100%-48px)] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-[#545c6d] max-w-3xl leading-relaxed">
          We use essential cookies to make this site work and optional analytics cookies to improve your browsing experience. You can customize or change your choice at any time.
        </p>
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            type="button"
            onClick={() => handleChoice('all')}
            className="px-4 py-2 rounded-md font-bold text-xs bg-[var(--cobalt)] text-white hover:bg-[var(--cobalt-d)] transition-colors shadow-xs"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={() => handleChoice('essential')}
            className="px-4 py-2 rounded-md font-bold text-xs border border-[#141821] text-[#141821] hover:bg-[#141821] hover:text-white transition-colors"
          >
            Essential only
          </button>
        </div>
      </div>
    </div>
  );
};
