import React from 'react';
import { BrandConfig } from '../types';

interface BrandLogoProps {
  brand: BrandConfig;
  className?: string;
  isDark?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ brand, className = '', isDark = false }) => {
  const { logoType, logoText, logoImageUrl, logoCustomSvg, logoPrimaryColor, name } = brand;

  if (logoType === 'custom-image' && logoImageUrl) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img
          src={logoImageUrl}
          alt={name}
          className="h-8 w-auto max-h-8 object-contain"
          referrerPolicy="no-referrer"
        />
        <span className="font-bold text-xl tracking-tight" style={{ fontFamily: 'var(--font-d)' }}>
          {name}
        </span>
      </div>
    );
  }

  if (logoType === 'text-only') {
    return (
      <span
        className={`font-bold text-xl tracking-tight ${className}`}
        style={{ fontFamily: 'var(--font-d)', color: isDark ? '#ffffff' : 'inherit' }}
      >
        {logoText || name}
      </span>
    );
  }

  if (logoType === 'custom-svg' && logoCustomSvg) {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <div
          className="w-8 h-8 flex-shrink-0"
          dangerouslySetInnerHTML={{ __html: logoCustomSvg }}
        />
        <span className="font-bold text-xl tracking-tight" style={{ fontFamily: 'var(--font-d)' }}>
          {name}
        </span>
      </div>
    );
  }

  // Default svg-icon
  return (
    <div className={`flex items-center gap-2.5 font-bold text-xl tracking-tight ${className}`}>
      <svg
        viewBox="0 0 64 64"
        className="w-8 h-8 flex-shrink-0"
        aria-hidden="true"
      >
        <rect
          width="64"
          height="64"
          rx="14"
          fill={logoPrimaryColor || 'var(--cobalt)'}
        />
        <path
          d="M43 20H27a7 7 0 0 0 0 14h10a7 7 0 0 1 0 14H20"
          fill="none"
          stroke="#ffffff"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
      <span style={{ fontFamily: 'var(--font-d)', color: isDark ? '#ffffff' : 'inherit' }}>
        {name}
      </span>
    </div>
  );
};
