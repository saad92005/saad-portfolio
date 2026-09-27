// Update NEXT_PUBLIC_SITE_URL (or this fallback) to the site's real production domain.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saadshahid.dev";

export const profile = {
  name: "Saad Shahid",
  firstName: "Muhammad Saad",
  lastName: "Shahid",
  role: "AI Automation & Software Engineer",
  location: "Lahore, Punjab, Pakistan",
  locationShort: "Lahore, PK",
  email: "saad39587@gmail.com",
  phone: "+92-321-4429267",
  whatsapp: "923214429267",
  whatsappDisplay: "+92 321 4429267",
  github: "https://github.com/saad92005",
  linkedin: "https://www.linkedin.com/in/saadshahidpk",
  linkedinDisplay: "linkedin.com/in/saadshahidpk",
  headline: "Building intelligent software.",
  subheadline:
    "AI Engineer & Software Engineer building practical AI systems, automation workflows, and production applications.",
  metaLine: ["Lahore, Pakistan", "Open to opportunities", "Python / AI / Automation"],
};

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export const heroCorners = {
  topLeft: "AI ENGINEER",
  topRight: "DEVELOPER",
  bottomLeft: "AUTOMATION",
  bottomRight: "CS STUDENT",
};

export type MarqueeTool = { name: string; icon: "si" | "lucide"; id: string };

export const marqueeTools: MarqueeTool[] = [
  { name: "Python", icon: "si", id: "SiPython" },
  { name: "PyTorch", icon: "si", id: "SiPytorch" },
  { name: "Next.js", icon: "si", id: "SiNextdotjs" },
  { name: "React", icon: "si", id: "SiReact" },
  { name: "TypeScript", icon: "si", id: "SiTypescript" },
  { name: "Android", icon: "si", id: "SiAndroid" },
  { name: "n8n", icon: "si", id: "SiN8N" },
  { name: "Hugging Face", icon: "si", id: "SiHuggingface" },
  { name: "Groq", icon: "lucide", id: "Zap" },
  { name: "Tailwind CSS", icon: "si", id: "SiTailwindcss" },
  { name: "GitHub", icon: "si", id: "SiGithub" },
  { name: "Figma", icon: "si", id: "SiFigma" },
  { name: "Vercel", icon: "si", id: "SiVercel" },
  { name: "Microsoft Excel", icon: "lucide", id: "FileSpreadsheet" },
];

export const about = {
  eyebrow: "About me",
  heading: "I build systems that solve real problems.",
  body: "I'm Muhammad Saad — computer science student at UMT, Lahore, and an AI Automation & Software Engineer. I turn rough requirements into working software: AI systems, automation workflows, and full-stack products that ship and get used.",
  photoChip: "CS Student @ UMT",
  checklist: [
    "Designing practical AI systems — LLMs, RAG, NLP, and AI agents",
    "Shipping production apps used daily by real teams (Android, web, PWA)",
    "Bridging business operations with custom automation and tooling",
  ],
  tags: ["AI", "Machine Learning", "NLP", "LLMs", "RAG", "Automation", "Software Engineering"],
};

export const capabilities = [
  {
    title: "AI Engineering",
    items: ["LLMs", "RAG", "AI Assistants", "AI Agents", "Generative AI", "NLP"],
  },
  {
    title: "Software Engineering",
    items: ["Python", "APIs", "Databases", "Application Architecture", "Testing", "Debugging", "Deployment"],
  },
  {
    title: "AI Automation",
    items: ["Workflow Automation", "AI-Powered Workflows", "API Integrations", "Business Process Automation"],
  },
  {
    title: "Web & Mobile",
    items: ["Responsive Websites", "Android Applications", "Application Interfaces"],
  },
  {
    title: "Data & Operations",
    items: ["Dashboards", "Reporting Systems", "Data Management", "Process Improvement"],
  },
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  tag: string;
  problem: string;
  approach: string;
  system: string[];
  features: string[];
  result: string;
  technology: string[];
  images: { src: string; alt: string }[];
  links?: { label: string; href: string }[];
  status?: string;
  frame?: "phone" | "browser" | "attendance";
};

