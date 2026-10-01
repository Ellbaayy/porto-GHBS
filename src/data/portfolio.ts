export const profile = {
  name: "Gesang Hemas Bayu Sekti",
  short: "Gesang Hemas Bayu Sekti.",
  initials: "GHBS",
  instagramHandle: "@ellbaayy",
  email: "bayusekti28@gmail.com",
  tagline: "Personal Portfolio 2026",
  summary:
    "Informatics student at President University, focused on Artificial Intelligence, Computer Vision, and building intelligent systems that turn ideas into working software.",
};

export const heroStats = [
  { label: "Projects", display: "02", foot: "Featured work in AI and Web" },
  { label: "Focus", display: "AI Engineer", displaySmall: true, foot: "Long-term direction" },
  { label: "Award", display: "3rd Winner", displaySmall: true, foot: "AIC '26 · Waste Management" },
];

export const aboutInfo = [
  { label: "Currently", value: "Informatics student, President University" },
  { label: "Concentration", value: "Artificial Intelligence" },
  { label: "Based in", value: "Indonesia, open to remote" },
  { label: "Available for", value: "Collaboration, AI experiments, interesting projects" },
];

export const interests = [
  "Artificial Intelligence",
  "Machine Learning",
  "Computer Vision",
  "AI Agents",
  "Generative AI",
  "Data Science",
  "Web Development",
  "IoT & Edge AI",
  "Local AI",
  "Automation",
];

export const marqueeWords = [
  "Artificial Intelligence",
  "Computer Vision",
  "AI Agents",
  "Generative AI",
  "Data Science",
  "IoT & Edge AI",
  "Local AI",
  "Automation",
];

export type TechItem = string;

export const techStack: { heading: string; items: TechItem[] }[] = [
  {
    heading: "Programming Languages",
    items: ["Python", "C", "C++", "JavaScript", "PHP", "SQL"],
  },
  {
    heading: "AI & Machine Learning",
    items: ["Machine Learning", "Computer Vision", "YOLO", "Data Science", "AI Agents", "Generative AI"],
  },
  {
    heading: "Web Development",
    items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Laravel", "Node.js"],
  },
  {
    heading: "Tools & Platforms",
    items: ["Git", "GitHub", "Linux", "VS Code", "Arduino", "ESP32", "Docker"],
  },
];

export type ProjectLink = {
  label: string;
  href: string;
  kind: "live" | "code";
};

export type Project = {
  index: string;
  tag: string;
  title: string;
  description: string;
  stack: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    index: "01",
    tag: "Computer Vision · Team",
    title: "Jakarta Waste Intelligence System",
    description:
      "A computer vision system that classifies waste by category using object detection and machine learning. Built with a small team and awarded 3rd Winner in the Waste Management sector at AI Innovation Challenge 2026; my contribution focused on the detection pipeline.",
    stack: ["Python", "YOLO", "Computer Vision"],
    links: [
      { label: "Repository", href: "https://github.com/bynguts/jwis-system", kind: "code" },
    ],
  },
  {
    index: "02",
    tag: "Web + AI",
    title: "L'ORE-AI",
    description:
      "A deployed AI fragrance concierge that matches users to scents from mood, occasion, and identity. Includes a conversational assistant, climate-aware recommendations, and saved discovery history.",
    stack: ["AI", "Web Development", "Recommendation System", "Conversational AI"],
    links: [
      { label: "Live demo", href: "https://gesanghemas-lore-ai.hf.space/", kind: "live" },
      { label: "Repository", href: "https://github.com/Ellbaayy/Loreal", kind: "code" },
    ],
  },
];

export const achievements = [
  {
    year: "2026",
    title: "3rd Winner, AI Innovation Challenge 2026 — Waste Management sector",
    desc: "Awarded with the team for the Jakarta Waste Intelligence System, organized by DLH and President University.",
  },
  {
    year: "2026",
    title: "Samsung Innovation Campus 2026",
    desc: "Exploring technology, programming, and innovation through SIC 2026.",
  },
  {
    year: "Now",
    title: "President University",
    desc: "Informatics student, Artificial Intelligence concentration.",
  },
];

