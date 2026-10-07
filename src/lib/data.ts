export const profile = {
  name: "Muhammad Saad",
  brand: "Saad Shahid",
  role: "AI Automation & Software Engineer",
  location: "Lahore, Punjab, Pakistan",
  locationShort: "Lahore, Pakistan",
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

export const cornerLabels = [
  { label: "AI ENGINEER", position: "top-left" as const },
  { label: "DEVELOPER", position: "top-right" as const },
  { label: "AUTOMATION", position: "bottom-left" as const },
  { label: "CS STUDENT", position: "bottom-right" as const },
];

export const tools = [
  "Python",
  "PyTorch",
  "Next.js",
  "React",
  "TypeScript",
  "Android",
  "n8n",
  "Hugging Face",
  "Groq",
  "Tailwind CSS",
  "GitHub",
  "Figma",
  "Vercel",
  "Microsoft Excel",
] as const;

export type Project = {
  slug: string;
  status: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  stack: string[];
  system: string[];
  result: string;
  images: { src: string; alt: string }[];
  links?: { label: string; href: string }[];
  frame?: "phone" | "browser";
};

export const projects: Project[] = [
  {
    slug: "sirat-path",
    status: "Live — installable PWA",
    category: "PWA / AI Companion",
    title: "Sirat Path",
    subtitle: "Islamic Companion PWA",
    description:
      "A free, offline-first Islamic companion: Quran, Salah times, Duas & Azkar, Hadith, Qibla, Ramadan, Zakat and Hajj guides, with an AI assistant and cross-device sync.",
    highlights: [
      "Offline-first installable PWA",
      "Groq-powered AI assistant",
      "Supabase auth with cross-device sync",
      "Admin panel with content reports",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Groq API", "PWA", "Vercel"],
    system: ["Open app (offline)", "Local-first data", "Supabase sync", "AI assistant (Groq)"],
    result: "Live and installable, with cross-device sync verified on real devices.",
    images: [{ src: "/images/projects/sirat-path.png", alt: "Sirat Path home screen" }],
    links: [
      { label: "Live app", href: "https://siratpath.vercel.app" },
      { label: "View on GitHub", href: "https://github.com/saad92005/sirat-path" },
    ],
    frame: "browser",
  },
  {
    slug: "learnwise",
    status: "Live — web + Android",
    category: "EdTech / AI Tutor",
    title: "LearnWise",
    subtitle: "AI Tutor in English, Urdu & Arabic",
    description:
      "An AI tutor that teaches step by step in English, Urdu and Arabic, with voice, lessons, courses, human teachers and an installable Flutter app.",
    highlights: [
      "Step-by-step AI tutoring in 3 languages",
      "Voice input and lessons",
      "Courses with human teachers",
      "Web app plus Flutter Android app",
    ],
    stack: ["Next.js", "Supabase", "Flutter", "Groq API", "Vercel"],
    system: ["Student asks", "AI tutor explains step by step", "Lessons & courses", "Progress saved"],
    result: "Live on the web with a downloadable Android app.",
    images: [{ src: "/images/projects/learnwise.png", alt: "LearnWise landing page" }],
    links: [{ label: "Live app", href: "https://learnwise-app.vercel.app" }],
    frame: "browser",
  },
  {
    slug: "thinkdesk",
    status: "Live — real billing & deployed",
    category: "Full-Stack AI SaaS",
    title: "ThinkDesk",
    subtitle: "AI SaaS Platform / Knowledge Workspace",
    description:
      "A genuine multi-tenant SaaS built from the ground up: hybrid (vector + keyword) retrieval with citation-backed answers, document intelligence, AI agent actions that require explicit human approval before anything is sent externally, and real Lemon Squeezy billing.",
    highlights: [
      "Hybrid retrieval (vector + BM25) with reciprocal rank fusion and cross-encoder reranking",
      "Every chat answer links back to its exact source passage — never fabricated",
      "AI agent drafts an action (email/document summary); nothing reaches Slack until a human explicitly approves it",
      "Real Lemon Squeezy checkout and signature-verified billing webhooks",
    ],
    stack: [
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
    system: ["Upload PDF", "Chunk & embed", "Hybrid search + rerank", "Grounded answer + citation", "Human-approved action"],
    result:
      "Deployed and live, with a real test-mode purchase completed end-to-end (checkout → signed webhook → subscription unlocked) and a 105-test backend suite covering retrieval, tenant isolation, connectors, agent approval flow, and billing.",
    images: [
      { src: "/images/projects/thinkdesk-landing.png", alt: "ThinkDesk landing page" },
      { src: "/images/projects/thinkdesk-chat.png", alt: "ThinkDesk chat with a cited, grounded answer" },
      { src: "/images/projects/thinkdesk-documents.png", alt: "ThinkDesk document upload and processing" },
      { src: "/images/projects/thinkdesk-billing.png", alt: "ThinkDesk real usage limits and billing" },
    ],
    links: [
      { label: "Live demo", href: "https://thinkdesk-three.vercel.app" },
      { label: "View on GitHub", href: "https://github.com/saad92005/thinkdesk" },
    ],
    frame: "browser",
  },
  {
    slug: "aes-portal",
    status: "Shipped — live on Google Play",
    category: "Android App / Enterprise",
    title: "AES Portal",
    subtitle: "Android Application / Business Management / AI",
    description:
      "A single Android application covering the full operational loop for field and office staff — work orders, geolocation-verified attendance, expense workflows, and an integrated AI assistant. Deployed and in active daily use across multiple regions.",
    highlights: [
      "Work order tracking",
      "Geolocation-verified employee attendance",
      "Expense workflows",
      "Integrated AI assistant",
    ],
    stack: ["Android", "Geolocation APIs", "AI Assistant Integration", "Database Workflows"],
    system: ["Employee opens app", "Work order / attendance / expense action", "Location & data captured", "Synced to database", "Management dashboard"],
    result: "Deployed and in active daily use across multiple regions.",
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
    status: "Deployed & in active use",
    category: "Automation / Geolocation",
    title: "AES Automated Attendance System",
    subtitle: "Progressive Web App",
    description:
      "An installable PWA that captures employee attendance via geolocation, reverse-geocodes the address, and syncs structured check-in/check-out records to an automation workflow — no dedicated backend server required.",
    highlights: [
      "Geolocation-based check-in / check-out",
      "Automatic reverse geocoding of check-in location",
      "Automated late-arrival detection",
      "Offline-capable PWA with background sync",
    ],
    stack: ["JavaScript", "Geolocation API", "Service Worker", "n8n Automation"],
    system: ["Employee check-in", "Geolocation API", "Verification", "Automation workflow", "Central dashboard"],
    result: "Deployed and in active use for field attendance tracking.",
    images: [
      { src: "/images/projects/aes-attendance-app.png", alt: "AES Attendance check-in screen" },
      { src: "/images/projects/aes-attendance-checkedin.png", alt: "AES Attendance checked-in state with location log" },
    ],
    frame: "phone",
  },
  {
    slug: "techpro-uae",
    status: "Live in production",
    category: "Web Application / Client",
    title: "TechPro UAE",
    subtitle: "Web Development / Business Website",
    description:
      "Designed and developed a responsive business website end to end for an Abu Dhabi/Sharjah industrial supplier — from information architecture to production deployment.",
    highlights: ["Responsive interface", "Structured content architecture", "Modern web experience"],
    stack: ["Next.js", "Responsive Design", "Vercel Deployment"],
    system: ["Content structure", "Responsive layout", "Production build", "Deployment"],
    result: "Deployed and live in production.",
    images: [{ src: "/images/projects/techpro-uae.jpeg", alt: "TechPro UAE homepage" }],
    links: [{ label: "Visit website", href: "https://techprouae.com" }],
    frame: "browser",
  },
  {
    slug: "omnira",
    status: "In development — Phase 0",
    category: "Desktop Application / AI Assistant",
    title: "Omnira",
    subtitle: "AI Desktop Assistant",
    description:
      "A Jarvis-style local AI desktop assistant: a Tauri + React desktop shell, Fastify + Prisma backend, a vendor-agnostic LLM provider interface, Whisper-based voice transcription, and a permission-gated system-control layer. Verified end-to-end on Windows.",
    highlights: [
      "Voice input via Whisper (Groq)",
      "Vendor-agnostic LLM orchestration",
      "Permission-gated system control",
      "Windows installer (NSIS / MSI)",
    ],
    stack: ["TypeScript", "Tauri", "React", "Fastify", "Prisma", "Groq API"],
    system: ["Voice / chat input", "Desktop shell (Tauri)", "API (Fastify)", "LLM provider interface", "Permissioned system actions"],
    result: "Verified end-to-end on Windows — built, installed, and launched as a real desktop app; currently in active development.",
    images: [{ src: "/images/projects/omnira-ai.jpeg", alt: "Omnira AI desktop assistant" }],
    links: [{ label: "View on GitHub", href: "https://github.com/saad92005/omnira" }],
  },
  {
    slug: "arabic-mt",
    status: "Completed — IEEE-format paper",
    category: "AI / NLP Research",
    title: "Arabic Dialect Machine Translation",
    subtitle: "NLP Research",
    description:
      "Built and compared two translation approaches for a university NLP course — a from-scratch Seq2Seq GRU baseline and a transfer-learning model fine-tuning AraBERT — across 4 Arabic dialects (Moroccan, Levantine, Gulf, Tunisian).",
    highlights: [
      "Baseline vs. AraBERT-enhanced comparison",
      "4 dialects covered",
      "Transfer learning via AraBERT fine-tuning",
      "Full IEEE-format research paper",
    ],
    stack: ["Python", "PyTorch", "Hugging Face Transformers", "AraBERT"],
    system: ["Arabic dialect input", "AraBERT tokenizer", "AraBERT encoder", "GRU decoder", "English output"],
    result:
      "On a held-out Tatoeba benchmark, the fine-tuned Marian model reaches BLEU 29.0 vs 13.0 zero-shot, written up as an IEEE-format paper.",
    images: [],
    links: [{ label: "View on GitHub", href: "https://github.com/saad92005/arabic-dialect-mt-nlp" }],
  },
];

export type ExperienceEntry = {
  period: string;
  role: string;
  org: string;
  orgSubtitle: string;
  note?: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    period: "March 2026 – July 2026",
    role: "Business Development Head (Pakistan)",
    org: "OGem Systems",
    orgSubtitle: "Marketing & AI Solutions",
    bullets: [
      "Built the Pakistan business-development function from scratch and created prospecting workflows.",
      "Designed outreach and targeting strategy for SMB and mid-market prospects across AI automation, web apps, and SaaS.",
      "Ran multi-channel campaigns that doubled inbound lead volume within the first quarter.",
      "Worked with development teams to scope projects and cut proposal turnaround time by 40%.",
      "Managed client relationships and contributed to 3+ software and automation projects.",
    ],
  },
  {
    period: "July 2025 – Present",
    role: "Back Office Executive",
    org: "Al Areesh Engineering Solutions (Pvt.) Ltd.",
    orgSubtitle: "Operations, Data Management & Technology Support",
    note: "Began as an internship (Jul 2025 – Dec 2025), continued as Executive.",
    bullets: [
      "Built Excel dashboards, trackers, and reporting systems for work orders, quotations, expenses, and billing.",
      "Coordinated workflows across data management and process improvement.",
      "Supported attendance systems and workflow automation initiatives.",
      "Bridged back-office operations with custom technology solutions.",
    ],
  },
];

export type Capability = { title: string; items: string[] };

export const capabilities: Capability[] = [
  {
    title: "AI Engineering",
    items: ["LLMs", "RAG", "AI Assistants", "AI Agents", "Generative AI", "NLP"],
  },
  {
    title: "Software Engineering",
    items: ["Python", "REST APIs", "Databases", "Application Architecture", "Testing", "Debugging", "Deployment"],
  },
  {
    title: "AI Automation",
    items: ["Workflow Automation", "AI-Powered Workflows", "API Integrations", "Business Process Automation"],
  },
  {
    title: "Web & Mobile",
    items: ["Responsive Websites", "Android Applications", "React / React Native", "Next.js"],
  },
  {
    title: "Data & Operations",
    items: ["Dashboards", "Reporting Systems", "Data Management", "Process Improvement"],
  },
];

export const aboutChecklist = [
  "Designing practical AI systems — LLMs, RAG, NLP, and AI agents",
  "Shipping production apps used daily by real teams (Android, web, PWA)",
  "Bridging business operations with custom automation and tooling",
];

export const aboutTags = ["AI", "Machine Learning", "NLP", "LLMs", "RAG", "Automation", "Software Engineering"];

export const aboutStats = [
  { value: 8, suffix: "+", label: "Projects shipped or in active development" },
  { value: 5, suffix: "", label: "Apps live in production" },
  { value: 100, suffix: "%", label: "Real systems — not portfolio demos" },
];

export const education = {
  degree: "Bachelor of Computer Science",
  school: "University of Management and Technology (UMT)",
  location: "Lahore, Pakistan",
  period: "October 2023 – Expected August 2027",
};

export const certifications = [
  { issuer: "Simplilearn", title: "Machine Learning using Python" },
  {
    issuer: "Claude Academy",
    title: "Deploying Claude Enterprise with Confidence: The Five Decisions That Shape Your Rollout",
  },
];