export const projects: Project[] = [
  {
    slug: "thinkdesk",
    name: "ThinkDesk",
    category: "AI SaaS Platform / Knowledge Workspace",
    tag: "Full-Stack AI SaaS",
    status: "Live — real billing & deployed",
    problem:
      "Most \"chat with your PDF\" tools stop at a single Q&A box with no way to verify an answer, no team access control, no way to act on what's found, and no real path to being an actual product — just a demo.",
    approach:
      "Built a genuine multi-tenant SaaS from the ground up: hybrid (vector + keyword) retrieval with citation-backed answers, document intelligence, AI agent actions that require explicit human approval before anything is sent externally, and real Lemon Squeezy billing — not a single fake button in the whole product.",
    system: [
      "Upload PDF",
      "Chunk & embed locally (fastembed)",
      "Hybrid search + rerank",
      "Grounded LLM answer + citation",
      "Human-approved agent action",
    ],
    features: [
      "Hybrid retrieval (vector + BM25) with reciprocal rank fusion and cross-encoder reranking",
      "Every chat answer links back to its exact source passage — never fabricated",
      "AI agent drafts an action (email/document summary); nothing reaches Slack until a human explicitly approves it",
      "Automation rules that queue drafts for approval instead of acting unattended",
      "Gmail, Slack & Notion connectors with real OAuth",
      "Real Lemon Squeezy checkout and signature-verified billing webhooks — a working paid tier, not a mockup",
      "Free-plan usage limits enforced server-side (3 documents / 50 messages)",
      "Multi-tenant workspaces with role-based access, isolated per organization",
    ],
    result:
      "Deployed and live, with a real test-mode purchase completed end-to-end (checkout → signed webhook → subscription unlocked) and a 105-test backend suite covering retrieval, tenant isolation, connectors, agent approval flow, and billing.",
    technology: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "fastembed",
      "Groq LLM API",
      "OAuth 2.0",
      "Lemon Squeezy",
      "Vercel",
    ],
    images: [
      { src: "/images/projects/thinkdesk-landing.png", alt: "ThinkDesk landing page" },
      { src: "/images/projects/thinkdesk-chat.png", alt: "ThinkDesk chat with a cited, grounded answer" },
      { src: "/images/projects/thinkdesk-documents.png", alt: "ThinkDesk document upload and processing" },
      { src: "/images/projects/thinkdesk-billing.png", alt: "ThinkDesk real usage limits and billing" },
    ],
    links: [
      { label: "Live Demo", href: "https://thinkdesk-three.vercel.app" },
      { label: "View on GitHub", href: "https://github.com/saad92005/thinkdesk" },
    ],
    frame: "browser",
  },
  {
    slug: "aes-portal",
    name: "AES Portal",
    category: "Android Application / Business Management / AI",
    tag: "Android App / Enterprise",
    status: "Shipped — live on Google Play",
    problem:
      "Al Areesh Engineering Solutions ran work orders, attendance, and expense approvals across manual, disconnected processes — hard to track, slow to reconcile, and dependent on paper and spreadsheets.",
    approach:
      "Designed a single Android application covering the full operational loop for field and office staff, with geolocation-verified attendance and an integrated AI assistant for in-app support.",
    system: [
      "Employee opens app",
      "Work order / attendance / expense action",
      "Location & data captured",
      "Synced to central database",
      "Management dashboard & notifications",
    ],
    features: [
      "Work order tracking",
      "Geo-location employee attendance",
      "Expense workflows",
      "Notifications",
      "Operational management dashboards",
      "Integrated AI assistant",
    ],
    result: "Deployed and in active daily use across multiple regions.",
    technology: ["Android", "Geolocation APIs", "AI Assistant Integration", "Database Workflows"],
    images: [
      { src: "/images/projects/aes-portal-dashboard.jpeg", alt: "AES Portal regional dashboard" },
      { src: "/images/projects/aes-portal-workorders.jpeg", alt: "AES Portal work orders list" },
      { src: "/images/projects/aes-portal-quotations.jpeg", alt: "AES Portal quotations" },
      { src: "/images/projects/aes-portal-invoices.jpeg", alt: "AES Portal invoices" },
      { src: "/images/projects/aes-portal-reports.jpeg", alt: "AES Portal reports" },
      { src: "/images/projects/aes-portal-leave.jpeg", alt: "AES Portal leave management" },
      { src: "/images/projects/aes-portal-gmailsync.jpeg", alt: "AES Portal Gmail sync" },
    ],
    frame: "phone",
  },
  {
    slug: "aes-attendance",
    name: "AES Automated Attendance System",
    category: "Automation / Location / Business System",
    tag: "Automation / Geolocation",
    problem:
      "Attendance was self-reported and manually compiled, making it slow to verify and easy to misreport — especially for field staff working across sites.",
    approach:
      "Built an installable PWA that captures employee attendance using geolocation, reverse-geocodes the address, and syncs structured check-in / check-out records to a central automation workflow — no dedicated backend server to host or maintain.",
    system: ["Employee Check-in", "Geolocation API", "Verification", "Database", "Central Dashboard"],
    features: [
      "Geolocation-based check-in / check-out",
      "Automatic reverse geocoding of check-in location",
      "Automated late-arrival detection",
      "Offline-capable PWA with background sync",
    ],
    result: "Deployed and in active use for field attendance tracking.",
    technology: ["JavaScript", "Geolocation API", "Service Worker", "n8n Automation"],
    images: [
      { src: "/images/projects/aes-attendance-app.png", alt: "AES Attendance check-in screen" },
      { src: "/images/projects/aes-attendance-checkedin.png", alt: "AES Attendance checked-in state with location log" },
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/saad92005/attendtrack" }],
    frame: "phone",
  },
  {
    slug: "techpro-uae",
    name: "TechPro UAE",
    category: "Web Development / Business Website",
    tag: "Web Application / Client",
    problem:
      "An Abu Dhabi/Sharjah industrial supplier needed a professional, responsive web presence that could credibly represent the business and structure its product/service information for customers.",
    approach:
      "Designed and developed a responsive business website end to end — from information architecture to production deployment.",
    system: ["Content structure", "Responsive layout", "Production build", "Deployment"],
    features: ["Responsive interface", "Structured content", "Modern web experience", "SEO-conscious structure"],
    result: "Deployed and live in production.",
    technology: ["Next.js", "Responsive Design", "Vercel Deployment"],
    images: [{ src: "/images/projects/techpro-uae.jpeg", alt: "TechPro UAE homepage" }],
    links: [{ label: "Visit Website", href: "https://techprouae.com" }],
    frame: "browser",
  },
  {
    slug: "omnira",
    name: "Omnira",
    category: "Desktop Application / AI Assistant",
    tag: "AI Desktop App",
    status: "In development — Phase 0",
    problem:
      "Wanted a genuinely local, Jarvis-style AI assistant for the desktop — voice and chat with real system actions — without locking into a single AI vendor or paying for infrastructure just to experiment.",
    approach:
      "Built a monorepo with a Tauri + React desktop shell and a Fastify + Prisma backend, behind a vendor-agnostic LLM provider interface so the model isn't hardcoded, plus Whisper-based voice transcription and a permission-gated system-control layer.",
    system: ["Voice / Chat Input", "Desktop Shell (Tauri)", "API (Fastify)", "LLM Provider Interface", "Permissioned System Actions"],
    features: [
      "Voice input via Whisper (Groq)",
      "Vendor-agnostic LLM orchestration",
      "Permission-gated system control",
      "Windows installer (NSIS / MSI)",
      "PWA-installable web build",
    ],
    result:
      "Verified end-to-end on Windows — built, installed, and launched as a real desktop app; currently in active development.",
    technology: ["TypeScript", "Tauri", "React", "Fastify", "Prisma", "Groq API"],
    images: [],
    links: [{ label: "View on GitHub", href: "https://github.com/saad92005/omnira" }],
  },
  {
    slug: "arabic-dialect-mt",
    name: "Arabic Dialect Machine Translation",
    category: "AI / NLP Research",
    tag: "NLP / Research",
    problem:
      "Standard machine translation systems are trained on Modern Standard Arabic and perform poorly on regional dialects (Moroccan, Levantine, Gulf, Tunisian) because parallel training data for dialects is scarce and diverges sharply from MSA in vocabulary and morphology.",
    approach:
      "Built and compared two translation approaches for a university NLP course — a from-scratch Seq2Seq GRU baseline, and a transfer-learning model fine-tuning AraBERT (pre-trained on 77GB of Arabic text) with a GRU decoder — to demonstrate how pre-training helps in a low-resource setting.",
    system: ["Arabic Dialect Input", "AraBERT Tokenizer", "AraBERT Encoder", "GRU Decoder", "English Output"],
    features: [
      "Baseline vs. BERT-enhanced comparison",
      "4 dialects covered (Moroccan, Levantine, Gulf, Tunisian)",
      "Transfer learning via AraBERT fine-tuning",
      "Written up as an IEEE-format research paper",
    ],
    result: "Completed as a course project, with a full baseline-vs-transfer-learning comparison and an IEEE-format paper.",
    technology: ["Python", "PyTorch", "Hugging Face Transformers", "AraBERT"],
    images: [],
    links: [{ label: "View on GitHub", href: "https://github.com/saad92005/arabic-dialect-mt-nlp" }],
  },
];

