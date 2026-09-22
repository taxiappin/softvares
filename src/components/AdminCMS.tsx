import React, { useState } from 'react';
import { SiteData, LogoType, HeroSlide, ServiceItem, ProjectItem, IndustryItem } from '../types';
import { initialSiteData } from '../defaultData';
import {
  Palette,
  Image as ImageIcon,
  Sliders,
  Layers,
  Briefcase,
  Building2,
  GitBranch,
  Calculator,
  Mail,
  FileJson,
  RotateCcw,
  Check,
  Eye,
  Save,
  Plus,
  Trash2,
  Copy,
  Download,
  Upload,
  Sparkles,
  ArrowLeft,
  Globe,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface AdminCMSProps {
  data: SiteData;
  onUpdateData: (newData: SiteData) => void;
  onClose: () => void;
}

export const AdminCMS: React.FC<AdminCMSProps> = ({ data, onUpdateData, onClose }) => {
  const [activeTab, setActiveTab] = useState<
    | 'branding'
    | 'theme'
    | 'hero'
    | 'services'
    | 'portfolio'
    | 'industries'
    | 'approach'
    | 'engineering'
    | 'planner'
    | 'contact'
    | 'json'
  >('branding');

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [jsonInput, setJsonInput] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Helper updates
  const updateBrand = (patch: Partial<SiteData['brand']>) => {
    onUpdateData({ ...data, brand: { ...data.brand, ...patch } });
    showToast('Brand settings updated');
  };

  const updateTheme = (patch: Partial<SiteData['theme']>) => {
    onUpdateData({ ...data, theme: { ...data.theme, ...patch } });
    showToast('Theme colors & styles updated');
  };

  const applyColorPreset = (preset: {
    primary: string;
    primaryHover: string;
    ink: string;
    coral: string;
    teal: string;
    amber: string;
    violet: string;
  }) => {
    onUpdateData({
      ...data,
      brand: { ...data.brand, logoPrimaryColor: preset.primary },
      theme: { ...data.theme, ...preset },
    });
    showToast('Color palette preset applied!');
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Reset all website content and styles to default Softvares configuration?')) {
      onUpdateData(initialSiteData);
      showToast('All settings reset to defaults');
    }
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonStr);
    showToast('Configuration copied to clipboard!');
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `softvares-site-config-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Configuration downloaded as JSON');
  };

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (parsed.brand && parsed.theme && parsed.hero) {
        onUpdateData(parsed);
        showToast('Configuration imported successfully!');
        setJsonInput('');
      } else {
        alert('Invalid configuration format. Missing essential site keys.');
      }
    } catch (e) {
      alert('Error parsing JSON string. Please verify valid syntax.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f3f7] text-[#141821] flex flex-col font-sans">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-50 bg-[#141821] text-white border-b border-[#23344d] shadow-md px-4 sm:px-8 py-3 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[var(--cobalt)] grid place-items-center font-bold text-sm text-white shadow-xs">
            /api
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-bold text-base sm:text-lg leading-tight text-white">
                {data.brand.name} Backend Controls
              </h1>
              <span className="font-mono text-[0.72rem] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-md font-semibold tracking-wide">
                /backend
              </span>
              <span className="text-[0.68rem] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Config Active
              </span>
            </div>
            <p className="text-xs text-[#a9b6cb] mt-0.5">
              Edit & update site logo, UI colors, typography, services, work, and every website element
            </p>
          </div>
        </div>

        {/* Top actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {toastMsg && (
            <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1.5 rounded-md flex items-center gap-1.5 animate-fadeIn">
              <Check className="w-3.5 h-3.5" />
              <span>{toastMsg}</span>
            </span>
          )}

          <button
            type="button"
            onClick={handleResetToDefaults}
            className="px-3 py-1.5 rounded-md text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors flex items-center gap-1.5 border border-gray-700"
            title="Reset to initial default template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-md text-xs sm:text-sm font-bold bg-white text-[#141821] hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-xs"
            title="Return to the live customer-facing website (/)"
          >
            <ArrowLeft className="w-4 h-4 text-[var(--cobalt)]" />
            <span>View Live Website (/)</span>
          </button>
        </div>
      </header>

      {/* Main CMS Workspace */}
      <div className="flex-1 w-[min(1400px,100%-32px)] mx-auto py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 items-start">
        {/* Navigation Sidebar Tabs */}
        <aside className="bg-white rounded-2xl border border-[#d5dae3] p-2 shadow-xs sticky top-20 overflow-x-auto lg:overflow-visible flex lg:flex-col gap-1">
          {[
            { id: 'branding', label: 'Site Logo & Identity', icon: ImageIcon },
            { id: 'theme', label: 'UI Colors & Styling', icon: Palette },
            { id: 'hero', label: 'Hero Slides & Stats', icon: Sliders },
            { id: 'services', label: 'Services Explorer', icon: Layers },
            { id: 'portfolio', label: 'Work & Projects', icon: Briefcase },
            { id: 'industries', label: 'Industries & Story', icon: Building2 },
            { id: 'approach', label: 'Approach & Process', icon: GitBranch },
            { id: 'engineering', label: 'Engineering Standards', icon: Sparkles },
            { id: 'planner', label: 'Pricing & Planner', icon: Calculator },
            { id: 'contact', label: 'Contact & Footer', icon: Mail },
            { id: 'json', label: 'Import / Export JSON', icon: FileJson },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-none lg:w-full text-left px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-[var(--cobalt)] text-white shadow-xs'
                    : 'text-[#545c6d] hover:bg-[#f5f6f8] hover:text-[#141821]'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Active Tab Configuration Panel */}
        <main className="bg-white rounded-2xl border border-[#d5dae3] p-6 sm:p-8 shadow-xs min-h-[600px]">
          {/* TAB 1: SITE LOGO & IDENTITY */}
          {activeTab === 'branding' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-[#d5dae3] pb-4">
                <h2 className="text-2xl font-bold text-[#141821]" style={{ fontFamily: 'var(--font-d)' }}>
                  Site Logo & Brand Identity
                </h2>
                <p className="text-sm text-[#545c6d] mt-1">
                  Configure how your logo, brand name, and taglines appear across headers, drawers, and footers.
                </p>
              </div>

              {/* Live Preview Box */}
              <div className="bg-[#f8f9fb] p-6 rounded-xl border border-[#d5dae3] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#545c6d]">
                  Live Logo Preview
                </span>
                <div className="p-4 bg-white rounded-lg border border-gray-200 flex items-center gap-8 justify-between flex-wrap">
                  <div className="space-y-1">
                    <small className="text-[0.7rem] text-[#7c8497] block">Light background</small>
                    <BrandLogo brand={data.brand} />
                  </div>
                  <div className="space-y-1 bg-[#0c1626] p-3 rounded-lg text-white">
                    <small className="text-[0.7rem] text-[#8fa0bb] block">Dark background</small>
                    <BrandLogo brand={data.brand} isDark />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Brand Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#141821]">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={data.brand.name}
                    onChange={(e) => updateBrand({ name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#aeb6c5] focus:outline-none focus:border-[var(--cobalt)] text-sm"
                  />
                </div>

                {/* Tagline */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#141821]">
                    Brand Tagline
                  </label>
                  <input
                    type="text"
                    value={data.brand.tagline}
                    onChange={(e) => updateBrand({ tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#aeb6c5] focus:outline-none focus:border-[var(--cobalt)] text-sm"
                  />
                </div>
              </div>

              {/* Logo Type Selector */}
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#141821]">
                  Logo Style / Render Mode
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { type: 'svg-icon', label: 'Default Geometric SVG' },
                    { type: 'text-only', label: 'Text Only' },
                    { type: 'custom-image', label: 'Image URL' },
                    { type: 'custom-svg', label: 'Custom Raw SVG' },
                  ].map((mode) => (
                    <button
                      key={mode.type}
                      type="button"
                      onClick={() => updateBrand({ logoType: mode.type as LogoType })}
                      className={`p-3.5 rounded-xl border-2 text-left font-semibold text-xs sm:text-sm transition-all ${
                        data.brand.logoType === mode.type
                          ? 'border-[var(--cobalt)] bg-blue-50/60 text-[#141821] shadow-xs'
                          : 'border-[#d5dae3] bg-white text-[#545c6d] hover:border-gray-400'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type-specific inputs */}
              {data.brand.logoType === 'svg-icon' && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#141821]">
                    SVG Emblem Background Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={data.brand.logoPrimaryColor || '#1b4dff'}
                      onChange={(e) => updateBrand({ logoPrimaryColor: e.target.value })}
                      className="w-12 h-10 rounded border border-gray-300 p-0.5 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={data.brand.logoPrimaryColor || '#1b4dff'}
                      onChange={(e) => updateBrand({ logoPrimaryColor: e.target.value })}
                      className="w-36 px-3 py-2 border border-[#aeb6c5] rounded-md font-mono text-xs uppercase"
                    />
                  </div>
                </div>
              )}

              {data.brand.logoType === 'text-only' && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#141821]">
                    Logo Custom Display Text
                  </label>
                  <input
                    type="text"
                    value={data.brand.logoText}
                    onChange={(e) => updateBrand({ logoText: e.target.value })}
                    placeholder="Softvares"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#aeb6c5] text-sm"
                  />
                </div>
              )}

              {data.brand.logoType === 'custom-image' && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#141821]">
                    Image URL (PNG, SVG, or WebP)
                  </label>
                  <input
                    type="url"
                    value={data.brand.logoImageUrl}
                    onChange={(e) => updateBrand({ logoImageUrl: e.target.value })}
                    placeholder="https://example.com/logo.png"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#aeb6c5] text-sm"
                  />
                </div>
              )}

              {data.brand.logoType === 'custom-svg' && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#141821]">
                    Custom Raw SVG Code
                  </label>
                  <textarea
                    rows={4}
                    value={data.brand.logoCustomSvg}
                    onChange={(e) => updateBrand({ logoCustomSvg: e.target.value })}
                    placeholder="<svg viewBox='0 0 24 24'>...</svg>"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#aeb6c5] text-xs font-mono"
                  />
                </div>
              )}
            </div>
          )}

          {/* TAB 2: UI COLORS & STYLING */}
          {activeTab === 'theme' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-[#d5dae3] pb-4">
                <h2 className="text-2xl font-bold text-[#141821]" style={{ fontFamily: 'var(--font-d)' }}>
                  UI Colors & Theme System
                </h2>
                <p className="text-sm text-[#545c6d] mt-1">
                  Complete control over site primary accents, service indicators, and dark section atmospheres.
                </p>
              </div>

              {/* Color Presets */}
              <div className="space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#141821]">
                  Quick Color Palette Presets
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      name: 'Softvares Cobalt',
                      colors: {
                        primary: '#1b4dff',
                        primaryHover: '#1238d1',
                        ink: '#141821',
                        coral: '#f0492f',
                        teal: '#0a9b8b',
                        amber: '#f2a900',
                        violet: '#7a45e5',
                      },
                    },
                    {
                      name: 'Cyber Emerald',
                      colors: {
                        primary: '#0a9b8b',
                        primaryHover: '#077a6d',
                        ink: '#0e1f1c',
                        coral: '#f0492f',
                        teal: '#10b981',
                        amber: '#f59e0b',
                        violet: '#6366f1',
                      },
                    },
                    {
                      name: 'Midnight Violet',
                      colors: {
                        primary: '#7a45e5',
                        primaryHover: '#5e30b8',
                        ink: '#171426',
                        coral: '#ec4899',
                        teal: '#06b6d4',
                        amber: '#eab308',
                        violet: '#8b5cf6',
                      },
                    },
                    {
                      name: 'Sunset Ember',
                      colors: {
                        primary: '#f0492f',
                        primaryHover: '#cf321a',
                        ink: '#221515',
                        coral: '#f43f5e',
                        teal: '#0284c7',
                        amber: '#f59e0b',
                        violet: '#8b5cf6',
                      },
                    },
                  ].map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => applyColorPreset(preset.colors)}
                      className="p-3.5 rounded-xl border border-[#d5dae3] bg-white hover:shadow-md transition-all text-left space-y-2 group"
                    >
                      <b className="block text-xs font-bold text-[#141821] group-hover:text-[var(--cobalt)]">
                        {preset.name}
                      </b>
                      <div className="flex gap-1">
                        <span className="w-5 h-5 rounded-full" style={{ backgroundColor: preset.colors.primary }} />
                        <span className="w-5 h-5 rounded-full" style={{ backgroundColor: preset.colors.coral }} />
                        <span className="w-5 h-5 rounded-full" style={{ backgroundColor: preset.colors.teal }} />
                        <span className="w-5 h-5 rounded-full" style={{ backgroundColor: preset.colors.amber }} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Pickers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
                {[
                  { key: 'primary', label: 'Primary Brand Color', value: data.theme.primary },
                  { key: 'primaryHover', label: 'Primary Button Hover', value: data.theme.primaryHover },
                  { key: 'coral', label: 'Service Accent: Coral (Mobile)', value: data.theme.coral },
                  { key: 'teal', label: 'Service Accent: Teal (AI)', value: data.theme.teal },
                  { key: 'amber', label: 'Service Accent: Amber (Cloud)', value: data.theme.amber },
                  { key: 'violet', label: 'Service Accent: Violet (Design)', value: data.theme.violet },
                  { key: 'ink', label: 'Ink Typography Dark', value: data.theme.ink },
                  { key: 'inkDark', label: 'Dark Section Background', value: data.theme.inkDark },
                ].map((item) => (
                  <div key={item.key} className="space-y-2 p-3.5 bg-[#f8f9fb] rounded-xl border border-gray-200">
                    <label className="block text-xs font-bold text-[#141821]">
                      {item.label}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={item.value}
                        onChange={(e) => updateTheme({ [item.key]: e.target.value })}
                        className="w-10 h-9 rounded border border-gray-300 p-0.5 cursor-pointer flex-shrink-0"
                      />
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => updateTheme({ [item.key]: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-[#aeb6c5] rounded bg-white font-mono text-xs uppercase"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Border Radius */}
              <div className="space-y-3 pt-4 border-t border-[#d5dae3]">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#141821]">
                    Global Corner Border Radius: {data.theme.borderRadius}px
                  </label>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="2"
                  value={data.theme.borderRadius}
                  onChange={(e) => updateTheme({ borderRadius: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* TAB 3: HERO SLIDES & STATS */}
          {activeTab === 'hero' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-[#d5dae3] pb-4">
                <h2 className="text-2xl font-bold text-[#141821]" style={{ fontFamily: 'var(--font-d)' }}>
                  Hero Carousel Slides & Metrics
                </h2>
                <p className="text-sm text-[#545c6d] mt-1">
                  Customize headlines, subtexts, buttons, and live mock statistics across all 3 interactive carousel slides.
                </p>
              </div>

              {data.hero.slides.map((slide, idx) => (
                <div key={slide.id} className="p-6 rounded-xl border border-[#d5dae3] bg-[#fcfdfe] space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <h3 className="font-bold text-lg text-[#141821] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[var(--cobalt)] text-white text-xs grid place-items-center">
                        {idx + 1}
                      </span>
                      <span>Slide {idx + 1} ({slide.mockType})</span>
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#545c6d] mb-1">
                        Title / Main Headline
                      </label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => {
                          const updated = [...data.hero.slides];
                          updated[idx] = { ...slide, title: e.target.value };
                          onUpdateData({ ...data, hero: { ...data.hero, slides: updated } });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#aeb6c5] text-sm font-bold text-[#141821]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#545c6d] mb-1">
                        Lead Subtitle Text
                      </label>
                      <textarea
                        rows={2}
                        value={slide.lead}
                        onChange={(e) => {
                          const updated = [...data.hero.slides];
                          updated[idx] = { ...slide, lead: e.target.value };
                          onUpdateData({ ...data, hero: { ...data.hero, slides: updated } });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#aeb6c5] text-sm text-[#141821]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-[#545c6d] mb-1">
                          Primary Button Label
                        </label>
                        <input
                          type="text"
                          value={slide.ctaPrimaryText}
                          onChange={(e) => {
                            const updated = [...data.hero.slides];
                            updated[idx] = { ...slide, ctaPrimaryText: e.target.value };
                            onUpdateData({ ...data, hero: { ...data.hero, slides: updated } });
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-[#aeb6c5] text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-[#545c6d] mb-1">
                          Secondary Button Label
                        </label>
                        <input
                          type="text"
                          value={slide.ctaSecondaryText}
                          onChange={(e) => {
                            const updated = [...data.hero.slides];
                            updated[idx] = { ...slide, ctaSecondaryText: e.target.value };
                            onUpdateData({ ...data, hero: { ...data.hero, slides: updated } });
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-[#aeb6c5] text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: SERVICES EXPLORER */}
          {activeTab === 'services' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-[#d5dae3] pb-4">
                <h2 className="text-2xl font-bold text-[#141821]" style={{ fontFamily: 'var(--font-d)' }}>
                  Services Explorer
                </h2>
                <p className="text-sm text-[#545c6d] mt-1">
                  Manage the services tabs, key capabilities, bullet points, and tech tags.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#545c6d] mb-1">
                    Section Headline
                  </label>
                  <input
                    type="text"
                    value={data.services.sectionTitle}
                    onChange={(e) =>
                      onUpdateData({
                        ...data,
                        services: { ...data.services, sectionTitle: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#aeb6c5] text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#545c6d] mb-1">
                    Section Description
                  </label>
                  <textarea
                    rows={2}
                    value={data.services.sectionDesc}
                    onChange={(e) =>
                      onUpdateData({
                        ...data,
                        services: { ...data.services, sectionDesc: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#aeb6c5] text-sm"
                  />
                </div>
              </div>

              <div className="space-y-6 pt-4">
                {data.services.items.map((svc, sIdx) => (
                  <div key={svc.id} className="p-5 rounded-xl border border-gray-200 bg-[#fbfcfd] space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <b className="text-base font-bold text-[#141821]">{svc.name}</b>
                      <span className="text-xs uppercase px-2 py-0.5 rounded bg-gray-200 font-mono">
                        {svc.id}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#545c6d] mb-1">Service Title</label>
                        <input
                          type="text"
                          value={svc.name}
                          onChange={(e) => {
                            const items = [...data.services.items];
                            items[sIdx] = { ...svc, name: e.target.value };
                            onUpdateData({ ...data, services: { ...data.services, items } });
                          }}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#545c6d] mb-1">Short Tagline</label>
                        <input
                          type="text"
                          value={svc.short}
                          onChange={(e) => {
                            const items = [...data.services.items];
                            items[sIdx] = { ...svc, short: e.target.value };
                            onUpdateData({ ...data, services: { ...data.services, items } });
                          }}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#545c6d] mb-1">Lead Description</label>
                      <textarea
                        rows={2}
                        value={svc.lead}
                        onChange={(e) => {
                          const items = [...data.services.items];
                          items[sIdx] = { ...svc, lead: e.target.value };
                          onUpdateData({ ...data, services: { ...data.services, items } });
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#545c6d] mb-1">
                        Bullet Points (one per line)
                      </label>
                      <textarea
                        rows={3}
                        value={svc.points.join('\n')}
                        onChange={(e) => {
                          const items = [...data.services.items];
                          items[sIdx] = { ...svc, points: e.target.value.split('\n').filter(Boolean) };
                          onUpdateData({ ...data, services: { ...data.services, items } });
                        }}
                        className="w-full px-3 py-2 border rounded text-sm font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#545c6d] mb-1">
                        Technologies (comma separated)
                      </label>
                      <input
                        type="text"
                        value={svc.tech.join(', ')}
                        onChange={(e) => {
                          const items = [...data.services.items];
                          items[sIdx] = {
                            ...svc,
                            tech: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                          };
                          onUpdateData({ ...data, services: { ...data.services, items } });
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PORTFOLIO & WORK */}
          {activeTab === 'portfolio' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-[#d5dae3] pb-4 flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#141821]" style={{ fontFamily: 'var(--font-d)' }}>
                    Portfolio & Client Case Studies
                  </h2>
                  <p className="text-sm text-[#545c6d] mt-1">
                    Add, edit, or remove shipped products shown in the portfolio carousel.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newProj: ProjectItem = {
                      id: `proj-${Date.now()}`,
                      name: 'New Custom App',
                      industry: 'Enterprise',
                      categories: ['web', 'ai'],
                      accentColor: '#1b4dff',
                      mockType: 'web',
                      tagline: 'Modern cloud web application engineered for high-throughput scaling.',
                      description: 'Comprehensive software platform engineered with microservices, high-concurrency event queues, and automated real-time dashboards.',
                      techStack: ['React', 'Node.js', 'PostgreSQL'],
                      results: [
                        ['3x', 'performance boost'],
                        ['99.9%', 'uptime'],
                        ['4 weeks', 'delivery time'],
                      ],
                    };
                    onUpdateData({
                      ...data,
                      work: { ...data.work, items: [newProj, ...data.work.items] },
                    });
                    showToast('New project created!');
                  }}
                  className="px-4 py-2 rounded-lg font-bold text-xs bg-[var(--cobalt)] text-white hover:bg-[var(--cobalt-d)] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-6">
                {data.work.items.map((proj, pIdx) => (
                  <div key={proj.id} className="p-5 rounded-xl border border-gray-200 bg-[#fbfcfd] space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: proj.accentColor }} />
                        <b className="text-lg font-bold text-[#141821]">{proj.name}</b>
                        <span className="text-xs text-[#545c6d] font-semibold">({proj.industry})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete ${proj.name}?`)) {
                            const items = data.work.items.filter((_, i) => i !== pIdx);
                            onUpdateData({ ...data, work: { ...data.work, items } });
                            showToast('Project removed');
                          }
                        }}
                        className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#545c6d] mb-1">Project Name</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => {
                            const items = [...data.work.items];
                            items[pIdx] = { ...proj, name: e.target.value };
                            onUpdateData({ ...data, work: { ...data.work, items } });
                          }}
                          className="w-full px-3 py-1.5 border rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#545c6d] mb-1">Industry</label>
                        <input
                          type="text"
                          value={proj.industry}
                          onChange={(e) => {
                            const items = [...data.work.items];
                            items[pIdx] = { ...proj, industry: e.target.value };
                            onUpdateData({ ...data, work: { ...data.work, items } });
                          }}
                          className="w-full px-3 py-1.5 border rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#545c6d] mb-1">Accent Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={proj.accentColor}
                            onChange={(e) => {
                              const items = [...data.work.items];
                              items[pIdx] = { ...proj, accentColor: e.target.value };
                              onUpdateData({ ...data, work: { ...data.work, items } });
                            }}
                            className="w-9 h-8 rounded border p-0.5 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={proj.accentColor}
                            onChange={(e) => {
                              const items = [...data.work.items];
                              items[pIdx] = { ...proj, accentColor: e.target.value };
                              onUpdateData({ ...data, work: { ...data.work, items } });
                            }}
                            className="w-full px-2 py-1 border rounded text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#545c6d] mb-1">Short Tagline</label>
                      <input
                        type="text"
                        value={proj.tagline}
                        onChange={(e) => {
                          const items = [...data.work.items];
                          items[pIdx] = { ...proj, tagline: e.target.value };
                          onUpdateData({ ...data, work: { ...data.work, items } });
                        }}
                        className="w-full px-3 py-1.5 border rounded text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#545c6d] mb-1">Full Story Description</label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => {
                          const items = [...data.work.items];
                          items[pIdx] = { ...proj, description: e.target.value };
                          onUpdateData({ ...data, work: { ...data.work, items } });
                        }}
                        className="w-full px-3 py-1.5 border rounded text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: INDUSTRIES & CUSTOMER STORY */}
          {activeTab === 'industries' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-[#d5dae3] pb-4">
                <h2 className="text-2xl font-bold text-[#141821]" style={{ fontFamily: 'var(--font-d)' }}>
                  Industries & Case Story
                </h2>
                <p className="text-sm text-[#545c6d] mt-1">
                  Manage industry domain cards and the featured customer testimonial.
                </p>
              </div>

              {/* Customer Story Quote */}
              <div className="p-6 rounded-xl border border-teal-200 bg-[#eef8f6] space-y-4">
                <h3 className="font-bold text-lg text-[#0a5f56]">Featured Customer Testimonial</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#0a5f56] mb-1">
                      Quote
                    </label>
                    <textarea
                      rows={2}
                      value={data.customerStory.quote}
                      onChange={(e) =>
                        onUpdateData({
                          ...data,
                          customerStory: { ...data.customerStory, quote: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-teal-300 rounded text-sm font-semibold"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#0a5f56] mb-1">Author</label>
                      <input
                        type="text"
                        value={data.customerStory.author}
                        onChange={(e) =>
                          onUpdateData({
                            ...data,
                            customerStory: { ...data.customerStory, author: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 bg-white border border-teal-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#0a5f56] mb-1">Role</label>
                      <input
                        type="text"
                        value={data.customerStory.role}
                        onChange={(e) =>
                          onUpdateData({
                            ...data,
                            customerStory: { ...data.customerStory, role: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 bg-white border border-teal-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#0a5f56] mb-1">Company</label>
                      <input
                        type="text"
                        value={data.customerStory.company}
                        onChange={(e) =>
                          onUpdateData({
                            ...data,
                            customerStory: { ...data.customerStory, company: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 bg-white border border-teal-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: APPROACH & PROCESS */}
          {activeTab === 'approach' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-[#d5dae3] pb-4">
                <h2 className="text-2xl font-bold text-[#141821]" style={{ fontFamily: 'var(--font-d)' }}>
                  Approach, Process & Models
                </h2>
                <p className="text-sm text-[#545c6d] mt-1">
                  Customize the 5 delivery stages and the 3 client engagement contracts.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-base text-[#141821]">The 5 Stages</h3>
                {data.approach.steps.map((st, idx) => (
                  <div key={st.number} className="p-4 bg-gray-50 border rounded-xl grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
                    <span className="font-bold text-sm">Step {st.number}</span>
                    <input
                      type="text"
                      value={st.title}
                      onChange={(e) => {
                        const steps = [...data.approach.steps];
                        steps[idx] = { ...st, title: e.target.value };
                        onUpdateData({ ...data, approach: { ...data.approach, steps } });
                      }}
                      className="px-2.5 py-1 bg-white border rounded text-sm"
                    />
                    <input
                      type="text"
                      value={st.desc}
                      onChange={(e) => {
                        const steps = [...data.approach.steps];
                        steps[idx] = { ...st, desc: e.target.value };
                        onUpdateData({ ...data, approach: { ...data.approach, steps } });
                      }}
                      className="px-2.5 py-1 bg-white border rounded text-sm col-span-1 sm:col-span-1"
                    />
                    <input
                      type="text"
                      value={st.duration}
                      onChange={(e) => {
                        const steps = [...data.approach.steps];
                        steps[idx] = { ...st, duration: e.target.value };
                        onUpdateData({ ...data, approach: { ...data.approach, steps } });
                      }}
                      className="px-2.5 py-1 bg-white border rounded text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: ENGINEERING STANDARDS */}
          {activeTab === 'engineering' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-[#d5dae3] pb-4">
                <h2 className="text-2xl font-bold text-[#141821]" style={{ fontFamily: 'var(--font-d)' }}>
                  Engineering Standards & Continuous Delivery
                </h2>
                <p className="text-sm text-[#545c6d] mt-1">
                  Manage the 4 engineering pillars and the CI/CD pipeline showcase.
                </p>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase text-[#545c6d]">
                  CI/CD Pipeline Release Tag
                </label>
                <input
                  type="text"
                  value={data.engineering.pipelineReleaseName}
                  onChange={(e) =>
                    onUpdateData({
                      ...data,
                      engineering: { ...data.engineering, pipelineReleaseName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border rounded font-mono text-sm"
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-base text-[#141821]">Core Pillars</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.engineering.pillars.map((pil, idx) => (
                    <div key={pil.id} className="p-4 bg-gray-50 border rounded-xl space-y-2">
                      <input
                        type="text"
                        value={pil.title}
                        onChange={(e) => {
                          const pillars = [...data.engineering.pillars];
                          pillars[idx] = { ...pil, title: e.target.value };
                          onUpdateData({ ...data, engineering: { ...data.engineering, pillars } });
                        }}
                        className="w-full px-2.5 py-1 bg-white border rounded text-sm font-bold"
                      />
                      <textarea
                        rows={2}
                        value={pil.desc}
                        onChange={(e) => {
                          const pillars = [...data.engineering.pillars];
                          pillars[idx] = { ...pil, desc: e.target.value };
                          onUpdateData({ ...data, engineering: { ...data.engineering, pillars } });
                        }}
                        className="w-full px-2.5 py-1 bg-white border rounded text-xs text-[#545c6d]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: PRICING & PLANNER */}
          {activeTab === 'planner' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-[#d5dae3] pb-4">
                <h2 className="text-2xl font-bold text-[#141821]" style={{ fontFamily: 'var(--font-d)' }}>
                  Pricing & Project Planner Estimator
                </h2>
                <p className="text-sm text-[#545c6d] mt-1">
                  Adjust base rates, turnaround weeks, team sizes, and feature add-ons in the interactive calculator.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-base text-[#141821]">Base Project Rates</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.planner.types.map((type, idx) => (
                    <div key={type.key} className="p-4 border rounded-xl bg-gray-50 space-y-2">
                      <div className="flex justify-between items-center">
                        <b className="text-sm font-bold">{type.label}</b>
                        <span className="font-mono text-xs text-[#545c6d]">{type.team}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[0.7rem] text-[#545c6d] block">Base Cost ($)</label>
                          <input
                            type="number"
                            value={type.base}
                            onChange={(e) => {
                              const types = [...data.planner.types];
                              types[idx] = { ...type, base: Number(e.target.value) };
                              onUpdateData({ ...data, planner: { ...data.planner, types } });
                            }}
                            className="w-full px-2 py-1 bg-white border rounded text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[0.7rem] text-[#545c6d] block">Base Weeks</label>
                          <input
                            type="number"
                            value={type.weeks}
                            onChange={(e) => {
                              const types = [...data.planner.types];
                              types[idx] = { ...type, weeks: Number(e.target.value) };
                              onUpdateData({ ...data, planner: { ...data.planner, types } });
                            }}
                            className="w-full px-2 py-1 bg-white border rounded text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#d5dae3]">
                <h3 className="font-bold text-base text-[#141821]">Add-on Features Pricing</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {data.planner.addOns.map((add, idx) => (
                    <div key={add.key} className="p-3 border rounded-lg bg-gray-50 space-y-1">
                      <span className="text-xs font-bold block">{add.label}</span>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={add.cost}
                          onChange={(e) => {
                            const addOns = [...data.planner.addOns];
                            addOns[idx] = { ...add, cost: Number(e.target.value) };
                            onUpdateData({ ...data, planner: { ...data.planner, addOns } });
                          }}
                          className="w-full px-2 py-1 bg-white border rounded text-xs font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: CONTACT & FOOTER */}
          {activeTab === 'contact' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-[#d5dae3] pb-4">
                <h2 className="text-2xl font-bold text-[#141821]" style={{ fontFamily: 'var(--font-d)' }}>
                  WhatsApp & Contact Information
                </h2>
                <p className="text-sm text-[#545c6d] mt-1">
                  Configure WhatsApp direct number, QR scan link, inquiry email, and working hours.
                </p>
              </div>

              {/* WhatsApp Configuration Card */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <h3 className="font-bold text-base text-[#141821]">WhatsApp Direct Chat Settings</h3>
                  </div>
                  <span className="text-xs bg-emerald-200/80 text-emerald-900 font-bold px-2 py-0.5 rounded">
                    Active on Website
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#141821] mb-1">
                      WhatsApp Phone Number (with country code, e.g. +91 9100850500)
                    </label>
                    <input
                      type="text"
                      value={data.contact.whatsappNumber || ''}
                      placeholder="+91 9100850500"
                      onChange={(e) =>
                        onUpdateData({
                          ...data,
                          contact: {
                            ...data.contact,
                            whatsappNumber: e.target.value,
                            whatsappDisplayNumber: data.contact.whatsappDisplayNumber || e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white font-mono"
                    />
                    <span className="text-[0.7rem] text-[#545c6d] mt-1 block">
                      Users clicking or scanning will be redirected to https://wa.me/{data.contact.whatsappNumber?.replace(/[^0-9]/g, '') || '919100850500'}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#141821] mb-1">
                      Display Number Label (e.g. +91 9100850500)
                    </label>
                    <input
                      type="text"
                      value={data.contact.whatsappDisplayNumber || ''}
                      placeholder="+91 9100850500"
                      onChange={(e) =>
                        onUpdateData({
                          ...data,
                          contact: { ...data.contact, whatsappDisplayNumber: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#141821] mb-1">
                    Default Welcome Message (pre-filled when chat opens)
                  </label>
                  <textarea
                    rows={2}
                    value={data.contact.whatsappWelcomeMessage || ''}
                    placeholder="Hi Softvares team, I would like to discuss an engineering project with you."
                    onChange={(e) =>
                      onUpdateData({
                        ...data,
                        contact: { ...data.contact, whatsappWelcomeMessage: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <a
                    href={`https://wa.me/${(data.contact.whatsappNumber || '+919100850500').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      data.contact.whatsappWelcomeMessage || 'Hi Softvares team'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                  >
                    <span>Test WhatsApp Link</span>
                  </a>
                  <span className="text-xs text-[#545c6d]">
                    Test the direct redirect to WhatsApp chat in a new tab.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#545c6d] mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={data.contact.email}
                    onChange={(e) =>
                      onUpdateData({
                        ...data,
                        contact: { ...data.contact, email: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#545c6d] mb-1">Working Hours</label>
                  <input
                    type="text"
                    value={data.contact.workingHours}
                    onChange={(e) =>
                      onUpdateData({
                        ...data,
                        contact: { ...data.contact, workingHours: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#d5dae3]">
                <h3 className="font-bold text-base text-[#141821]">Footer Settings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#545c6d] mb-1">Footer Tagline</label>
                    <input
                      type="text"
                      value={data.footer.tagline}
                      onChange={(e) =>
                        onUpdateData({
                          ...data,
                          footer: { ...data.footer, tagline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#545c6d] mb-1">Copyright Year</label>
                    <input
                      type="number"
                      value={data.footer.copyrightYear}
                      onChange={(e) =>
                        onUpdateData({
                          ...data,
                          footer: { ...data.footer, copyrightYear: Number(e.target.value) },
                        })
                      }
                      className="w-full px-3 py-2 border rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: IMPORT / EXPORT JSON */}
          {activeTab === 'json' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-[#d5dae3] pb-4">
                <h2 className="text-2xl font-bold text-[#141821]" style={{ fontFamily: 'var(--font-d)' }}>
                  Configuration Backup & JSON Sync
                </h2>
                <p className="text-sm text-[#545c6d] mt-1">
                  Export your entire site design, text, pricing, and colors into a single portable JSON file, or restore an existing one.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="px-4 py-2 rounded-lg font-bold text-xs bg-[var(--cobalt)] text-white hover:bg-[var(--cobalt-d)] transition-colors flex items-center gap-2 shadow-xs"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Configuration JSON</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadJSON}
                  className="px-4 py-2 rounded-lg font-bold text-xs border border-[#141821] text-[#141821] hover:bg-[#141821] hover:text-white transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .json File</span>
                </button>
              </div>

              {/* Import Area */}
              <div className="space-y-3 pt-4 border-t border-[#d5dae3]">
                <label className="block text-xs font-bold uppercase text-[#141821]">
                  Paste JSON to Import
                </label>
                <textarea
                  rows={8}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Paste site JSON configuration here..."
                  className="w-full p-4 border border-[#aeb6c5] rounded-xl font-mono text-xs focus:outline-none focus:border-[var(--cobalt)]"
                />
                <button
                  type="button"
                  onClick={handleImportJSON}
                  disabled={!jsonInput.trim()}
                  className="px-5 py-2.5 rounded-lg font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  <span>Apply Imported Configuration</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
