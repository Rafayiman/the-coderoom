import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  RotateCcw,
  Minimize2,
} from "lucide-react";
import { site, whatsappUrl, mailto } from "@/config/site";
import { projects } from "@/config/projects";
import { services } from "@/config/services";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  actions?: { label: string; url?: string; to?: string; isWhatsApp?: boolean }[];
  timestamp: string;
};

const initialMessages: Message[] = [
  {
    id: "welcome",
    sender: "bot",
    text: "Hello! 👋 I'm **The CodeRoom Assistant**. How can I help you today? You can ask me about our services, tech stack, past live projects, or how to start working with us.",
    actions: [
      { label: "Our Services", to: "/services" },
      { label: "View Projects", to: "/projects" },
      { label: "Chat on WhatsApp", isWhatsApp: true },
    ],
    timestamp: "Just now",
  },
];

const quickQuestions = [
  "What services do you offer?",
  "Tell me about your AI & ML work",
  "Show me live projects you built",
  "How does your development process work?",
  "How can I get in touch or request a quote?",
];

function getBotResponse(rawQuery: string): {
  text: string;
  actions?: { label: string; url?: string; to?: string; isWhatsApp?: boolean }[];
} {
  const q = rawQuery.toLowerCase().trim();

  // Greeting
  if (/^(hi|hello|hey|greetings|hola|salam|assalam)/.test(q)) {
    return {
      text: "Hello! Great to meet you. I can answer questions regarding The CodeRoom's engineering capabilities, software development, AI solutions, or connect you directly with our leads.",
      actions: [
        { label: "Explore Services", to: "/services" },
        { label: "See Live Work", to: "/projects" },
        { label: "Contact Us", to: "/contact" },
      ],
    };
  }

  // Smart Fitness Wear specific query
  if (q.includes("smart fitness") || q.includes("fitness wear") || q.includes("apparel")) {
    return {
      text: "**Smart Fitness Wear** is a full e-commerce storefront and custom team-wear enquiry application built by The CodeRoom. It features product filtering, custom enquiries, and dynamic review walls.\n\n• **Stack**: React, TypeScript, Tailwind CSS, Supabase, PostgreSQL\n• **Status**: Live in production",
      actions: [
        { label: "Open Smart Fitness Wear", url: "https://smart-fitness-wear.vercel.app/" },
        { label: "All Projects", to: "/projects" },
      ],
    };
  }

  // BinderDocs / Legal / RAG
  if (q.includes("binder") || q.includes("document") || q.includes("rag")) {
    return {
      text: "**BinderDocs** is an AI-powered document automation platform developed by The CodeRoom. It incorporates vector-based RAG search, multi-step workflow orchestration, and digital e-signatures.\n\n• **Stack**: .NET 9, Angular, Qdrant Vector Search",
      actions: [
        { label: "Open BinderDocs Live", url: "https://binder-docs-frontend.vercel.app/" },
        { label: "AI & ML Services", to: "/services" },
      ],
    };
  }

  // Blueprint Manager
  if (q.includes("blueprint") || q.includes("construction") || q.includes("aec")) {
    return {
      text: "**Blueprint Manager** is an enterprise project management platform for architecture and engineering firms. It delivers interactive Gantt charts, Kanban boards, budget auditing, and resource scheduling.\n\n• **Stack**: Angular, Azure Cloud Infrastructure",
      actions: [
        { label: "Open Blueprint Manager", url: "https://blueprint-frontend-seven.vercel.app/" },
        { label: "Web & Software Services", to: "/services" },
      ],
    };
  }

  // LoveDoner POS
  if (q.includes("lovedoner") || q.includes("pos") || q.includes("restaurant") || q.includes("franchise")) {
    return {
      text: "**LoveDoner POS** is a cloud-based point-of-sale and franchise operations platform managing real-time orders, kitchen displays, automated inventory tracking, and supply chain sync.\n\n• **Stack**: Angular, Azure Cloud",
      actions: [
        { label: "Open LoveDoner POS", url: "https://love-doner.vercel.app/" },
        { label: "View All Projects", to: "/projects" },
      ],
    };
  }

  // TradeCrawler
  if (q.includes("tradecrawler") || q.includes("trade crawler") || q.includes("crawler") || q.includes("scraper") || q.includes("lead")) {
    return {
      text: "**TradeCrawler** is an AI-driven B2B lead intelligence engine that autonomously scrapes, extracts, and identifies international buyers and suppliers across commercial marketplaces.\n\n• **Stack**: Python, FastAPI, AI Data Pipeline",
      actions: [
        { label: "Open TradeCrawler", url: "https://trade-crawler-frontend.vercel.app/" },
        { label: "Explore Projects", to: "/projects" },
      ],
    };
  }

  // General Projects / Portfolio
  if (q.includes("project") || q.includes("portfolio") || q.includes("work") || q.includes("example") || q.includes("client")) {
    return {
      text: `The CodeRoom has delivered **${projects.length}+ live applications** across AI & ML, enterprise software, and e-commerce.\n\nHighlights include:\n• **BinderDocs**: AI document intelligence & RAG\n• **Blueprint Manager**: Architecture & construction ERP\n• **LoveDoner POS**: Multi-branch cloud POS system\n• **TradeCrawler**: B2B automated marketplace intelligence\n• **Smart Fitness Wear**: Modern e-commerce platform`,
      actions: [
        { label: "Explore All Projects", to: "/projects" },
        { label: "Request a Proposal", to: "/contact" },
      ],
    };
  }

  // AI & Machine Learning Services
  if (q.includes("ai") || q.includes("machine learning") || q.includes("llm") || q.includes("gpt") || q.includes("vision") || q.includes("nlp")) {
    return {
      text: "Our **AI & Machine Learning** practice builds practical production systems:\n\n• **RAG & Knowledge Bases**: Vector search over your proprietary documents (Qdrant, Pinecone)\n• **Autonomous AI Agents**: Workflow automation & multi-agent execution\n• **Computer Vision**: Real-time object recognition and medical diagnostic models (e.g. Malaria Detector)\n• **LLM Integrations**: Fine-tuning and API integration (OpenAI, DeepSeek, Claude)",
      actions: [
        { label: "View AI Services", to: "/services" },
        { label: "Schedule AI Discovery", to: "/contact" },
      ],
    };
  }

  // Web & Full-Stack Development
  if (q.includes("web") || q.includes("software") || q.includes("frontend") || q.includes("backend") || q.includes("app")) {
    return {
      text: "We engineer full-stack web applications designed for reliability, fast load times, and scalability:\n\n• **Frontend**: React, Next.js, Angular, TypeScript, Tailwind CSS\n• **Backend**: .NET 9, Node.js, Python FastAPI, RESTful & GraphQL APIs\n• **Systems**: Multi-tenant portals, custom ERP/CRM tooling, and high-concurrency dashboards",
      actions: [
        { label: "Learn About Web Development", to: "/services" },
        { label: "View Live Sites", to: "/projects" },
      ],
    };
  }

  // Database & Cloud
  if (q.includes("database") || q.includes("sql") || q.includes("postgres") || q.includes("azure") || q.includes("cloud") || q.includes("supabase")) {
    return {
      text: "Our **Database & Cloud Architecture** practice ensures your data remains fast, consistent, and secure under high traffic:\n\n• PostgreSQL, SQL Server, Supabase, Redis caching\n• Query optimization, indexing strategies, and zero-downtime migrations\n• Azure and Docker infrastructure provisioning",
      actions: [
        { label: "Database Services", to: "/services" },
        { label: "Talk to an Architect", to: "/contact" },
      ],
    };
  }

  // Analytics & BI
  if (q.includes("analytics") || q.includes("bi") || q.includes("power bi") || q.includes("dashboard") || q.includes("reporting")) {
    return {
      text: "We build **Business Intelligence & Analytics** pipelines that transform raw operational metrics into actionable executive dashboards:\n\n• Interactive Power BI reporting suites\n• Automated ETL processing and telemetry pipelines\n• KPI tracking and revenue reconciliation",
      actions: [
        { label: "See BI Capabilities", to: "/services" },
        { label: "Contact Us", to: "/contact" },
      ],
    };
  }

  // General Services
  if (q.includes("service") || q.includes("offer") || q.includes("what do you do") || q.includes("capabilities")) {
    return {
      text: "The CodeRoom provides end-to-end engineering across 5 core areas:\n\n1. **AI & Machine Learning** (RAG, agent workflows, computer vision)\n2. **Web & Software Development** (React, Next.js, .NET 9, Angular)\n3. **Automation & Workflows** (Custom scrapers, background pipelines)\n4. **Database Solutions** (Postgres, Supabase, Azure, Redis)\n5. **Data Analytics & BI** (Power BI dashboards, operational analytics)",
      actions: [
        { label: "Explore Detailed Services", to: "/services" },
        { label: "Get in Touch", to: "/contact" },
      ],
    };
  }

  // Process & Methodology
  if (q.includes("process") || q.includes("methodology") || q.includes("how do you work") || q.includes("step") || q.includes("stage")) {
    return {
      text: "We follow a transparent 5-stage engineering delivery lifecycle:\n\n1. **Discovery & Architecture**: Requirements, database schema, API contracts\n2. **Interactive Prototyping**: Wireframes and technical proof-of-concept\n3. **Agile Sprints**: 2-week iteration cycles with weekly demos\n4. **Stress Testing & QA**: Security audits, load testing, browser verification\n5. **Launch & Long-Term Care**: Cloud deployment, full IP handover, SLA maintenance",
      actions: [
        { label: "Read Our Methodology", to: "/services" },
        { label: "Start Discovery", to: "/contact" },
      ],
    };
  }

  // Code Ownership & IP
  if (q.includes("ownership") || q.includes("ip") || q.includes("source code") || q.includes("contract")) {
    return {
      text: "**100% Client Ownership**: You retain full intellectual property and source code ownership upon project completion. There is no vendor lock-in, and all repositories, build scripts, and keys are handed over completely.",
      actions: [
        { label: "Read Our Philosophy", to: "/about" },
        { label: "Let's Talk", to: "/contact" },
      ],
    };
  }

  // Pricing, Cost & Timeline
  if (q.includes("price") || q.includes("cost") || q.includes("timeline") || q.includes("quote") || q.includes("rate") || q.includes("budget") || q.includes("how much") || q.includes("how long")) {
    return {
      text: "Every project is scoped individually based on complexity, architectural tiers, and timeline:\n\n• **Discovery kickoff**: Usually within 3 to 5 business days\n• **Sprints**: 2-week agile delivery cycles\n• **Budget ranges**: Projects typically range from agile MVPs ($2.5k–$5k) to enterprise platforms ($15k+)\n\nWe provide fixed-scope estimates or dedicated sprint teams.",
      actions: [
        { label: "Request an Estimate", to: "/contact" },
        { label: "Chat on WhatsApp", isWhatsApp: true },
      ],
    };
  }

  // Contact / WhatsApp / Phone / Email
  if (q.includes("contact") || q.includes("whatsapp") || q.includes("phone") || q.includes("call") || q.includes("email") || q.includes("hire") || q.includes("reach") || q.includes("talk")) {
    return {
      text: `You can reach our engineering team directly through any of these channels:\n\n• **Email**: ${site.contact.email}\n• **WhatsApp Hotline**: ${site.contact.phones[0].display}\n• **Additional Lines**: ${site.contact.phones[1].display} / ${site.contact.phones[2].display}\n• **Average Response**: Under 15 minutes on WhatsApp`,
      actions: [
        { label: "Open WhatsApp Chat", isWhatsApp: true },
        { label: "Contact Form", to: "/contact" },
      ],
    };
  }

  // Tech Stack
  if (q.includes("stack") || q.includes("technology") || q.includes("technologies") || q.includes("tools") || q.includes("languages")) {
    return {
      text: "Our core engineering tech stack includes:\n\n• **Frontend**: React, Next.js, Angular, TypeScript, Tailwind CSS\n• **Backend**: Python (FastAPI), .NET 9, Node.js, REST & GraphQL\n• **AI/ML**: PyTorch, Qdrant, LangChain, OpenAI, DeepSeek\n• **Data & Cloud**: PostgreSQL, Supabase, Azure, Redis, Docker, Power BI",
      actions: [
        { label: "See Our Stack", to: "/about" },
        { label: "Explore Projects", to: "/projects" },
      ],
    };
  }

  // Fallback for queries outside known scope
  return {
    text: "I might not have the specific answer to that in my quick guide, but our senior software architects can answer all technical details, custom requirements, and feasibility questions directly!",
    actions: [
      { label: "Chat on WhatsApp", isWhatsApp: true },
      { label: "Submit an Inquiry", to: "/contact" },
      { label: "Email Engineering", url: mailto("Project Inquiry from Chatbot") },
    ],
  };
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate realistic typing response time (500ms - 800ms)
    setTimeout(() => {
      const resp = getBotResponse(query);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: resp.text,
        actions: resp.actions,
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 650);
  };

  const handleReset = () => {
    setMessages(initialMessages);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-5 right-5 z-50">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open The CodeRoom Live Assistant"
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_30px_rgba(99,102,241,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_12px_36px_rgba(99,102,241,0.7)]"
          >
            {/* Pulsing indicator ring */}
            <span className="animate-pulse-ring absolute inset-0 rounded-full bg-primary/40 -z-10" />

            {/* Unread badge */}
            {hasUnread && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-mint text-[9px] font-bold text-black shadow-xs">
                1
              </span>
            )}

            <MessageSquare className="h-6 w-6 transition-transform group-hover:scale-110" />
          </button>
        )}
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-border/80 bg-[#0e1017] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-rise">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/70 bg-[#141622] px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Bot className="h-5 w-5" />
                <span className="pulse-dot absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-mint" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-foreground">
                  The CodeRoom Assistant
                </h3>
                <p className="font-mono-tech text-[10px] text-muted-foreground flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                  Online • Software & AI Knowledge
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleReset}
                title="Restart Conversation"
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-surface hover:text-foreground transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-surface hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="hide-scrollbar flex-1 overflow-y-auto p-4 space-y-4 max-h-[420px] min-h-[300px]">
            {messages.map((m) => {
              const isBot = m.sender === "bot";
              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${isBot ? "items-start" : "items-end justify-end"}`}
                >
                  {isBot && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary border border-primary/30 text-xs">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed ${
                      isBot
                        ? "bg-[#181a26] border border-border/80 text-foreground/90 shadow-xs"
                        : "bg-primary text-primary-foreground font-medium rounded-br-xs shadow-sm"
                    }`}
                  >
                    {/* Render message with line breaks and markdown bolding */}
                    <div className="whitespace-pre-line space-y-1">
                      {m.text.split("\n").map((paragraph, idx) => {
                        // Bold formatter
                        const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                        return (
                          <p key={idx}>
                            {parts.map((part, pIdx) => {
                              if (part.startsWith("**") && part.endsWith("**")) {
                                return (
                                  <strong key={pIdx} className="font-bold text-foreground">
                                    {part.slice(2, -2)}
                                  </strong>
                                );
                              }
                              return part;
                            })}
                          </p>
                        );
                      })}
                    </div>

                    {/* Quick action buttons attached to bot messages */}
                    {m.actions && m.actions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
                        {m.actions.map((act) => {
                          if (act.isWhatsApp) {
                            return (
                              <a
                                key={act.label}
                                href={whatsappUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-semibold text-emerald-400 hover:bg-emerald-500/25 transition-colors"
                              >
                                <MessageCircle className="h-3 w-3" />
                                <span>{act.label}</span>
                              </a>
                            );
                          }
                          if (act.to) {
                            return (
                              <Link
                                key={act.label}
                                to={act.to}
                                onClick={() => setIsOpen(false)}
                                className="inline-flex items-center gap-1 rounded-lg bg-surface border border-border px-2.5 py-1 text-[11px] font-semibold text-foreground/80 hover:text-primary hover:border-primary transition-colors"
                              >
                                <span>{act.label}</span>
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            );
                          }
                          if (act.url) {
                            return (
                              <a
                                key={act.label}
                                href={act.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-lg bg-surface border border-border px-2.5 py-1 text-[11px] font-semibold text-foreground/80 hover:text-primary hover:border-primary transition-colors"
                              >
                                <span>{act.label}</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground animate-rise">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Sparkles className="h-3.5 w-3.5 animate-spin" />
                </div>
                <div className="rounded-2xl bg-[#181a26] border border-border/70 px-3.5 py-2 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions pills (shown when messages count is low) */}
          {messages.length <= 2 && (
            <div className="border-t border-border/50 bg-[#11131c] px-3 py-2">
              <p className="font-mono-tech text-[10px] text-muted-foreground mb-1.5">
                Suggested questions:
              </p>
              <div className="flex gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSend(q)}
                    className="shrink-0 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground/80 hover:border-primary hover:text-primary transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-border/70 bg-[#141622] p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, stack, services..."
              className="flex-1 rounded-xl border border-border/80 bg-surface/80 px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground disabled:opacity-40 transition-transform active:scale-95"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
