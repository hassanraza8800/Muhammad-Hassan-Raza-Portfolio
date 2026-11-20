export type ProjectCategory = 'all' | 'client' | 'product' | 'demo';

export interface ProjectLink {
  label: string;
  url: string;
  primary?: boolean;
}

export interface ProjectItem {
  id: 'cowgenic' | 'salt-ranges' | 'growst' | 'flame-grilled' | 'demo-restaurant';
  index: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  status: string;
  timeframe: string;
  role: string;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  stack: string[];
  links: ProjectLink[];
  featured?: boolean;
}

export interface CraftChapter {
  index: string;
  title: string;
  focus: string;
  description: string;
  capabilities: string[];
}

export interface ExperienceEntry {
  id: string;
  period: string;
  organization: string;
  role: string;
  location: string;
  highlight: string;
  details: string[];
  link?: {
    label: string;
    url: string;
  };
}

export const PROFILE = {
  fullName: 'Muhammad Hassan Raza',
  shortName: 'Hassan Raza',
  monogram: 'M. Hassan Raza',
  headline: 'AI Engineer · Python Developer · React.js',
  location: 'Lahore, Punjab, Pakistan',
  availability: 'Open to On-site, Hybrid & Remote Roles',
  email: 'muhammadhassanraza8800@gmail.com',
  phone: '+92-310-4615721',
  phoneHref: 'tel:+923104615721',
  whatsapp: 'https://wa.me/923104615721',
  linkedin: 'https://www.linkedin.com/in/muhammad-hassan-raza-a831a5321/',
  company: 'UBM Technologies Limited',
  university: 'Lahore Garrison University',
  gradClass: "LGU '24",
  competition: "PUC'on Competitor",
  portraitSrc: '/assets/hassan-portrait.png',
};

