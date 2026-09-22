/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SiteData } from './types';
import { initialSiteData } from './defaultData';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { TechStack } from './components/TechStack';
import { ServicesExplorer } from './components/ServicesExplorer';
import { WorkPortfolio } from './components/WorkPortfolio';
import { IndustriesSection } from './components/IndustriesSection';
import { CustomerStory } from './components/CustomerStory';
import { ApproachSection } from './components/ApproachSection';
import { EngineeringSection } from './components/EngineeringSection';
import { InsightsSection } from './components/InsightsSection';
import { ProjectPlanner } from './components/ProjectPlanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { CookieBanner } from './components/CookieBanner';
import { BackendPage } from './pages/BackendPage';
import { ArrowUp } from 'lucide-react';

export default function App() {
  // Load stored configuration from localStorage or initial defaults
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const storedStr = localStorage.getItem('softvares_site_data');
      if (storedStr) {
        const stored = JSON.parse(storedStr);
        // Ensure email update and WhatsApp fields are set
        if (stored?.contact) {
          if (stored.contact.email === 'hello@softvares.com') {
            stored.contact.email = 'softvares.official@gmail.com';
          }
          if (
            !stored.contact.whatsappNumber ||
            stored.contact.whatsappNumber === '+919876543210' ||
            stored.contact.whatsappNumber.includes('98765')
          ) {
            stored.contact.whatsappNumber = '+919100850500';
            stored.contact.whatsappDisplayNumber = '+91 9100850500';
          }
          if (!stored.contact.whatsappWelcomeMessage) {
            stored.contact.whatsappWelcomeMessage = initialSiteData.contact.whatsappWelcomeMessage;
          }
        }
        if (stored?.footer?.supportLinks) {
          stored.footer.supportLinks = stored.footer.supportLinks.map((l: { label: string; href: string }) =>
            l.href === 'mailto:hello@softvares.com' ? { ...l, href: 'mailto:softvares.official@gmail.com' } : l
          );
        }
        return {
          ...initialSiteData,
          ...stored,
          contact: { ...initialSiteData.contact, ...stored.contact },
          footer: { ...initialSiteData.footer, ...stored.footer },
        };
      }
    } catch (e) {
      console.error('Failed to load stored site data', e);
    }
    return initialSiteData;
  });

  // URL-driven routing: 'website' (/) or 'backend' (/backend)
  const getInitialRoute = (): 'website' | 'backend' => {
    if (typeof window === 'undefined') return 'website';
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path === '/backend' || path.startsWith('/backend/') || hash === '#backend') {
      return 'backend';
    }
    return 'website';
  };

  const [currentRoute, setCurrentRoute] = useState<'website' | 'backend'>(getInitialRoute);

  // Sync route changes with browser history & URL hash/path
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/backend' || path.startsWith('/backend/') || hash === '#backend') {
        setCurrentRoute('backend');
      } else {
        setCurrentRoute('website');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Optional keyboard shortcut (Alt+B or Ctrl+Shift+B) to jump between / and /backend
    const handleKeyNav = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'b') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'b')) {
        e.preventDefault();
        navigateTo(currentRoute === 'backend' ? '/' : '/backend');
      }
    };
    window.addEventListener('keydown', handleKeyNav);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('keydown', handleKeyNav);
    };
  }, [currentRoute]);

  const navigateTo = (path: string) => {
    try {
      window.history.pushState(null, '', path);
    } catch (e) {
      console.warn('History pushState fallback', e);
    }
    const isBackend = path === '/backend' || path.startsWith('/backend/') || path === '#backend';
    setCurrentRoute(isBackend ? 'backend' : 'website');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Interactive cross-component state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showCookiePref, setShowCookiePref] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>('web');
  const [contactPrefillMessage, setContactPrefillMessage] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync theme changes directly to CSS root variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--cobalt', siteData.theme.primary);
    root.style.setProperty('--cobalt-d', siteData.theme.primaryHover);
    root.style.setProperty('--ink', siteData.theme.ink);
    root.style.setProperty('--ink-2', siteData.theme.ink);
    root.style.setProperty('--coral', siteData.theme.coral);
    root.style.setProperty('--teal', siteData.theme.teal);
    root.style.setProperty('--amber', siteData.theme.amber);
    root.style.setProperty('--violet', siteData.theme.violet);
    root.style.setProperty('--r', `${siteData.theme.borderRadius}px`);

    // Persist to localStorage
    try {
      localStorage.setItem('softvares_site_data', JSON.stringify(siteData));
    } catch (e) {
      console.error('Failed to persist site data', e);
    }
  }, [siteData]);

  // Handle scroll to top visibility
  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const handleUpdateData = (newData: SiteData) => {
    setSiteData(newData);
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePrefillAndScrollContact = (message: string) => {
    setContactPrefillMessage(message);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Backend Route: /backend
  if (currentRoute === 'backend') {
    return (
      <BackendPage
        data={siteData}
        onUpdateData={handleUpdateData}
        onNavigateHome={() => navigateTo('/')}
      />
    );
  }

  // Live Customer Website View (Strictly clean, zero admin elements on frontend)
  return (
    <div className="min-h-screen bg-white text-[#141821] flex flex-col font-['Hanken_Grotesk'] selection:bg-[var(--cobalt)] selection:text-white">
      {/* Header with Navigation & Mobile Drawer (No admin controls) */}
      <Header
        data={siteData}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectService={handleSelectService}
      />

      {/* Main Content */}
      <main id="main" className="flex-1">
        {/* Hero Carousel */}
        <HeroCarousel
          slides={siteData.hero.slides}
          autoplayEnabled={siteData.hero.autoplay}
          autoplayInterval={siteData.hero.autoplayInterval}
        />

        {/* Tech Stack Bar */}
        <TechStack
          title={siteData.techStack.title}
          items={siteData.techStack.items}
        />

        {/* Services Explorer */}
        <ServicesExplorer
          sectionTitle={siteData.services.sectionTitle}
          sectionDesc={siteData.services.sectionDesc}
          services={siteData.services.items}
          selectedServiceId={selectedServiceId}
          onSelectServiceForContact={(serviceName) =>
            handlePrefillAndScrollContact(
              `I would like to discuss our requirements for: ${serviceName}. `
            )
          }
        />

        {/* Shipped Work & Portfolio */}
        <WorkPortfolio
          sectionTitle={siteData.work.sectionTitle}
          sectionDesc={siteData.work.sectionDesc}
          projects={siteData.work.items}
          onSelectProjectForContact={(projectName, tagline) =>
            handlePrefillAndScrollContact(
              `I would like to build something similar to ${projectName} (${tagline}). `
            )
          }
        />

        {/* Industries Section */}
        <IndustriesSection
          sectionTitle={siteData.industries.sectionTitle}
          sectionDesc={siteData.industries.sectionDesc}
          industries={siteData.industries.items}
          onSelectIndustryForContact={(industryName) =>
            handlePrefillAndScrollContact(
              `I work in the ${industryName.toLowerCase()} sector and would like to build a custom application for: `
            )
          }
        />

        {/* Customer Story / Testimonial */}
        <CustomerStory
          story={siteData.customerStory}
          onOpenMedoraCaseStudy={() => {
            const medora = siteData.work.items.find((p) => p.id === 'medora');
            if (medora) {
              const el = document.getElementById('work');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* Approach & Engagement Models */}
        <ApproachSection
          sectionTitle={siteData.approach.sectionTitle}
          sectionDesc={siteData.approach.sectionDesc}
          steps={siteData.approach.steps}
          models={siteData.approach.models}
          onSelectModelForContact={(modelTitle) =>
            handlePrefillAndScrollContact(
              `I am interested in your ${modelTitle} engagement model for an upcoming project: `
            )
          }
        />

        {/* Engineering Standards (Dark section) & Pipeline */}
        <EngineeringSection
          sectionTitle={siteData.engineering.sectionTitle}
          sectionDesc={siteData.engineering.sectionDesc}
          pillars={siteData.engineering.pillars}
          pipelineReleaseName={siteData.engineering.pipelineReleaseName}
          pipelineStatus={siteData.engineering.pipelineStatus}
          pipelineItems={siteData.engineering.pipelineItems}
        />

        {/* Insights / Articles */}
        <InsightsSection
          sectionTitle={siteData.insights.sectionTitle}
          sectionDesc={siteData.insights.sectionDesc}
          articles={siteData.insights.items}
        />

        {/* Interactive Budget & Timeline Planner */}
        <ProjectPlanner
          planner={siteData.planner}
          onSendEstimateToContact={(summary) => handlePrefillAndScrollContact(summary)}
        />

        {/* Contact Brief & Inquiry Form */}
        <ContactSection
          contact={siteData.contact}
          prefilledMessage={contactPrefillMessage}
          onClearPrefill={() => setContactPrefillMessage('')}
        />
      </main>

      {/* Footer */}
      <Footer
        data={siteData}
        onOpenCookiePref={() => setShowCookiePref(true)}
      />

      {/* Global Interactive Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        data={siteData}
        onSelectService={handleSelectService}
        onSelectProject={() => {
          const el = document.getElementById('work');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Cookie Banner Notice */}
      <CookieBanner
        forceShow={showCookiePref}
        onCloseForce={() => setShowCookiePref(false)}
      />

      {/* Floating Action Button (Only Scroll to Top on Frontend) */}
      {showScrollTop && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white text-[#141821] border border-[#d5dae3] shadow-lg grid place-items-center hover:bg-[#f5f6f8] transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
