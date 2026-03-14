export const skills = [
  // Mobile-focused skills
  { name: "Android (Kotlin)",        icon: "🤖", level: "Expert",             pct: 100, cat: "mobile"   },
  { name: "Kotlin Multiplatform",    icon: "🤖", level: "Expert",             pct: 100, cat: "mobile"   },
  { name: "Kotlin Flow",             icon: "🌊", level: "Expert",             pct: 90,  cat: "mobile"   },
  { name: "Coroutines",              icon: "⏱️", level: "Expert",             pct: 88,  cat: "mobile"   },
  { name: "Hardware integration",    icon: "📡", level: "Expert",             pct: 90,  cat: "mobile"   },
  { name: "Offline-first",           icon: "📶", level: "Expert",             pct: 95,  cat: "mobile"   },
  { name: "Optimization",            icon: "⚡", level: "Expert",             pct: 99,  cat: "mobile"   },
  { name: "Security",                icon: "🔐", level: "Advanced",           pct: 99,  cat: "mobile"   },
  { name: "Google Play",             icon: "🟢", level: "Expert",             pct: 90,  cat: "mobile"   },
  { name: "App Store",               icon: "🔵", level: "Expert",             pct: 90,  cat: "mobile"   },
  { name: "Firebase",                icon: "🔥", level: "Expert",             pct: 95,  cat: "mobile"   },
  { name: "React Native",            icon: "📱", level: "Working Knowledge",  pct: 60,  cat: "mobile"   },
  { name: "Flutter",                 icon: "📱", level: "Working Knowledge",  pct: 60,  cat: "mobile"   },
  { name: "Expo",                    icon: "🚀", level: "Working Knowledge",  pct: 80,  cat: "mobile"   },
  { name: "iOS Basics",              icon: "📱", level: "Familiar",           pct: 50,  cat: "mobile"   },

  // Backend & platform
  { name: "Kotlin",                  icon: "🔷", level: "Expert",             pct: 95,  cat: "backend"  },
  { name: "Spring Boot",             icon: "🍃", level: "Advanced",           pct: 85,  cat: "backend"  },
  { name: "Ktor",                    icon: "🍃", level: "Advanced",           pct: 85,  cat: "backend"  },
  { name: "Coroutines",              icon: "⏱️", level: "Expert",             pct: 88,  cat: "backend"  },
  { name: "Java",                    icon: "☕", level: "Working Knowledge",  pct: 88,  cat: "backend"  },
  { name: "PostgreSQL",              icon: "🐘", level: "Working Knowledge",  pct: 86,  cat: "backend"  },

  // DevOps & workflow
  { name: "Docker",                  icon: "🐳", level: "Advanced",           pct: 84,  cat: "devops"   },
  { name: "AWS",                     icon: "☁️", level: "Advanced",           pct: 84,  cat: "devops"   },
  { name: "Git",                     icon: "🔀", level: "Expert",             pct: 93,  cat: "devops"   },
  { name: "GitHub Actions",          icon: "⚙️", level: "Advanced",           pct: 82,  cat: "devops"   },
  { name: "CI/CD",                   icon: "🔄", level: "Advanced",           pct: 80,  cat: "devops"   },
  { name: "Agile",                   icon: "🏃", level: "Advanced",           pct: 85,  cat: "workflow" },
  { name: "Scrum",                   icon: "📋", level: "Advanced",           pct: 83,  cat: "workflow" },
  { name: "Jira",                    icon: "🎯", level: "Advanced",           pct: 82,  cat: "workflow" },
  { name: "Notion",                  icon: "📝", level: "Advanced",           pct: 82,  cat: "workflow" },
  { name: "Slack",                   icon: "💬", level: "Advanced",           pct: 82,  cat: "workflow" },
];

export const skillCategories = [
  { key: "all",      label: "All"      },
  { key: "mobile",   label: "Mobile"   },
  { key: "backend",  label: "Backend"  },
  { key: "devops",   label: "DevOps"   },
  { key: "workflow", label: "Workflow" },
];

