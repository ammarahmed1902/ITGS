import React from 'react';
import { Target, Search, Users, Code, Smartphone, Layout, Palette, Headphones, Globe } from 'lucide-react';
import { Service } from './domain/entities/Service';
import { BlogPost } from './domain/entities/BlogPost';

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
    results: "340% average increase in qualified lead volume for enterprise clients within 6 months.",
    tools: ["Google Ads", "Meta Business Suite", "HubSpot", "Semrush"]
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    icon: <Search size={36} />,
    shortDesc: "Dominating search results with advanced technical SEO and authority-building strategies.",
    overview: "SEO at ITGS is about more than just rankings; it's about visibility and authority. We optimize your technical foundation and content architecture to ensure you own the conversation in your industry.",
    process: [
      { step: "Technical Audit", desc: "Identifying and fixing crawlability, indexing, and speed issues." },
      { step: "Keyword Research", desc: "Mapping high-intent search terms to your customer journey." },
      { step: "On-Page SEO", desc: "Optimizing content structure, metadata, and internal linking." },
      { step: "Authority Building", desc: "Strategic backlink acquisition from high-authority domains." }
    ],
    features: ["Technical SEO", "Local & Global SEO", "Content Optimization", "Competitor Analysis"],
    results: "Achieved #1 rankings for 50+ high-competition industry keywords for a Fortune 500 client.",
    tools: ["Ahrefs", "Google Search Console", "Screaming Frog", "SurferSEO"]
  },
  {
    id: "lead-generation",
    title: "Lead Generation",
    icon: <Users size={36} />,
    shortDesc: "High-precision lead acquisition systems that fill your pipeline with ready-to-buy prospects.",
    overview: "We build automated lead generation engines that work 24/7. By combining psychological profiling with advanced targeting, we deliver prospects that are already primed for your sales team.",
    process: [
      { step: "Profiling", desc: "Defining your Ideal Customer Profile (ICP) based on behavioral data." },
      { step: "Funnel Design", desc: "Building high-converting landing pages and lead magnets." },
      { step: "Traffic Acquisition", desc: "Driving targeted traffic through paid and organic channels." },
      { step: "Nurturing", desc: "Automated follow-up sequences to qualify and warm up leads." }
    ],
    features: ["B2B Lead Gen", "LinkedIn Outreach", "Funnel Optimization", "CRM Integration"],
    results: "Generated over $50M in attributed pipeline for B2B SaaS clients in the last year.",
    tools: ["Apollo.io", "Salesforce", "Instantly.ai", "Unbounce"]
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
    results: "Reduced page load times by 65% for a global retailer, leading to a 22% increase in conversions.",
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
    results: "Launched a fintech app that reached 100k active users within the first 3 months.",
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
    results: "Redesigned a complex dashboard resulting in a 40% reduction in user support tickets.",
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
    results: "Created a visual identity for a tech startup that helped them secure $10M in Series A funding.",
    tools: ["Adobe Creative Suite", "Canva Enterprise", "Midjourney", "After Effects"]
  },
  {
    id: "virtual-assistance",
    title: "Virtual Assistance",
    icon: <Headphones size={36} />,
    shortDesc: "Elite administrative and operational support to free up your executive bandwidth.",
    overview: "Our virtual assistants are more than just support; they are operational partners. We provide highly trained professionals who handle the details so you can focus on high-level strategy.",
    process: [
      { step: "Matching", desc: "Pairing you with an assistant that fits your specific needs." },
      { step: "Onboarding", desc: "Integrating the assistant into your workflows and tools." },
      { step: "Execution", desc: "Daily management of tasks, scheduling, and operations." },
      { step: "Reporting", desc: "Weekly updates on progress and task completion." }
    ],
    features: ["Executive Support", "Data Entry", "Customer Support", "Project Management"],
    results: "Saved an average of 15 hours per week for C-level executives in our pilot program.",
    tools: ["Slack", "Asana / Trello", "Google Workspace", "Calendly"]
  },
  {
    id: "e-commerce",
    title: "E-commerce Solutions",
    icon: <Globe size={36} />,
    shortDesc: "Comprehensive e-commerce management including Amazon, eBay, and Shopify optimization.",
    overview: "Our e-commerce solutions are designed to dominate global marketplaces. From product sourcing to wholesale management, we provide the technical and operational expertise to scale your online retail business.",
    process: [
      { step: "Sourcing", desc: "Identifying high-margin products and reliable global suppliers." },
      { step: "Setup", desc: "Configuring Amazon, eBay, and Shopify stores for maximum conversion." },
      { step: "Optimization", desc: "Advanced listing optimization and PPC management." },
      { step: "Scaling", desc: "Implementing dropshipping and wholesale models for rapid growth." }
    ],
    features: ["Amazon & eBay Management", "Shopify Development", "Product Sourcing", "Dropshipping", "Amazon Wholesale"],
    results: "Managed over $10M in annual GMV for e-commerce partners with a 25% average margin improvement.",
    tools: ["Amazon Seller Central", "Shopify Plus", "Helium 10", "AutoDS"]
  }
];

