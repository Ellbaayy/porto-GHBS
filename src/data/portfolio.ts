export const profile = {
  name: "Gesang Hemas Bayu Sekti",
  short: "Gesang Hemas Bayu Sekti.",
  initials: "GHBS",
  instagramHandle: "@ellbaayy",
  email: "[email protected]",
  tagline: "Personal Portfolio · 2026",
  summary:
    "Informatics student at President University — focused on Artificial Intelligence, Computer Vision, and building intelligent systems that turn ideas into working software.",
};

export const heroStats = [
  { label: "Projects", display: "04", foot: "Featured work · AI / Web" },
  { label: "Focus", display: "AI Engineer", displaySmall: true, foot: "Long-term direction" },
  { label: "Finalist", display: "AIC '26", foot: "AI Innovation Challenge" },
];

export const aboutInfo = [
  { label: "Currently", value: "Informatics student · President University" },
  { label: "Concentration", value: "Artificial Intelligence" },
  { label: "Based in", value: "Indonesia · Open to remote" },
  { label: "Available for", value: "Collaboration · AI experiments · Interesting projects" },
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

export type Project = {
  index: string;
  tag: string;
  title: string;
  description: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    index: "01",
    tag: "Computer Vision",
    title: "AI Waste Classification",
    description:
      "A computer vision system designed to classify waste based on its category using object detection and machine learning.",
    stack: ["Python", "YOLO", "Computer Vision"],
  },
  {
    index: "02",
    tag: "Local AI",
    title: "AI USB — \"Offline Internet\"",
    description:
      "An experimental concept for a portable AI device that provides local AI capabilities without relying entirely on cloud services.",
    stack: ["AI Agent", "Linux", "Local AI", "IoT", "Networking"],
  },
  {
    index: "03",
    tag: "Recommendation",
    title: "L'ORE-AI",
    description:
      "An AI-powered fragrance discovery concept designed to help users find fragrances based on their preferences and characteristics.",
    stack: ["AI", "Web Development", "Recommendation System"],
  },
  {
    index: "04",
    tag: "Web",
    title: "Kandang Lembu Kembar",
    description:
      "A digital platform concept for promoting and selling Qurban cattle, combining modern web design with digital marketing.",
    stack: ["HTML", "CSS", "JavaScript", "Web Development"],
  },
];

export const achievements = [
  {
    year: "2026",
    title: "AI Innovation Challenge 2026 — Finalist",
    desc: "Selected as a finalist, organized by DLH and President University.",
  },
  {
    year: "2026",
    title: "Samsung Innovation Campus 2026",
    desc: "Exploring technology, programming, and innovation through SIC 2026.",
  },
  {
    year: "Now",
    title: "President University",
    desc: "Informatics student — Artificial Intelligence concentration.",
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
      "AI Innovation Challenge 2026 — Finalist",
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
    { label: "Email", value: "[email protected]", href: "mailto:[email protected]" },
    { label: "GitHub", value: "github.com/Ellbaayy", href: "https://github.com/Ellbaayy" },
    { label: "LinkedIn", value: "linkedin.com/in/gesang-hemas-bayu-sekti", href: "https://linkedin.com/in/gesang-hemas-bayu-sekti-01250737b" },
    { label: "Instagram", value: "@ellbaayy", href: "https://instagram.com/ellbaayy" },
  ],
};