export type TagColor = "purple" | "blue" | "pink" | "orange";

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  stackColors: TagColor[];
  icon: string;
  gradient: string;
  company: string;
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    id: "simpay",
    title: "Simpay Backend",
    subtitle: "Mobile Recharge & Agent Sales Platform",
    description:
      "Reactive backend built with Kotlin, Spring Boot, WebFlux, and R2DBC. Handles agent management, SIM sales, recharges, and renewals with JWT authentication, full audit trails, and activity logging — designed for scalable, high-performance transactions.",
    stack: ["Spring WebFlux", "R2DBC", "PostgreSQL", "Docker", "AWS"],
    stackColors: ["purple", "blue", "blue", "pink", "orange"],
    icon: "💳",
    gradient: "from-violet-950 to-indigo-950",
    company: "Simco Group of Companies",
  },
  {
    id: "simcoapp",
    title: "Simpay App",
    subtitle: "Cross-Platform Mobile App",
    description:
      "Mobile app built in React Native / Expo. Features iOS & Android builds.",
    stack: ["React Native", "Expo", "Firebase", "TypeScript", "EAS Build"],
    stackColors: ["blue", "blue", "pink", "purple", "orange"],
    icon: "📱",
    gradient: "from-sky-950 to-cyan-950",
    company: "Simco Group of Companies",
  },
  {
    id: "admin",
    title: "Admin Dashboard",
    subtitle: "Internal Management Panel for Simpay",
    description:
      "Full-featured admin panel for managing agents, regions, and transactions. Real-time charts and role-based access control.",
    stack: ["React.js", "TypeScript"],
    stackColors: ["purple", "blue", "pink", "blue"],
    icon: "🖥️",
    gradient: "from-purple-950 to-violet-950",
    company: "Simco Group of Companies",
  },
  {
    id: "auth",
    title: "Auth Service",
    subtitle: "JWT Microservice",
    description:
      "JWT-based authentication microservice with refresh tokens, reactive security context propagation, and granular permission scopes.",
    stack: ["Kotlin", "Spring Security", "Redis", "Docker"],
    stackColors: ["purple", "pink", "pink", "blue"],
    icon: "🔐",
    gradient: "from-slate-950 to-blue-950",
    company: "Simco Group of Companies",
  },
];

export const aiProjects = [
  {
    icon: "🤖",
    title: "AI Customer Support Bot",
    description:
      "LLM-powered support assistant integrated into the admin panel. Handles FAQs, transaction queries, and escalation routing using the Claude API.",
    stack: ["Claude API", "Kotlin", "WebFlux", "RAG"],
  },
  {
    icon: "🧠",
    title: "Smart Transaction Classifier",
    description:
      "ML pipeline that classifies and flags suspicious payment patterns in real time. Python model connected to the Kotlin backend via REST.",
    stack: ["Python", "scikit-learn", "FastAPI", "PostgreSQL"],
  },
  {
    icon: "✨",
    title: "AI-Powered Code Review",
    description:
      "Internal CI tool that uses LLMs to review Kotlin PRs, detect reactive anti-patterns, and suggest optimizations before merging.",
    stack: ["Claude API", "GitHub Actions", "Kotlin"],
  },
];

export const blogPosts = [
  {
    date: "Mar 2025",
    tag: "Backend Engineering",
    title: "Migrating from Ktor to Spring WebFlux: A Practical Guide",
    excerpt:
      "A deep dive into architectural decisions, reactive patterns, and gotchas I encountered moving a production payment service.",
    url: "#",
  },
  {
    date: "Jan 2025",
    tag: "Database",
    title: "R2DBC in Production: What Nobody Tells You",
    excerpt:
      "Partial unique indexes, soft-delete patterns, UPDATE quirks, and reactive transaction management — lessons from the trenches.",
    url: "#",
  },
  {
    date: "Nov 2024",
    tag: "Security",
    title: "Building Reactive Auth with Spring Security & JWT",
    excerpt:
      "How to propagate security context in a fully reactive pipeline without blocking the event loop.",
    url: "#",
  },
  {
    date: "Sep 2024",
    tag: "Mobile",
    title: "React Native + Expo for Backend Developers",
    excerpt:
      "A backend developer's honest take on building mobile apps — the good, the bad, and the iOS build system.",
    url: "#",
  },
  {
    date: "Jul 2024",
    tag: "AI Engineering",
    title: "Integrating Claude API into a Production Backend",
    excerpt:
      "Architecture patterns for adding LLM capabilities to existing microservices without leaking AI concerns into your domain layer.",
    url: "#",
  },
  {
    date: "May 2024",
    tag: "DevOps",
    title: "Flyway Migrations with R2DBC and Spring Boot 4",
    excerpt:
      "Why you need a separate HikariDataSource for Flyway and how to configure it without breaking reactive auto-configuration.",
    url: "#",
  },
];

export const contactLinks = [
  { icon: "📧", label: "m.alhussein.96@gmail.com",          sub: "Email me anytime",    href: "mailto:m.alhussein.96@gmail.com" },
  { icon: "💼", label: "linkedin.com/in/al-hussein96/",     sub: "Connect on LinkedIn", href: "https://www.linkedin.com/in/al-hussein96/" },
  { icon: "🐙", label: "github.com/Al-Hussein-96",          sub: "See my code",         href: "https://github.com/Al-Hussein-96" },
  { icon: "✍️", label: "medium.com/@m.alhussein.96",         sub: "Read my articles",    href: "https://medium.com/@m.alhussein.96" },
];