export const certifications = [
  {
    year: "2026",
    title: "3rd Winner, AI Innovation Challenge 2026 — Waste Management sector",
    desc: "Our Jakarta Waste Intelligence System placed third in the Open Innovation Challenge hosted by the DKI Jakarta Provincial Government through DLH, built with the team and awarded under the Innovation Scholarship program.",
    image: "/images/certifications/ai-innovation.jpeg",
    alt: "Team holding the 3rd Winner trophy and award board at the Open Innovation Challenge hosted by the DKI Jakarta Provincial Government, Waste Management sector",
    portrait: true,
  },
  {
    year: "2025",
    title: "English Proficiency Program for TOEIC, score 660",
    desc: "Listening 345 and Reading 315 at Basic Working Proficiency level, issued by Language For International in April 2025.",
    image: "/images/certifications/toeic.webp",
    alt: "TOEIC English Proficiency certificate, score 660, issued by Language For International (certificate number redacted)",
  },
  {
    year: "2025",
    title: "Certificate of Competence, Junior Technical Support",
    desc: "Computer Network Engineering scheme, issued by BNSP through LSP SMK Negeri 1 Cikarang Barat in May 2025. Valid for three years.",
    image: "/images/certifications/bnsp.webp",
    alt: "BNSP Certificate of Competence, Junior Technical Support in Computer Network Engineering (serial numbers, barcode, and signature redacted)",
  },
  {
    year: "2025",
    title: "Global Entrepreneurship and Innovation Bootcamp",
    desc: "Completion certificate from Thunderbird School of Global Management at Arizona State University, December 2025, under the Najafi 100 Million Learners Global Initiative.",
    image: "/images/certifications/geib.webp",
    alt: "Global Entrepreneurship and Innovation Bootcamp completion certificate, Thunderbird School of Global Management at Arizona State University (QR code redacted)",
  },
];

export const learning = [
  { area: "Artificial Intelligence", focus: "Machine learning & AI applications" },
  { area: "Python", focus: "AI, automation, and data processing" },
  { area: "Computer Vision", focus: "Object detection & image classification" },
  { area: "AI Agents", focus: "Agents, tools, MCP & automation" },
  { area: "Web Development", focus: "Full-stack application development" },
  { area: "Data Science", focus: "Data analysis & machine learning" },
  { area: "IoT", focus: "ESP32, sensors & edge AI" },
  { area: "C / C++", focus: "Programming fundamentals & system-level concepts" },
];

export const agentTopics = [
  "Model Context Protocol (MCP)",
  "AI coding agents",
  "Tool calling",
  "Local AI",
  "AI-powered development workflows",
  "File and project automation",
  "Agentic software development",
];

export type JourneyEvent =
  | { year: string; kind: "future" | "past" | "active"; heading: string; bullets?: string[] };

export const journey: JourneyEvent[] = [
  {
    year: "2024",
    kind: "past",
    heading: "Started exploring technology and programming",
  },
  {
    year: "2025",
    kind: "past",
    heading: "Foundations",
    bullets: [
      "Started studying Informatics",
      "Learned programming fundamentals",
      "Started exploring web development",
    ],
  },
  {
    year: "2026",
    kind: "active",
    heading: "AI focus & first competitions",
    bullets: [
      "Focused on Artificial Intelligence",
      "Samsung Innovation Campus 2026",
      "3rd Winner, AI Innovation Challenge 2026 (Waste Management)",
      "Explored AI Agents & Computer Vision",
      "Started experimenting with MCP and local AI",
    ],
  },
  {
    year: "Future",
    kind: "future",
    heading: "Become an AI Engineer.",
  },
];

export const contact = {
  intro:
    "I'm open to collaboration, interesting projects, AI experiments, and opportunities to learn and build together.",
  vision: "Building the future, one intelligent system at a time.",
  links: [
    { label: "Email", value: "bayusekti28@gmail.com", href: "mailto:bayusekti28@gmail.com" },
    { label: "GitHub", value: "github.com/Ellbaayy", href: "https://github.com/Ellbaayy" },
    { label: "LinkedIn", value: "linkedin.com/in/gesang-hemas-bayu-sekti", href: "https://linkedin.com/in/gesang-hemas-bayu-sekti-01250737b" },
    { label: "Instagram", value: "@ellbaayy", href: "https://instagram.com/ellbaayy" },
  ],
};