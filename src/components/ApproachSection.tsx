import React from 'react';
import { ApproachStep, EngagementModel } from '../types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ApproachSectionProps {
  sectionTitle: string;
  sectionDesc: string;
  steps: ApproachStep[];
  models: EngagementModel[];
  onSelectModelForContact: (modelTitle: string) => void;
}

export const ApproachSection: React.FC<ApproachSectionProps> = ({
  sectionTitle,
  sectionDesc,
  steps,
  models,
  onSelectModelForContact,
}) => {
  return (
    <section id="approach" className="py-16 md:py-24 bg-[#f5f6f8] border-b border-[#d5dae3]">
      <div className="w-[min(1280px,100%-48px)] mx-auto">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
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

        {/* 5-Step Process Track */}
        <div className="relative mb-16 md:mb-24">
          <div className="hidden lg:block absolute left-6 right-6 top-6 h-0.5 bg-[#d5dae3] -z-0" />
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
            {steps.map((step) => (
              <li key={step.number} className="group relative space-y-3">
                <div className="w-12 h-12 rounded-full bg-white border-2 border-[#141821] group-hover:border-[var(--cobalt)] group-hover:bg-[var(--cobalt)] group-hover:text-white transition-all flex items-center justify-center font-bold text-lg font-['Bricolage_Grotesque'] text-[#141821] shadow-xs">
                  {step.number}
                </div>
                <h3
                  className="text-xl font-bold text-[#141821] group-hover:text-[var(--cobalt)] transition-colors"
                  style={{ fontFamily: 'var(--font-d)' }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-[#545c6d] leading-relaxed">
                  {step.desc}
                </p>
                <span className="inline-block text-xs font-bold px-2.5 py-1 rounded bg-white border border-[#d5dae3] text-[#141821]">
                  {step.duration}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Engagement Models */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {models.map((model) => (
            <article
              key={model.id}
              className="bg-white border border-[#d5dae3] rounded-2xl p-7 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all"
            >
              <div className="space-y-4">
                <h3
                  className="text-2xl font-bold text-[#141821]"
                  style={{ fontFamily: 'var(--font-d)' }}
                >
                  {model.title}
                </h3>
                <p className="text-sm sm:text-base text-[#545c6d] leading-relaxed min-h-[3rem]">
                  {model.desc}
                </p>

                <dl className="divide-y divide-[#d5dae3] py-2">
                  <div className="py-2.5">
                    <dt className="text-xs font-bold text-[#545c6d] uppercase tracking-wider">
                      Best for
                    </dt>
                    <dd className="text-sm font-semibold text-[#141821] mt-0.5">
                      {model.bestFor}
                    </dd>
                  </div>
                  <div className="py-2.5">
                    <dt className="text-xs font-bold text-[#545c6d] uppercase tracking-wider">
                      How you pay
                    </dt>
                    <dd className="text-sm font-semibold text-[#141821] mt-0.5">
                      {model.payment}
                    </dd>
                  </div>
                  <div className="py-2.5">
                    <dt className="text-xs font-bold text-[#545c6d] uppercase tracking-wider">
                      Team
                    </dt>
                    <dd className="text-sm font-semibold text-[#141821] mt-0.5">
                      {model.team}
                    </dd>
                  </div>
                  <div className="py-2.5">
                    <dt className="text-xs font-bold text-[#545c6d] uppercase tracking-wider">
                      Typical start
                    </dt>
                    <dd className="text-sm font-semibold text-[#141821] mt-0.5">
                      {model.start}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onSelectModelForContact(model.title)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold text-sm border-2 border-[#141821] text-[#141821] hover:bg-[#141821] hover:text-white transition-colors"
                >
                  <span>{model.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
