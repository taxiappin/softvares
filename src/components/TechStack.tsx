import React from 'react';

interface TechStackProps {
  title: string;
  items: string[];
}

export const TechStack: React.FC<TechStackProps> = ({ title, items }) => {
  return (
    <section className="py-9 border-b border-[#d5dae3] bg-white" aria-label="Technology">
      <div className="w-[min(1280px,100%-48px)] mx-auto flex items-center justify-between gap-6 flex-wrap">
        <p className="font-bold text-[#545c6d] text-[0.95rem] max-w-[20ch] leading-tight">
          {title}
        </p>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {items.map((tech) => (
            <li
              key={tech}
              className="font-semibold text-lg md:text-xl text-[#7c8497] tracking-tight hover:text-[#141821] transition-colors"
              style={{ fontFamily: 'var(--font-d)' }}
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
