import React, { useState } from 'react';
import { EngineeringPillar, PipelineItem } from '../types';
import { ShieldCheck, FlaskConical, Accessibility, KeyRound, Check, RefreshCw } from 'lucide-react';

interface EngineeringSectionProps {
  sectionTitle: string;
  sectionDesc: string;
  pillars: EngineeringPillar[];
  pipelineReleaseName: string;
  pipelineStatus: string;
  pipelineItems: PipelineItem[];
}

export const EngineeringSection: React.FC<EngineeringSectionProps> = ({
  sectionTitle,
  sectionDesc,
  pillars,
  pipelineReleaseName,
  pipelineStatus,
  pipelineItems,
}) => {
  const [items, setItems] = useState<PipelineItem[]>(pipelineItems);
  const [isRunning, setIsRunning] = useState(false);
  const [statusText, setStatusText] = useState(pipelineStatus);

  const getPillarIcon = (iconName: EngineeringPillar['icon']) => {
    const props = { className: 'w-7 h-7 text-[#2ee6c4] stroke-[1.7] mb-4' };
    switch (iconName) {
      case 'shield-check':
        return <ShieldCheck {...props} />;
      case 'flask-conical':
        return <FlaskConical {...props} />;
      case 'accessibility':
        return <Accessibility {...props} />;
      case 'key-round':
        return <KeyRound {...props} />;
      default:
        return <ShieldCheck {...props} />;
    }
  };

  const handleSimulatePipeline = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setStatusText('Pipeline running in production cluster...');

    // Reset items
    setItems((prev) => prev.map((item) => ({ ...item, status: 'waiting' })));

    for (let i = 0; i < items.length; i++) {
      // Set current to running
      setItems((prev) =>
        prev.map((item, idx) =>
          idx === i
            ? { ...item, status: 'running' }
            : idx < i
            ? { ...item, status: 'done' }
            : { ...item, status: 'waiting' }
        )
      );
      await new Promise((r) => setTimeout(r, 650));
    }

    setItems((prev) => prev.map((item) => ({ ...item, status: 'done' })));
    setStatusText('Released in 3 min 12 s, zero downtime');
    setIsRunning(false);
  };

  return (
    <section id="engineering" className="py-16 md:py-24 bg-[#0c1626] text-[#e9eff8] border-b border-[#23344d]">
      <div className="w-[min(1280px,100%-48px)] mx-auto">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-d)' }}
          >
            {sectionTitle}
          </h2>
          <p className="text-[#a9b6cb] text-base sm:text-lg mt-3 leading-relaxed">
            {sectionDesc}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#23344d] divide-y sm:divide-y-0 sm:divide-x divide-[#23344d]">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="py-8 sm:py-6 px-0 sm:px-6 first:pl-0 last:pr-0 space-y-2">
              {getPillarIcon(pillar.icon)}
              <h3
                className="text-lg sm:text-xl font-bold text-[#e9eff8]"
                style={{ fontFamily: 'var(--font-d)' }}
              >
                {pillar.title}
              </h3>
              <p className="text-sm text-[#a9b6cb] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Continuous Delivery Pipeline Box */}
        <div className="mt-14 bg-[#101d31] border border-[#23344d] rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs sm:text-sm text-[#8fa0bb] border-b border-[#2a3d58] pb-4">
            <span className="font-semibold text-[#e9eff8]">{pipelineReleaseName}</span>
            <div className="flex items-center gap-3">
              <span className="text-[#2ee6c4] font-medium">{statusText}</span>
              <button
                type="button"
                onClick={handleSimulatePipeline}
                disabled={isRunning}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#1a2d48] hover:bg-[#253f65] text-xs text-[#e9eff8] font-sans transition-colors disabled:opacity-50"
                title="Run live pipeline simulation"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                <span>Simulate Run</span>
              </button>
            </div>
          </div>

          {/* Steps Horizontal Grid */}
          <ol className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {items.map((item) => (
              <li
                key={item.id}
                className={`p-4 rounded-xl border text-xs sm:text-sm transition-all relative font-mono ${
                  item.status === 'done'
                    ? 'border-[#1a6a66] bg-[#0f2f33] text-[#7be9d4]'
                    : item.status === 'running'
                    ? 'border-[#2ee6c4] bg-[#173d40] text-[#2ee6c4]'
                    : 'border-[#2a3d58] bg-[#14233a] text-[#8fa0bb]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <b className="font-sans font-bold text-sm text-[#e9eff8]">{item.name}</b>
                  {item.status === 'done' && (
                    <Check className="w-4 h-4 text-[#2ee6c4] stroke-[3]" />
                  )}
                  {item.status === 'running' && (
                    <span className="w-3.5 h-3.5 border-2 border-[#2ee6c4] border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
                <span className="text-xs opacity-90 block">{item.desc}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
