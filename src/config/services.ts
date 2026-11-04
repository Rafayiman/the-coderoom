import type { LucideIcon } from "lucide-react";
import { Brain, Code2, BarChart3, Database, Workflow } from "lucide-react";

export type Service = {
  id: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  items: string[];
};

export const services: Service[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    summary: "Applications that learn from data and work with language and images.",
    icon: Brain,
    items: [
      "AI-powered applications",
      "Machine learning solutions",
      "Computer vision",
      "Natural language processing",
      "Generative AI and LLM integrations",
      "RAG-based systems and intelligent chatbots",
    ],
  },
  {
    id: "web-software",
    title: "Web & Software Development",
    summary: "Reliable web platforms and business software, front to back.",
    icon: Code2,
    items: [
      "Full-stack web application development",
      "Frontend and backend development",
      "Custom business software",
      "REST APIs and third-party integrations",
      "Responsive websites and web platforms",
    ],
  },
  {
    id: "analytics-bi",
    title: "Data Analytics & Business Intelligence",
    summary: "Turning business data into clear dashboards and reports.",
    icon: BarChart3,
    items: [
      "Power BI dashboards",
      "Business intelligence solutions",
      "Data visualization and reporting",
      "Data processing and analytics",
    ],
  },
  {
    id: "databases",
    title: "Database Solutions & Consultancy",
    summary: "Well-designed databases that stay fast as your data grows.",
    icon: Database,
    items: [
      "Database design and architecture",
      "Database development and management",
      "SQL and database optimization",
      "Database consultancy and performance improvement",
      "Data management solutions",
    ],
  },
  {
    id: "automation",
    title: "Automation & Digital Solutions",
    summary: "Less manual work through connected, automated systems.",
    icon: Workflow,
    items: [
      "Business process automation",
      "Workflow automation",
      "Custom automation tools",
      "System integrations",
    ],
  },
];