export type ExperienceEntry = {
  role: string;
  org: string;
  subrole: string;
  period: string;
  note?: string;
  points: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Business Development Head (Pakistan)",
    org: "OGem Systems",
    subrole: "Marketing & AI Solutions",
    period: "March 2026 – July 2026",
    points: [
      "Built the Pakistan BD function from scratch and created prospecting workflows.",
      "Designed outreach and targeting strategy for SMB and mid-market prospects across AI automation, web apps, and SaaS.",
      "Ran multi-channel campaigns that doubled inbound lead volume within the first quarter.",
      "Worked with development teams to scope projects and cut proposal turnaround time by 40%.",
      "Managed client relationships and contributed to 3+ software and automation projects.",
    ],
  },
  {
    role: "Back Office Executive",
    org: "Al Areesh Engineering Solutions (Pvt.) Ltd.",
    subrole: "Operations, Data Management & Technology Support",
    period: "July 2025 – Present",
    note: "Began as an internship (Jul 2025 – Dec 2025), continued as Executive.",
    points: [
      "Built Excel dashboards, trackers, and reporting systems for work orders, quotations, expenses, and billing.",
      "Coordinated workflows across data management and process improvement.",
      "Supported attendance systems and workflow automation initiatives.",
      "Bridged back-office operations with custom technology solutions.",
    ],
  },
];

export const education = {
  degree: "Bachelor of Computer Science",
  school: "University of Management and Technology (UMT)",
  location: "Lahore, Pakistan",
  period: "October 2023 – August 2027",
};

export const certifications = [
  "Machine Learning using Python",
  "Claude Academy: Deploying Claude Enterprise with Confidence — The Five Decisions That Shape Your Rollout",
];
