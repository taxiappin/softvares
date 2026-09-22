export type LogoType = 'svg-icon' | 'custom-image' | 'text-only' | 'custom-svg';

export interface BrandConfig {
  name: string;
  tagline: string;
  logoType: LogoType;
  logoText: string;
  logoImageUrl: string;
  logoCustomSvg: string;
  logoPrimaryColor: string;
}

export interface ThemeConfig {
  primary: string;
  primaryHover: string;
  ink: string;
  inkDark: string;
  muted: string;
  coral: string;
  teal: string;
  amber: string;
  violet: string;
  fontDisplay: string;
  fontBody: string;
  borderRadius: number;
}

export interface NavigationConfig {
  links: {
    id: string;
    label: string;
    href: string;
    hasMegaMenu?: 'services' | 'industries';
  }[];
  portalText: string;
  portalHref: string;
  ctaText: string;
  ctaHref: string;
}

export interface HeroSlide {
  id: string;
  theme: 'cobalt' | 'dark' | 'amber';
  title: string;
  lead: string;
  ctaPrimaryText: string;
  ctaPrimaryHref: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
  mockType: 'web-mobile' | 'ai-chat' | 'cloud-architecture';
  stats: {
    revenue?: string;
    orders?: string;
    conversion?: string;
    balance?: string;
    accuracy?: string;
    migrated?: string;
    costCut?: string;
  };
}

export interface ServiceItem {
  id: string;
  name: string;
  short: string;
  colorKey: string;
  lead: string;
  points: string[];
  tech: string[];
  cta: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  industry: string;
  categories: ('web' | 'mobile' | 'ai' | 'enterprise')[];
  accentColor: string;
  mockType: 'web' | 'phone' | 'dash' | 'ai';
  tagline: string;
  description: string;
  techStack: string[];
  results: [string, string][];
}

export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  iconName: 'heart' | 'landmark' | 'shopping-cart' | 'truck' | 'graduation-cap' | 'factory';
}

export interface CustomerStoryConfig {
  badge: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  metrics: [string, string][];
  modalTitle: string;
  modalDescription: string;
}

export interface ApproachStep {
  number: number;
  title: string;
  desc: string;
  duration: string;
}

export interface EngagementModel {
  id: string;
  title: string;
  desc: string;
  bestFor: string;
  payment: string;
  team: string;
  start: string;
  cta: string;
}

export interface EngineeringPillar {
  id: string;
  title: string;
  desc: string;
  icon: 'shield-check' | 'flask-conical' | 'accessibility' | 'key-round';
}

export interface PipelineItem {
  id: string;
  name: string;
  desc: string;
  status: 'done' | 'running' | 'waiting';
}

export interface InsightArticle {
  id: string;
  category: string;
  readTime: string;
  title: string;
  colorKey: string;
  link: string;
}

export interface PlannerTypeOption {
  key: string;
  label: string;
  base: number;
  weeks: number;
  team: string;
  includes: string;
}

export interface PlannerScaleOption {
  key: string;
  label: string;
  costMultiplier: number;
  weekMultiplier: number;
}

export interface PlannerAddOnOption {
  key: string;
  label: string;
  cost: number;
  weeks: number;
}

export interface PlannerConfig {
  sectionTitle: string;
  sectionDesc: string;
  types: PlannerTypeOption[];
  scales: PlannerScaleOption[];
  addOns: PlannerAddOnOption[];
  finePrint: string;
}

export interface ContactConfig {
  title: string;
  lead: string;
  steps: [string, string][];
  email: string;
  workingHours: string;
  budgetOptions: string[];
  whatsappNumber: string;
  whatsappDisplayNumber: string;
  whatsappWelcomeMessage: string;
}

export interface FooterConfig {
  tagline: string;
  location: string;
  copyrightYear: number;
  servicesTitle: string;
  industriesTitle: string;
  companyTitle: string;
  supportTitle: string;
  companyLinks: { label: string; href: string }[];
  supportLinks: { label: string; href: string }[];
  legalLinks: { label: string; href: string }[];
}

export interface SiteData {
  brand: BrandConfig;
  theme: ThemeConfig;
  navigation: NavigationConfig;
  hero: {
    autoplay: boolean;
    autoplayInterval: number;
    slides: HeroSlide[];
  };
  techStack: {
    title: string;
    items: string[];
  };
  services: {
    sectionTitle: string;
    sectionDesc: string;
    items: ServiceItem[];
  };
  work: {
    sectionTitle: string;
    sectionDesc: string;
    items: ProjectItem[];
  };
  industries: {
    sectionTitle: string;
    sectionDesc: string;
    items: IndustryItem[];
  };
  customerStory: CustomerStoryConfig;
  approach: {
    sectionTitle: string;
    sectionDesc: string;
    steps: ApproachStep[];
    models: EngagementModel[];
  };
  engineering: {
    sectionTitle: string;
    sectionDesc: string;
    pillars: EngineeringPillar[];
    pipelineReleaseName: string;
    pipelineStatus: string;
    pipelineItems: PipelineItem[];
  };
  insights: {
    sectionTitle: string;
    sectionDesc: string;
    items: InsightArticle[];
  };
  planner: PlannerConfig;
  contact: ContactConfig;
  footer: FooterConfig;
}
