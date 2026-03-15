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
  screenshotType: "desktop" | "mobile";  // NEW
  stack: string[];
  stackColors: TagColor[];
  icon: string;
  images: string[];
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
   screenshotType: "desktop",
      stack: ["Spring WebFlux", "R2DBC", "PostgreSQL", "Docker", "AWS"],
    stackColors: ["purple", "blue", "blue", "pink", "orange"],
    icon: "💳",
    images: [
      "simpay-admin/login.png",
      "simpay-admin/packages.png",
      "simpay-admin/transactions.png",
    ],
    gradient: "from-violet-950 to-indigo-950",
    company: "Simco Group of Companies",
  },
  {
    id: "simcoapp",
    title: "Simpay App",
    subtitle: "Cross-Platform Mobile App",
    description:
      "Mobile app built in React Native / Expo. Features iOS & Android builds.",
      screenshotType: "mobile",

    stack: ["React Native", "Expo", "Firebase", "TypeScript", "EAS Build"],
    stackColors: ["blue", "blue", "pink", "purple", "orange"],
    icon: "📱",
    images: [
      "simpay-app/login.png",
      "simpay-app/home.png",
      "simpay-app/recharge.png",
      "simpay-app/transactions.png",
      "simpay-app/reports.png",

    ],

    gradient: "from-sky-950 to-cyan-950",
    company: "Simco Group of Companies",
  },
  {
    id: "CAP10",
    title: "Football platform",
    subtitle: "Platform for amateur football players.",
    description:
      "Full-featured admin panel for managing agents, regions, and transactions. Real-time charts and role-based access control.",
      screenshotType: "mobile",

    stack: ["Kotlin", "Java", "Android", "MVVM", "Retrofit"],
    stackColors: ["purple", "blue", "pink", "blue"],
    icon: "📱",
    images: [
      "CAP10/home.jpeg",
      "CAP10/matches-result.jpeg",
      "CAP10/match-summary.jpeg",
      "CAP10/timeline.jpeg",
      "CAP10/team-format.jpeg",
      "CAP10/team-players.jpeg",
      "CAP10/player-profile.jpeg",
      "CAP10/standing.jpeg",
      "CAP10/expectations.jpeg",
    ],
    gradient: "from-purple-950 to-violet-950",
    company: "CAP10 Startup",
  },
  {
    id: "Topup",
    title: "Topup Recharge",
    subtitle: "POS App for recharge and vouchers.",
    description:
      "POS & Mobile app for transactions (DuPay, ePin, Google play, Itunes, Du, Salik)",
      screenshotType: "desktop",
    stack: ["Kotlin", "Ktor", "Offline-first", "WorkManager", "Performance"],
    stackColors: ["purple", "pink", "pink", "blue"],
    icon: "📱",
    images: [],
    gradient: "from-slate-950 to-blue-950",
    company: "Axiom Telecom LLC",
  },
  {
    id: "Support",
    title: "Support Tracking App",
    subtitle: "Mobile app for support team",
    description:
      "Open tickets, Site visits, Locations check-Ins.",
      screenshotType: "mobile",

    stack: ["Kotlin Multiplatfor" , "Koin", "Ktor", "Jetpack Compose"],
    stackColors: ["purple", "pink", "pink", "blue"],
    icon: "📱",
    images: [

    ],
    gradient: "from-slate-950 to-blue-950",
    company: "Axiom Telecom LLC",
  },
  {
    id: "shopini",
    title: "Shopini Logistics Handheld",
    subtitle: "Mobile app for warehouse management",
    description:
      "Zebra device to manage shipments (Scanning, Printing)",
      screenshotType: "mobile",

    stack: ["Kotlin" , "RxJava", "Zebra SDK"],
    stackColors: ["purple", "pink", "pink", "blue"],
    icon: "📱",
    images: [
      "shopini-handheld/04-phone.png",
      "shopini-handheld/03-phone.png",
      "shopini-handheld/02-phone.png",
      "shopini-handheld/01-phone.png",
    ],
    gradient: "from-slate-950 to-blue-950",
    company: "Axiom Telecom LLC",
  },
  {
    id: "shopini",
    title: "Shopini Customers",
    subtitle: "Mobile app for shipping",
    description:
      "Mobile app for tracking shipments for USA, UK, China, Turkey.",
      screenshotType: "mobile",

    stack: ["Kotlin" , "Navigation", "Koltin Flow"],
    stackColors: ["purple", "pink", "pink", "blue"],
    icon: "📱",
    images: [
      "shopini-customer/login.png",
      "shopini-customer/home.png",
      "shopini-customer/calculator.png",
      "shopini-customer/shipping.png",
    ],
    gradient: "from-slate-950 to-blue-950",
    company: "Axiom Telecom LLC",
  },
  {
    id: "Launcher",
    title: "Launcher & Update App",
    subtitle: "Custom App for MDM management on POS",
    description:
      "MDM, Lock/Unlock, Kiosk Mode, Push notifications",
      screenshotType: "desktop",

    stack: ["Kotlin" , "Device Owner", "Sunmi", "Mobiwire SDK", "Printers"],
    stackColors: ["purple", "pink", "pink", "blue"],
    icon: "📱",
    images: [],
    gradient: "from-slate-950 to-blue-950",
    company: "Axiom Telecom LLC",
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
    date: "Feb 2025",
    tag: "AI Engineering",
    title: "Integrating AI (OCR) into Logistics: A Practical Success Story from Android Engineering",
    excerpt:
      "How I introduced AI-driven automation into logistics and warehouse management using Google ML Kit — eliminating manual parcel data entry with a single photo.",
    url: "https://medium.com/@m.alhussein.96/integrating-ai-ocr-into-logistics-a-practical-success-story-from-android-engineering-4c922c9550ed",
  },
  {
    date: "Oct 2024",
    tag: "Android",
    title: "Enhance Jetpack Compose Performance Using Baseline Profiles",
    excerpt:
      "If you've developed an Android app using Jetpack Compose and noticed performance issues even in the release APK — this is how to fix it.",
    url: "https://medium.com/@m.alhussein.96/enhance-jetpack-compose-performance-using-baseline-profiles-bc7d02a43229",
  },
  {
    date: "Oct 2023",
    tag: "Hardware",
    title: "Zebra Hardware (Printers): Connect Android To Printers Guide I",
    excerpt:
      "A practical guide to connecting Android devices to Zebra printers via WiFi, Bluetooth Classic, and Bluetooth LE.",
    url: "https://medium.com/@m.alhussein.96/zebra-hardware-printers-connect-android-to-printers-guide-i-7c1842ed8aa4",
  },
];

export const contactLinks = [
  { icon: "📧", label: "m.alhussein.96@gmail.com",          sub: "Email me anytime",    href: "mailto:m.alhussein.96@gmail.com" },
  { icon: "💼", label: "linkedin.com/in/al-hussein96/",     sub: "Connect on LinkedIn", href: "https://www.linkedin.com/in/al-hussein96/" },
  { icon: "🐙", label: "github.com/Al-Hussein-96",          sub: "See my code",         href: "https://github.com/Al-Hussein-96" },
  { icon: "✍️", label: "medium.com/@m.alhussein.96",         sub: "Read my articles",    href: "https://medium.com/@m.alhussein.96" },
];