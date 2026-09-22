import React, { useState, useRef } from 'react';
import { ProjectItem } from '../types';
import { ChevronLeft, ChevronRight, X, ArrowRight, ExternalLink } from 'lucide-react';

interface WorkPortfolioProps {
  sectionTitle: string;
  sectionDesc: string;
  projects: ProjectItem[];
  onSelectProjectForContact: (projectName: string, tagline: string) => void;
}

export const WorkPortfolio: React.FC<WorkPortfolioProps> = ({
  sectionTitle,
  sectionDesc,
  projects,
  onSelectProjectForContact,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'mobile' | 'ai' | 'enterprise'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.categories.includes(activeFilter);
  });

  const scrollRail = (direction: 'left' | 'right') => {
    if (!railRef.current) return;
    const scrollAmount = 380;
    railRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const renderMock = (mockType: ProjectItem['mockType'], accentColor: string) => {
    if (mockType === 'web') {
      return (
        <div className="w-[72%] bg-white rounded-lg shadow-xl overflow-hidden translate-y-4 border border-black/10">
          <div className="flex gap-1.5 p-2 bg-[#f1f3f7]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccd2dd]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccd2dd]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccd2dd]" />
          </div>
          <div className="m-3 h-14 rounded-md" style={{ backgroundColor: accentColor }} />
          <div className="grid grid-cols-3 gap-1.5 mx-3 mb-3">
            <span className="h-9 rounded bg-[#eceef2]" />
            <span className="h-9 rounded bg-[#eceef2]" />
            <span className="h-9 rounded bg-[#eceef2]" />
          </div>
        </div>
      );
    }

    if (mockType === 'phone') {
      return (
        <div className="w-24 bg-[#0b1220] rounded-[18px] p-1.5 shadow-xl translate-y-5 border border-white/20">
          <div className="bg-white rounded-[14px] p-3 h-44 flex flex-col justify-between">
            <div className="h-14 rounded-lg" style={{ backgroundColor: accentColor }} />
            <div className="space-y-1.5">
              <div className="h-2 rounded bg-[#e6e9ef] w-full" />
              <div className="h-2 rounded bg-[#e6e9ef] w-3/4" />
              <div className="h-2 rounded bg-[#e6e9ef] w-1/2" />
            </div>
            <div className="h-4 rounded bg-[#f0f2f7]" />
          </div>
        </div>
      );
    }

    if (mockType === 'ai') {
      return (
        <div className="w-[78%] space-y-2.5 translate-y-2 text-[0.75rem]">
          <div className="bg-white text-[#545c6d] p-2.5 rounded-xl shadow-md max-w-[85%] ml-auto font-medium">
            How do I update my API keys?
          </div>
          <div
            className="text-white p-2.5 rounded-xl shadow-md max-w-[85%] font-medium"
            style={{ backgroundColor: accentColor }}
          >
            Go to Settings &gt; Keys, and click Generate New Secret.
          </div>
        </div>
      );
    }

    // Default 'dash'
    return (
      <div className="w-[78%] grid grid-cols-2 gap-2 translate-y-2">
        <div className="col-span-2 bg-white rounded-lg p-2.5 shadow-md flex items-end gap-1.5 h-20">
          {[35, 55, 45, 80, 60, 95, 75].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t"
              style={{
                height: `${h}%`,
                backgroundColor: accentColor,
                opacity: i === 5 ? 1 : 0.75,
              }}
            />
          ))}
        </div>
        <div className="bg-white rounded-lg p-2 shadow-md space-y-1.5">
          <span className="block h-1.5 w-3/5 rounded bg-[#e6e9ef]" />
          <span className="block h-3 w-2/5 rounded" style={{ backgroundColor: accentColor }} />
        </div>
        <div className="bg-white rounded-lg p-2 shadow-md space-y-1.5">
          <span className="block h-1.5 w-3/5 rounded bg-[#e6e9ef]" />
          <span className="block h-3 w-2/5 rounded" style={{ backgroundColor: accentColor }} />
        </div>
      </div>
    );
  };

  return (
    <section id="work" className="py-16 md:py-24 bg-[#f5f6f8] border-b border-[#d5dae3]">
      <div className="w-[min(1280px,100%-48px)] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div className="max-w-2xl">
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

          {/* Rail Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollRail('left')}
              className="w-11 h-11 rounded-full border border-[#d5dae3] bg-white grid place-items-center hover:bg-[#141821] hover:text-white transition-colors shadow-xs"
              aria-label="Previous projects"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollRail('right')}
              className="w-11 h-11 rounded-full border border-[#d5dae3] bg-white grid place-items-center hover:bg-[#141821] hover:text-white transition-colors shadow-xs"
              aria-label="Next projects"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pivot Categories Filter */}
        <div className="flex gap-2 flex-wrap pb-4 mb-6 border-b border-[#d5dae3]" role="group" aria-label="Filter projects">
          {(['all', 'web', 'mobile', 'ai', 'enterprise'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 font-bold text-sm rounded-lg transition-colors capitalize ${
                activeFilter === cat
                  ? 'bg-[var(--cobalt)] text-white shadow-xs'
                  : 'text-[#545c6d] hover:text-[#141821] hover:bg-white'
              }`}
            >
              {cat === 'ai' ? 'AI' : cat}
            </button>
          ))}
        </div>

        {/* Horizontal Scroll Rail */}
        <div
          ref={railRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
          style={{ scrollPaddingLeft: '1rem' }}
        >
          {filteredProjects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProject(p)}
              className="flex-none w-[320px] sm:w-[360px] md:w-[380px] snap-start text-left flex flex-col bg-white border border-[#d5dae3] rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group"
            >
              {/* Device Visual Mockup Container */}
              <div
                className="h-[220px] w-full relative overflow-hidden flex items-center justify-center"
                style={{
                  backgroundColor: `color-mix(in srgb, ${p.accentColor} 14%, #ffffff)`,
                }}
              >
                {renderMock(p.mockType, p.accentColor)}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <small className="block text-xs font-bold uppercase tracking-wider text-[#545c6d]">
                    {p.industry} • {p.categories.map((c) => (c === 'ai' ? 'AI' : c)).join(', ')}
                  </small>
                  <h3
                    className="text-xl font-bold text-[#141821] group-hover:text-[var(--cobalt)] transition-colors"
                    style={{ fontFamily: 'var(--font-d)' }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-sm text-[#545c6d] leading-relaxed line-clamp-2">
                    {p.tagline}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 font-bold text-sm text-[var(--cobalt)] group-hover:underline">
                    Read the story
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Project Modal Dialog */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] border border-[#d5dae3] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 z-20 w-9 h-9 rounded-full bg-white/90 border border-gray-200 grid place-items-center hover:bg-gray-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5 text-[#141821]" />
            </button>

            {/* Left Visual Preview */}
            <div
              className="min-h-[260px] md:min-h-[360px] flex items-center justify-center p-8 relative overflow-hidden"
              style={{
                backgroundColor: `color-mix(in srgb, ${selectedProject.accentColor} 15%, #ffffff)`,
              }}
            >
              <div className="scale-125">
                {renderMock(selectedProject.mockType, selectedProject.accentColor)}
              </div>
            </div>

            {/* Right Story & Specs */}
            <div className="p-6 sm:p-8 md:p-10 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <small className="font-bold text-xs uppercase tracking-wider text-[#545c6d]">
                    {selectedProject.industry} • {selectedProject.categories.join(' and ')}
                  </small>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-[#141821] mt-1"
                    style={{ fontFamily: 'var(--font-d)' }}
                  >
                    {selectedProject.name}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#545c6d] leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Results Metrics */}
                <div className="grid grid-cols-3 gap-3 py-4 border-y border-[#d5dae3]">
                  {selectedProject.results.map(([value, label], idx) => (
                    <div key={idx} className="space-y-0.5">
                      <b
                        className="block text-xl sm:text-2xl font-bold tracking-tight text-[#141821]"
                        style={{ fontFamily: 'var(--font-d)' }}
                      >
                        {value}
                      </b>
                      <span className="block text-xs text-[#545c6d] leading-tight">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Chips */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#545c6d] uppercase tracking-wider block">
                    Built with
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-semibold px-2.5 py-1 rounded bg-[#eceef2] text-[#1d2330]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    const proj = selectedProject;
                    setSelectedProject(null);
                    onSelectProjectForContact(proj.name, proj.tagline);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold text-base text-white bg-[var(--cobalt)] hover:bg-[var(--cobalt-d)] transition-colors shadow-sm"
                >
                  <span>Build something like this</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
