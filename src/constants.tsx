import React from 'react';
import { Target, Search, Users, Code, Smartphone, Layout, Palette, Headphones, Globe } from 'lucide-react';
import { Service } from './domain/entities/Service';

export const SERVICES_DATA: Service[] = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: <Target size={36} />,
    shortDesc: "Strategic multi-channel marketing campaigns designed to scale your brand's global presence.",
    overview: "Our digital marketing strategy is built on psychological triggers and data-driven insights. We don't just run ads; we engineer ecosystems that convert high-value prospects into loyal advocates.",
    process: [
      { step: "Audit", desc: "Deep analysis of your current market position and competitor landscape." },
      { step: "Strategy", desc: "Crafting a bespoke multi-channel roadmap aligned with your business goals." },
      { step: "Execution", desc: "Deploying high-impact campaigns across Search, Social, and Display." },
      { step: "Optimization", desc: "Continuous A/B testing and performance tuning to maximize ROI." }
    ],
    features: ["Performance Marketing", "Content Strategy", "Social Media Management", "Email Automation"],
    results: "",
    tools: ["Google Ads", "Meta Business Suite", "HubSpot", "Semrush"]
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    icon: <Search size={36} />,
    shortDesc: "Technical SEO, search intent and content architecture for sustainable organic visibility.",
    overview: "ITGS connects search strategy with the technical, content, information-architecture and measurement work required to implement it responsibly.",
    process: [
      { step: "Diagnose", desc: "Review technical health, architecture, content, demand and measurement." },
      { step: "Prioritize", desc: "Map intent, page opportunities and implementation priorities." },
      { step: "Implement", desc: "Execute or coordinate agreed technical, page and content improvements." },
      { step: "Measure", desc: "Use new visibility and conversion evidence to guide the next iteration." }
    ],
    features: ["Technical SEO", "Search Intent Strategy", "Content Architecture", "SEO Measurement"],
    results: "",
    tools: []
  },
  {
    id: "lead-generation",
    title: "Lead Generation",
    icon: <Users size={36} />,
    shortDesc: "Connected acquisition, conversion and qualification systems built around relevant opportunities.",
    overview: "ITGS connects audience strategy, acquisition, landing experiences, lead qualification, CRM workflows and measurement around the prospects most relevant to the business.",
    process: [
      { step: "Diagnose", desc: "Review audience, offer, channels, conversion, CRM and measurement." },
      { step: "Define", desc: "Agree customer fit, buying roles and qualification criteria." },
      { step: "Implement", desc: "Launch the approved acquisition, conversion and routing system." },
      { step: "Improve", desc: "Use lead quality, sales feedback and pipeline evidence to set priorities." }
    ],
    features: ["Audience Strategy", "Conversion Journeys", "Lead Qualification", "CRM Workflows"],
    results: "",
    tools: []
  },
  {
    id: "web-development",
    title: "Web Development",
    icon: <Code size={36} />,
    shortDesc: "Enterprise-grade web applications built for speed, security, and infinite scalability.",
    overview: "We don't just build websites; we build digital assets. Our development team focuses on clean code, high performance, and robust security to ensure your platform can handle global traffic without friction.",
    process: [
      { step: "Architecture", desc: "Planning the technical stack and database structure for scale." },
      { step: "Development", desc: "Agile coding with a focus on modularity and performance." },
      { step: "Testing", desc: "Rigorous QA, including security audits and load testing." },
      { step: "Deployment", desc: "CI/CD pipelines for seamless, zero-downtime releases." }
    ],
    features: ["Custom Web Apps", "E-commerce Solutions", "Headless CMS", "API Integrations"],
    results: "",
    tools: ["React / Next.js", "Node.js", "AWS / Vercel", "PostgreSQL"]
  },
  {
    id: "mobile-development",
    title: "Mobile App Development",
    icon: <Smartphone size={36} />,
    shortDesc: "Native and cross-platform mobile experiences that keep your brand in your customers' pockets.",
    overview: "Mobile is the primary touchpoint for modern users. We create intuitive, high-performance mobile applications that leverage native capabilities to provide a seamless user experience.",
    process: [
      { step: "Prototyping", desc: "Interactive wireframes to validate user flows and features." },
      { step: "Development", desc: "Building with React Native or Flutter for cross-platform efficiency." },
      { step: "Integration", desc: "Connecting with backend APIs and third-party services." },
      { step: "App Store Launch", desc: "Handling the full submission and optimization process." }
    ],
    features: ["iOS & Android", "Cross-Platform", "Real-time Features", "Offline Functionality"],
    results: "",
    tools: ["React Native", "Flutter", "Firebase", "Swift / Kotlin"]
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    icon: <Layout size={36} />,
    shortDesc: "Psychology-driven interfaces designed to maximize user engagement and trust.",
    overview: "Design at ITGS is a science. We use behavioral psychology and user testing to create interfaces that guide users naturally toward your desired outcomes while building brand authority.",
    process: [
      { step: "Research", desc: "User interviews and competitive benchmarking." },
      { step: "Wireframing", desc: "Mapping out the structural layout and user journey." },
      { step: "Visual Design", desc: "Applying brand identity and high-fidelity UI elements." },
      { step: "Prototyping", desc: "High-fidelity interactive demos for user validation." }
    ],
    features: ["User Research", "Interface Design", "Experience Mapping", "Design Systems"],
    results: "",
    tools: ["Figma", "Adobe XD", "Principle", "Maze"]
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    icon: <Palette size={36} />,
    shortDesc: "Bold visual identities that communicate authority and set your brand apart.",
    overview: "Visual communication is the first step in building trust. We create cohesive brand identities and marketing assets that reflect your company's global credibility and innovative spirit.",
    process: [
      { step: "Discovery", desc: "Understanding your brand values and target audience." },
      { step: "Concepting", desc: "Developing multiple creative directions and moodboards." },
      { step: "Design", desc: "Refining the chosen direction into final assets." },
      { step: "Delivery", desc: "Providing a complete kit of production-ready files." }
    ],
    features: ["Brand Identity", "Marketing Collateral", "Social Media Assets", "Presentation Design"],
    results: "",
    tools: ["Adobe Creative Suite", "Canva Enterprise", "Midjourney", "After Effects"]
  },
  {
    id: "virtual-assistance",
    title: "Virtual Assistance",
    icon: <Headphones size={36} />,
    shortDesc: "Administrative and operational support structured around agreed workflows, access and ownership.",
    overview: "ITGS helps define what should be delegated, how support fits the client's systems and how recurring work is communicated, documented and reviewed.",
    process: [
      { step: "Scope", desc: "Define tasks, tools, hours, access, communication and success criteria." },
      { step: "Match", desc: "Select an appropriate support profile against confirmed requirements." },
      { step: "Onboard", desc: "Set up permissions, workflows, priorities and escalation rules." },
      { step: "Review", desc: "Review delivery, changing priorities and process improvements." }
    ],
    features: ["Administrative Support", "Operations Support", "Project Coordination", "Workflow Documentation"],
    results: "",
    tools: []
  },
  {
    id: "e-commerce",
    title: "E-commerce Solutions",
    icon: <Globe size={36} />,
    shortDesc: "Connected storefront, marketplace and product operations built around a clear commerce model.",
    overview: "ITGS connects commerce technology, customer experience, marketplace operations, product workflows, acquisition and measurement around the business model.",
    process: [
      { step: "Assess", desc: "Review the commerce model, products, channels, operations and technology." },
      { step: "Define", desc: "Set platform, marketplace, integration and operating priorities." },
      { step: "Build", desc: "Configure the approved storefront, catalog, workflows and measurement." },
      { step: "Improve", desc: "Use customer, commerce and operational evidence to prioritize changes." }
    ],
    features: ["Storefront Technology", "Marketplace Operations", "Catalog Workflows", "Commerce Measurement"],
    results: "",
    tools: []
  }
];