export const INITIAL_POSTS: BlogPost[] = [
  { 
    id: "1",
    title: "The Psychology of Trust in SaaS", 
    date: "Oct 12, 2026", 
    category: "UI/UX Design", 
    status: 'Published',
    content: "Trust is the foundation of any successful SaaS product...",
    image: "https://picsum.photos/seed/blog-1/600/400",
    views: 1240,
    readTime: "5m"
  },
  { 
    id: "2",
    title: "Scaling Infrastructure for 2027", 
    date: "Oct 10, 2026", 
    category: "Web Development", 
    status: 'Published',
    content: "As we approach 2027, the demands on web infrastructure are evolving...",
    image: "https://picsum.photos/seed/blog-2/600/400",
    views: 850,
    readTime: "8m"
  },
  { 
    id: "3",
    title: "AI Ethics in Global Enterprise", 
    date: "Oct 05, 2026", 
    category: "Digital Marketing", 
    status: 'Draft',
    content: "The integration of AI into enterprise workflows brings significant ethical considerations...",
    image: "https://picsum.photos/seed/blog-3/600/400",
    views: 0,
    readTime: "6m"
  },
  { 
    id: "4",
    title: "Maximizing ROI with Technical SEO", 
    date: "Sep 28, 2026", 
    category: "Search Engine Optimization", 
    status: 'Published',
    content: "Technical SEO remains a critical pillar of digital marketing success...",
    image: "https://picsum.photos/seed/blog-4/600/400",
    views: 2100,
    readTime: "10m"
  },
  { 
    id: "5",
    title: "The Future of Mobile User Experience", 
    date: "Sep 22, 2026", 
    category: "Mobile App Development", 
    status: 'Published',
    content: "Mobile UX is shifting towards more immersive and personalized experiences...",
    image: "https://picsum.photos/seed/blog-5/600/400",
    views: 1560,
    readTime: "4m"
  },
  { 
    id: "6",
    title: "B2B Lead Gen: Beyond the Basics", 
    date: "Sep 15, 2026", 
    category: "Lead Generation", 
    status: 'Published',
    content: "Effective B2B lead generation requires a deep understanding of the buyer's journey...",
    image: "https://picsum.photos/seed/blog-6/600/400",
    views: 920,
    readTime: "7m"
  },
  { 
    id: "7",
    title: "E-commerce Trends for Global Markets", 
    date: "Sep 08, 2026", 
    category: "E-commerce Solutions", 
    status: 'Published',
    content: "Global e-commerce is being reshaped by cross-border trade and social commerce...",
    image: "https://picsum.photos/seed/blog-7/600/400",
    views: 1800,
    readTime: "6m"
  },
  { 
    id: "8",
    title: "Visual Identity in the Age of AI", 
    date: "Sep 01, 2026", 
    category: "Graphic Design", 
    status: 'Published',
    content: "AI is both a tool and a challenge for modern graphic designers...",
    image: "https://picsum.photos/seed/blog-8/600/400",
    views: 1100,
    readTime: "5m"
  },
  { 
    id: "9",
    title: "Operational Excellence with Virtual Partners", 
    date: "Aug 25, 2026", 
    category: "Virtual Assistance", 
    status: 'Published',
    content: "Virtual assistants are becoming integral to executive productivity...",
    image: "https://picsum.photos/seed/blog-9/600/400",
    views: 740,
    readTime: "4m"
  },
];
