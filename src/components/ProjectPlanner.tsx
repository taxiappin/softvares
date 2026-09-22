import React, { useState } from 'react';
import { PlannerConfig } from '../types';
import { ArrowRight, Check } from 'lucide-react';

interface ProjectPlannerProps {
  planner: PlannerConfig;
  onSendEstimateToContact: (estimateSummary: string) => void;
}

export const ProjectPlanner: React.FC<ProjectPlannerProps> = ({
  planner,
  onSendEstimateToContact,
}) => {
  const [selectedTypeKey, setSelectedTypeKey] = useState(planner.types[1]?.key || 'webapp');
  const [selectedScaleKey, setSelectedScaleKey] = useState(planner.scales[0]?.key || 'starter');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const selectedType = planner.types.find((t) => t.key === selectedTypeKey) || planner.types[0];
  const selectedScale = planner.scales.find((s) => s.key === selectedScaleKey) || planner.scales[0];

  const activeAddOnsList = planner.addOns.filter((a) => selectedAddOns.includes(a.key));

  const toggleAddOn = (key: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Calculation
  const totalBaseCost = selectedType.base * selectedScale.costMultiplier;
  const addOnsCost = activeAddOnsList.reduce((acc, curr) => acc + curr.cost, 0);
  const totalCost = totalBaseCost + addOnsCost;

  const totalBaseWeeks = Math.round(selectedType.weeks * selectedScale.weekMultiplier);
  const addOnsWeeks = activeAddOnsList.reduce((acc, curr) => acc + curr.weeks, 0);
  const totalWeeks = totalBaseWeeks + addOnsWeeks;

  const loCost = Math.round((totalCost * 0.85) / 500) * 500;
  const hiCost = Math.round((totalCost * 1.2) / 500) * 500;

  const formatMoney = (n: number) => '$' + n.toLocaleString('en-US');

  const budgetRangeStr = `${formatMoney(loCost)} to ${formatMoney(hiCost)}`;
  const timelineStr = `${totalWeeks} to ${totalWeeks + Math.ceil(totalWeeks * 0.25)} weeks`;

  const handleDiscussEstimate = () => {
    const addOnsNames = activeAddOnsList.map((a) => a.label.toLowerCase()).join(', ');
    const summary = `I used your project planner: ${selectedType.label}, ${selectedScale.label} scope${
      addOnsNames ? ', with ' + addOnsNames : ''
    }. Indicative budget ${budgetRangeStr}, estimated timeline ${timelineStr}. Team size: ${
      selectedType.team
    }. \n\nAdditional details about our project: `;

    onSendEstimateToContact(summary);
  };

  return (
    <section id="estimate" className="py-16 md:py-24 bg-[#f5f6f8] border-b border-[#d5dae3]">
      <div className="w-[min(1280px,100%-48px)] mx-auto">
        {/* Section Header */}
        <div className="mb-10 md:mb-14 max-w-3xl">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#141821]"
            style={{ fontFamily: 'var(--font-d)' }}
          >
            {planner.sectionTitle}
          </h2>
          <p className="text-[#545c6d] text-base sm:text-lg mt-3 leading-relaxed">
            {planner.sectionDesc}
          </p>
        </div>

        {/* Planner Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
          {/* Options Form */}
          <div className="space-y-8">
            {/* Fieldset 1: Type */}
            <fieldset className="space-y-3">
              <legend
                className="text-xl font-bold text-[#141821] tracking-tight"
                style={{ fontFamily: 'var(--font-d)' }}
              >
                What are you building?
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {planner.types.map((type) => {
                  const isChecked = selectedTypeKey === type.key;
                  return (
                    <label
                      key={type.key}
                      onClick={() => setSelectedTypeKey(type.key)}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-[var(--cobalt)] bg-blue-50/50 shadow-xs'
                          : 'border-[#d5dae3] bg-white hover:border-[#141821]'
                      }`}
                    >
                      <span className="font-semibold text-sm text-[#141821]">{type.label}</span>
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isChecked
                            ? 'border-[var(--cobalt)] bg-[var(--cobalt)] text-white'
                            : 'border-[#d5dae3]'
                        }`}
                      >
                        {isChecked && <span className="w-2 h-2 rounded-full bg-white" />}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Fieldset 2: Scale */}
            <fieldset className="space-y-3">
              <legend
                className="text-xl font-bold text-[#141821] tracking-tight"
                style={{ fontFamily: 'var(--font-d)' }}
              >
                How big is it?
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {planner.scales.map((scale) => {
                  const isChecked = selectedScaleKey === scale.key;
                  return (
                    <label
                      key={scale.key}
                      onClick={() => setSelectedScaleKey(scale.key)}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-[var(--cobalt)] bg-blue-50/50 shadow-xs'
                          : 'border-[#d5dae3] bg-white hover:border-[#141821]'
                      }`}
                    >
                      <span className="font-semibold text-sm text-[#141821]">{scale.label}</span>
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isChecked
                            ? 'border-[var(--cobalt)] bg-[var(--cobalt)] text-white'
                            : 'border-[#d5dae3]'
                        }`}
                      >
                        {isChecked && <span className="w-2 h-2 rounded-full bg-white" />}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Fieldset 3: Add-on features */}
            <fieldset className="space-y-3">
              <legend
                className="text-xl font-bold text-[#141821] tracking-tight"
                style={{ fontFamily: 'var(--font-d)' }}
              >
                Add features
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {planner.addOns.map((addon) => {
                  const isChecked = selectedAddOns.includes(addon.key);
                  return (
                    <label
                      key={addon.key}
                      onClick={() => toggleAddOn(addon.key)}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-[var(--cobalt)] bg-blue-50/50 shadow-xs'
                          : 'border-[#d5dae3] bg-white hover:border-[#141821]'
                      }`}
                    >
                      <span className="font-semibold text-sm text-[#141821]">{addon.label}</span>
                      <span
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                          isChecked
                            ? 'border-[var(--cobalt)] bg-[var(--cobalt)] text-white'
                            : 'border-[#d5dae3]'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>

          {/* Right Sticky Output Summary Box */}
          <aside className="sticky top-24 bg-[#141821] text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#aab4c8]">
                Indicative budget
              </h3>
              <div
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2"
                style={{ fontFamily: 'var(--font-d)' }}
              >
                {budgetRangeStr}
              </div>
              <p className="text-xs text-[#aab4c8] mt-1">One-time build cost, before tax</p>
            </div>

            <dl className="divide-y divide-[#2b3446] py-1 text-sm">
              <div className="flex justify-between py-3">
                <dt className="text-[#aab4c8]">Timeline</dt>
                <dd className="font-bold text-white text-right">{timelineStr}</dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="text-[#aab4c8]">Team size</dt>
                <dd className="font-bold text-white text-right">{selectedType.team}</dd>
              </div>
              <div className="flex justify-between py-3">
                <dt className="text-[#aab4c8]">Includes</dt>
                <dd className="font-bold text-white text-right">{selectedType.includes}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={handleDiscussEstimate}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg font-bold text-sm bg-white text-[#141821] hover:bg-[#e9edff] transition-colors shadow-sm"
            >
              <span>Discuss this estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-xs text-[#8e99ae] leading-relaxed">
              {planner.finePrint}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};