export const HERO_METRICS = [
  {
    value: '05',
    label: 'Shipped Builds',
    detail: 'Client sites, Play Store app & interactive demos',
  },
  {
    value: 'Web + App',
    label: 'Cross-Platform',
    detail: 'React.js web platforms & Android mobile delivery',
  },
  {
    value: 'UBM Tech',
    label: 'Active Engineering',
    detail: 'Building Cowgenic DFMS stock, milk & farm management system',
  },
  {
    value: "LGU '24",
    label: 'CS & Competitive',
    detail: "Lahore Garrison University · PUC'on competitor",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'cowgenic',
    index: '01',
    title: 'Cowgenic DFMS',
    subtitle: 'Dairy Farm Management System',
    category: 'client',
    categoryLabel: 'Enterprise Product',
    status: 'Currently Building',
    timeframe: 'Ongoing · UBM Technologies',
    role: 'Software & Full-Stack Engineer',
    summary:
      'Active engineering on Cowgenic DFMS, a complete dairy farm management system for tracking animal feed stock, semen inventory, vaccination schedules, daily milk production, customer management, and supplier management.',
    challenge:
      'Dairy farms juggle critical operational workflows across separate registers — feed inventory, semen batches, animal vaccination logs, milk collection, buyer billing, and supplier procurement — leading to stockouts and accounting errors.',
    solution:
      'Engineering unified management modules that bring animal stock (feeding, semen, vaccinations), milk production tracking, customer accounts, and supplier records into one structured system.',
    deliverables: [
      'Stock management for animal feed, semen batches, and vaccinations',
      'Daily milk production recording and yield reporting workflows',
      'Customer management for buyer orders, deliveries, and balances',
      'Supplier management for feed, semen, and veterinary procurement',
    ],
    stack: ['React.js', 'Python', 'TypeScript', 'REST APIs', 'Management System'],
    links: [
      {
        label: 'Visit dfmscowgenic.com',
        url: 'https://www.dfmscowgenic.com/',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    id: 'salt-ranges',
    index: '02',
    title: 'Salt Ranges',
    subtitle: 'Production Client Website & Custom Domain Launch',
    category: 'client',
    categoryLabel: 'Client Production',
    status: 'Live on Custom Domain',
    timeframe: 'Shipped Client Delivery',
    role: 'Lead Frontend & Web Developer',
    summary:
      'End-to-end design implementation and production deployment for Salt Ranges — taken from staging preview on Vercel to its live custom domain at salt-ranges.com with disciplined typography and crisp performance.',
    challenge:
      'The client needed an authoritative, fast-loading digital presence capable of presenting their services clearly across desktop and mobile while remaining clean to maintain and search-engine ready.',
    solution:
      'Built a structured React web architecture with semantic HTML, responsive layout pacing, rapid Vercel edge delivery, and smooth transition from staging sign-off to production domain launch.',
    deliverables: [
      'Complete responsive client website from staging to live launch',
      'Semantic document structure tuned for search discoverability',
      'Fast asset pipeline deployed via Vercel to salt-ranges.com',
      'Cross-browser QA and mobile layout verification',
    ],
    stack: ['React.js', 'Tailwind CSS', 'Vercel', 'Responsive Architecture', 'SEO'],
    links: [
      {
        label: 'Visit salt-ranges.com',
        url: 'https://salt-ranges.com',
        primary: true,
      },
      {
        label: 'Vercel Preview',
        url: 'https://salt-ranges.vercel.app/',
      },
    ],
    featured: true,
  },
  {
    id: 'growst',
    index: '03',
    title: 'Growst Web & Play Store App',
    subtitle: 'Cross-Platform Reading & Growth Ecosystem',
    category: 'product',
    categoryLabel: 'Web & Mobile Product',
    status: 'Published on Google Play',
    timeframe: 'Production Product',
    role: 'Web & Mobile Application Contributor',
    summary:
      'Contributed across both the growst.co web presence and the Growst mobile application published on the Google Play Store — turning structured book insights into practical daily actions.',
    challenge:
      'Delivering a cohesive brand and product experience across both an acquisition-focused website and a consumer mobile app meant keeping navigation intuitive, responsive, and reliable on varied Android devices.',
    solution:
      'Worked on web frontend experiences for growst.co alongside mobile app screens and user flows for the Google Play Store release, ensuring smooth reading transitions and consistent visual craft.',
    deliverables: [
      'Web platform development and responsive polish for growst.co',
      'Mobile app interface & feature implementation for Google Play release',
      'Consistent cross-platform design language between web and Android',
      'Production release testing across mobile viewports',
    ],
    stack: ['Web Platform', 'Mobile App', 'Google Play Store', 'React', 'UI Engineering'],
    links: [
      {
        label: 'Visit growst.co',
        url: 'https://growst.co',
        primary: true,
      },
      {
        label: 'Search on Play Store',
        url: 'https://play.google.com/store/search?q=growst&c=apps',
      },
    ],
    featured: true,
  },
  {
    id: 'flame-grilled',
    index: '04',
    title: 'Flame-Grilled Street Kitchen',
    subtitle: 'High-Contrast Culinary Brand & Menu Concept',
    category: 'demo',
    categoryLabel: 'Interactive Demo',
    status: 'Live Demo on Vercel',
    timeframe: 'Frontend Exploration',
    role: 'Design Engineer & React Developer',
    summary:
      'An atmospheric street-kitchen web storefront crafted to demonstrate bold hospitality art direction, high-contrast menu browsing, and tactile scroll interactions that drive appetite and quick ordering.',
    challenge:
      'Hospitality websites often fall into generic restaurant templates with cluttered menus and sluggish mobile scrolling.',
    solution:
      'Engineered an energetic, editorial food-brand experience with crisp menu categorization, responsive dish cards, strong typographic hierarchy, and zero-friction interaction cues.',
    deliverables: [
      'High-impact landing architecture tailored for live-fire hospitality',
      'Interactive menu exploration with clean responsive grids',
      'Lightweight React bundle deployed on Vercel',
    ],
    stack: ['React.js', 'Tailwind CSS', 'Motion Design', 'Vercel'],
    links: [
      {
        label: 'Open Live Demo',
        url: 'https://flame-grilled-street-kitchen.vercel.app',
        primary: true,
      },
    ],
  },
  {
    id: 'demo-restaurant',
    index: '05',
    title: 'Restaurant Ordering App Demo',
    subtitle: 'Interactive Digital Menu & Order Flow Prototype',
    category: 'demo',
    categoryLabel: 'Interactive Demo',
    status: 'Live Demo on Vercel',
    timeframe: 'Frontend Engineering Demo',
    role: 'React.js Developer',
    summary:
      'A focused digital restaurant application built to showcase state-driven menu filtering, dynamic item selection, and streamlined customer ordering UX across mobile and desktop viewports.',
    challenge:
      'Demonstrating how clean client-side state architecture can make food selection, category switching, and cart updates feel instantaneous.',
    solution:
      'Built modular React components with predictable state flows, crisp visual hierarchy for menu pricing, and touch-friendly controls ready for commercial restaurant customization.',
    deliverables: [
      'Modular category and dish catalog architecture',
      'Instantaneous interactive selection and cart state flows',
      'Mobile-ready responsive layout deployed on Vercel',
    ],
    stack: ['React.js', 'JavaScript', 'State Architecture', 'Vercel'],
    links: [
      {
        label: 'Open Live Demo',
        url: 'https://demo-resturent-app-001.vercel.app',
        primary: true,
      },
    ],
  },
];

export const CRAFT_CHAPTERS: CraftChapter[] = [
  {
    index: '01',
    title: 'React.js & Interactive Frontend Architecture',
    focus: 'Interfaces with real momentum',
    description:
      'Building fast, structured React and TypeScript interfaces with scroll-choreographed motion, disciplined typography, and clean component architecture that holds up in production.',
    capabilities: ['React.js', 'TypeScript', 'Tailwind CSS', 'Motion Choreography', 'Responsive Systems'],
  },
  {
    index: '02',
    title: 'Python Development & AI Engineering',
    focus: 'Practical intelligence & automation',
    description:
      'Combining Python backend development with applied AI engineering — turning models, data workflows, and automation pipelines into reliable software features rather than isolated scripts.',
    capabilities: ['Python', 'AI Engineering', 'Backend APIs', 'Data Workflows', 'Automation'],
  },
  {
    index: '03',
    title: 'Web, Node.js SEO & Mobile Product Delivery',
    focus: 'From staging preview to live launch',
    description:
      'Shipping end-to-end digital products across custom domains, Node/Vercel deployments, search-optimized HTML architecture, and Google Play mobile app releases like Growst.',
    capabilities: ['Node.js & Express', 'Technical SEO', 'Google Play Releases', 'Vercel & Custom Domains'],
  },
  {
    index: '04',
    title: 'Competitive Engineering Rigor',
    focus: 'Structured thinking under real constraints',
    description:
      'Grounded in a Computer Science foundation from Lahore Garrison University (Class of 2024) and sharpened through competitive programming at PUC’on — prioritizing clarity, speed, and reliability.',
    capabilities: ['Algorithms & Logic', 'System Debugging', 'Performance Profiling', 'Clean Codebases'],
  },
];

export const EXPERIENCE_LEDGER: ExperienceEntry[] = [
  {
    id: 'ubm',
    period: 'Current',
    organization: 'UBM Technologies Limited',
    role: 'Software & Product Engineering — Cowgenic DFMS',
    location: 'Lahore, Pakistan',
    highlight: 'Currently engineering Cowgenic DFMS (dfmscowgenic.com) covering animal feed/semen/vaccine stock, milk production, customer & supplier management.',
    details: [
      'Active engineering on Cowgenic DFMS to manage stock related to animal feeding, semen inventory, and vaccination cycles.',
      'Building modules for milk production tracking alongside end-to-end customer management and supplier management.',
      'Applying Python, React.js, and structured data practices to ship dependable farm management workflows.',
    ],
    link: {
      label: 'dfmscowgenic.com',
      url: 'https://www.dfmscowgenic.com/',
    },
  },
  {
    id: 'growst-exp',
    period: 'Product',
    organization: 'Growst',
    role: 'Web Platform & Android Mobile Contributor',
    location: 'Web · Google Play Store',
    highlight: 'Worked across both growst.co website and the published Growst mobile app on Play Store.',
    details: [
      'Built and refined web interface experiences for growst.co.',
      'Contributed to the Growst mobile application published and live on the Google Play Store.',
      'Maintained visual and behavioral consistency across desktop web and Android mobile journeys.',
    ],
    link: {
      label: 'growst.co',
      url: 'https://growst.co',
    },
  },
  {
    id: 'client-work',
    period: 'Shipped',
    organization: 'Client & Independent Web Delivery',
    role: 'Full-Stack & Frontend Engineer',
    location: 'Remote · Lahore',
    highlight: 'Delivered Salt Ranges (salt-ranges.com) plus bespoke restaurant & street-kitchen concepts.',
    details: [
      'Designed, built, and launched the Salt Ranges client website from salt-ranges.vercel.app staging to salt-ranges.com.',
      'Created interactive hospitality and food-ordering web demos (Flame-Grilled Street Kitchen & Demo Restaurant App) showcasing responsive React architecture.',
      'Focused on crisp visual hierarchy, fast load performance, and search-friendly semantic markup.',
    ],
    link: {
      label: 'salt-ranges.com',
      url: 'https://salt-ranges.com',
    },
  },
  {
    id: 'lgu',
    period: "Class of '24",
    organization: 'Lahore Garrison University',
    role: "LGU '24 · PUC'on Competitor",
    location: 'Lahore, Punjab, Pakistan',
    highlight: "Computer Science graduate (LGU '24) and competitive participant at PUC'on.",
    details: [
      'Completed undergraduate engineering studies at Lahore Garrison University (Class of 2024).',
      "Competed at PUC'on, honing algorithmic problem-solving, speed, and team execution under competition deadlines.",
      'Built a strong foundation across Python development, React.js engineering, and applied AI.',
    ],
  },
];

export const MARQUEE_ITEMS_ROW_ONE = [
  'Cowgenic DFMS',
  'Salt Ranges',
  'Growst Web & Play Store',
  'Flame-Grilled Street Kitchen',
  'Python & AI Engineering',
  'React.js Architecture',
];

export const MARQUEE_ITEMS_ROW_TWO = [
  'UBM Technologies',
  "Lahore Garrison University '24",
  "PUC'on Competitor",
  'Node.js & Technical SEO',
  'Cross-Platform Delivery',
  'Lahore · Remote Worldwide',
];
