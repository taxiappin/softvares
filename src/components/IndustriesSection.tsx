import React from 'react';
import { IndustryItem } from '../types';
import { Heart, Landmark, ShoppingCart, Truck, GraduationCap, Factory, ArrowRight } from 'lucide-react';

interface IndustriesSectionProps {
  sectionTitle: string;
  sectionDesc: string;
  industries: IndustryItem[];
  onSelectIndustryForContact: (industryName: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  sectionTitle,
  sectionDesc,
  industries,
  onSelectIndustryForContact,
}) => {
  const getIcon = (iconName: IndustryItem['iconName']) => {
    const props = { className: 'w-8 h-8 text-[var(--cobalt)] stroke-[1.6]' };
    switch (iconName) {
      case 'heart':
        return <Heart {...props} />;
      case 'landmark':
        return <Landmark {...props} />;
      case 'shopping-cart':
        return <ShoppingCart {...props} />;
      case 'truck':
        return <Truck {...props} />;
      case 'graduation-cap':
        return <GraduationCap {...props} />;
      case 'factory':
        return <Factory {...props} />;
      default:
        return <Landmark {...props} />;
    }
  };

  return (
    <section id="industries" className="py-16 md:py-24 bg-white border-b border-[#d5dae3]">
      <div className="w-[min(1280px,100%-48px)] mx-auto">
        <div className="mb-10 md:mb-14 max-w-3xl">
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

        {/* 3-Column Grid with clean boundary lines matching original styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#d5dae3]">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => onSelectIndustryForContact(ind.title)}
              className="text-left p-8 sm:p-9 border-r border-b border-[#d5dae3] bg-white hover:bg-[#f5f6f8] transition-colors flex flex-col justify-between group space-y-6"
            >
              <div className="space-y-4">
                <div className="p-2 rounded-lg bg-blue-50/70 inline-block">
                  {getIcon(ind.iconName)}
                </div>
                <h3
                  className="text-xl font-bold text-[#141821] group-hover:text-[var(--cobalt)] transition-colors"
                  style={{ fontFamily: 'var(--font-d)' }}
                >
                  {ind.title}
                </h3>
                <p className="text-sm sm:text-base text-[#545c6d] leading-relaxed">
                  {ind.description}
                </p>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 font-bold text-sm text-[var(--cobalt)]">
                  <span>Talk to us about {ind.title.toLowerCase()}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
