import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, useScroll, AnimatePresence, useMotionValueEvent } from "framer-motion";
import {
  Globe,
  Plus,
  AtSign,
  Star,
  FileText,
  MessageSquare,
  MoreVertical,
  Search,
  Moon,
  Box,
  Zap,
  RotateCcw,
  Lock,
  SlidersHorizontal,
  Wand2,
  Paperclip,
  ArrowUp,
  Sparkles,
  ChevronDown,
} from "lucide-react";

// Importing images for non-interactive projects
import img2 from "../assets/img2.JPG";
import photo2 from "../assets/photo2.PNG";

const MH3 = motion.h3;

// Custom Hook to detect screen width
const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    if (mql.addEventListener) {
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }
    mql.addListener(handler);
    return () => mql.removeListener(handler);
  }, [query]);

  return isMobile;
};

// Nova AI Interactive Showcase Component (Sized specifically to eliminate internal scrollbars)
function NovaAIShowcaseCard() {
  const [is3D, setIs3D] = useState(true);
  const [highGlow, setHighGlow] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef(null);

  const aiResponses = {
    react:
      "React components are modular UI building blocks. They manage state, accept props, and return JSX markup to render fast, dynamic web interfaces.",
    code: `// Async fetch example\nasync function fetchNovaData() {\n  const res = await fetch('https://api.nova-ai.io/v1/generate');\n  const data = await res.json();\n  return data;\n}`,
    ideas:
      "1. OmniSearch AI: Neural agent that synthesizes audio, video, and code.\n2. CodePulse: Automated AI PR reviewer assistant.\n3. Zenith Studio: Real-time 3D spatial world generator.",
    default:
      "Nova-Ai processes your query using advanced multi-modal contextual neural layers. How else can I assist your workflow?",
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg = { sender: "user", text };
    const lower = text.toLowerCase();

    let aiText = aiResponses.default;
    if (lower.includes("react")) aiText = aiResponses.react;
    else if (lower.includes("code") || lower.includes("fetch")) aiText = aiResponses.code;
    else if (lower.includes("idea") || lower.includes("project")) aiText = aiResponses.ideas;

    const aiMsg = { sender: "ai", text: aiText };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInputValue("");
  };

  const handleReset = () => {
    setMessages([]);
    setInputValue("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative w-full h-full bg-[#07090e] text-slate-100 flex flex-col justify-between overflow-hidden selection:bg-emerald-500 selection:text-black font-sans p-3 sm:p-5">
      {/* Background Gradients & Aurora Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(16,185,129,0.15)_0%,_rgba(20,184,166,0.08)_35%,_transparent_70%)]" />
        <div
          className={`absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full bg-emerald-500/20 blur-[80px] transition-opacity duration-700 ${
            highGlow ? "opacity-80" : "opacity-20"
          }`}
        />
        <div
          className={`absolute top-1/3 -right-20 w-[600px] h-[600px] rounded-full bg-teal-500/15 blur-[90px] transition-opacity duration-700 ${
            highGlow ? "opacity-80" : "opacity-20"
          }`}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full max-w-6xl mx-auto w-full justify-between">
        {/* TOP NAVIGATION */}
        <header className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 group cursor-pointer">
              <div className="w-7 h-7 rounded-lg bg-slate-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-all">
                <span className="font-bold text-sm font-mono">/</span>
              </div>
              <span className="font-bold text-base tracking-wide text-white">
                Nova<span className="text-emerald-400">-Ai</span>
              </span>
            </div>
            <span className="hidden md:inline-block px-2 py-0.5 text-[9px] uppercase tracking-widest font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full">
              Creativity Powerhouse
            </span>
          </div>

          <div className="flex items-center gap-2">
           <a
              href="https://ai-chatbot-kohl-six-88.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] text-slate-300 hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer"
           >
           <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium text-emerald-400">Live Demo</span>
            </a>
                    <button className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-[10px] font-medium text-slate-300 hover:border-slate-700 transition-colors cursor-pointer">
              <span>ENG</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </header>

        {/* HERO SECTION */}
        <div className="text-center max-w-2xl mx-auto my-1 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[10px] tracking-wider uppercase font-semibold shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <Sparkles className="w-3 h-3" />
            Next-Generation AI Interface Showcase
          </div>

          <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            We empower conversations to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
              inspire intelligence
            </span>
          </h1>

          <p className="text-[11px] sm:text-xs text-slate-400 max-w-lg mx-auto font-normal">
            Experience Nova-Ai — an ultra-slick, modern dark-mode AI assistant engineered for seamless workflow automation.
          </p>

          {/* CONTROL TOOLBAR */}
          <div className="pt-0.5 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setIs3D(!is3D)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500 text-black font-semibold text-[11px] hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-95 cursor-pointer"
            >
              <Box className="w-3.5 h-3.5" />
              <span>{is3D ? "Switch to Flat View" : "Switch to 3D View"}</span>
            </button>

            <button
              onClick={() => setHighGlow(!highGlow)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/90 border border-slate-700 text-slate-200 font-medium text-[11px] hover:border-emerald-500/50 transition-all active:scale-95 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Intensity: {highGlow ? "High" : "Low"}</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/90 border border-slate-700 text-slate-200 font-medium text-[11px] hover:border-emerald-500/50 transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Clear Chat</span>
            </button>
          </div>
        </div>

        {/* INTERACTIVE 3D/FLAT MOCKUP SHOWCASE */}
        <div className="w-full max-w-4xl mx-auto my-1 flex-1 flex flex-col justify-center [perspective:1400px]">
          <div
            className={`w-full rounded-xl bg-[#0d1117] border border-slate-800/80 shadow-xl overflow-hidden transition-all duration-700 ${
              is3D
                ? "[transform:rotateX(8deg)_rotateY(-4deg)] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.15)]"
                : "[transform:rotateX(0deg)] shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
            }`}
          >
            {/* Top Bar */}
            <div className="bg-[#161b22] px-3 py-1.5 border-b border-slate-800/80 flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-emerald-400" />
                  https://ai-chatbot-kohl-six-88.vercel.app
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                  v2.4 Pro Active
                </span>
              </div>
            </div>

            {/* Mockup Chat UI */}
            <div className="grid grid-cols-1 md:grid-cols-12 h-[340px] sm:h-[380px] bg-[#f8fafc] text-slate-800 font-sans">
              {/* SIDEBAR */}
              <div className="hidden md:flex md:col-span-4 lg:col-span-3 bg-white border-r border-slate-200 p-2.5 flex-col justify-between select-none">
                <div>
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <div className="w-6 h-6 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
                      <Globe className="w-3.5 h-3.5 text-slate-700" />
                    </div>
                    <span className="font-bold text-sm text-slate-900 tracking-tight">
                      Nova-Ai
                    </span>
                  </div>

                  <button
                    onClick={handleReset}
                    className="w-full py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-medium text-xs flex items-center justify-center gap-1.5 border border-slate-200/60 transition-all mb-3 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Chat</span>
                  </button>

                  <div className="space-y-0.5 mb-3">
                    <div className="px-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Menu
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 rounded-md text-[11px] font-medium text-slate-600 hover:bg-slate-100 cursor-pointer">
                      <AtSign className="w-3 h-3 text-slate-400" />
                      <span>Market Daily</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 rounded-md text-[11px] font-medium text-slate-600 hover:bg-slate-100 cursor-pointer">
                      <Star className="w-3 h-3 text-slate-400" />
                      <span>My Portfolio</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 rounded-md text-[11px] font-medium text-slate-600 hover:bg-slate-100 cursor-pointer">
                      <FileText className="w-3 h-3 text-slate-400" />
                      <span>My Project</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between px-1 mb-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                        Recent
                      </span>
                      <span className="text-[8px] bg-slate-100 text-slate-500 px-1 py-0.2 rounded-full font-medium">
                        {messages.length > 0 ? "2" : "0"}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-100 text-[11px] text-slate-800 font-medium cursor-pointer">
                        <MessageSquare className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <div className="truncate">
                          <p className="truncate leading-none">what is component...</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-50 text-[11px] text-slate-600 cursor-pointer">
                        <MessageSquare className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <div className="truncate">
                          <p className="truncate leading-none">Explain React</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/80">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Sparkles className="w-3 h-3 text-slate-700" />
                      <span className="text-[11px] font-semibold text-slate-800">Upgrade AI</span>
                    </div>
                    <button className="w-full py-1 bg-slate-900 hover:bg-black text-white text-[10px] font-medium rounded transition-colors cursor-pointer mt-1">
                      Upgrade
                    </button>
                  </div>

                  <div className="flex items-center justify-between px-2 py-1 rounded-lg bg-slate-100 border border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center font-semibold text-[9px]">
                        Y
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-slate-800 leading-none">You</p>
                      </div>
                    </div>
                    <MoreVertical className="w-3 h-3 text-slate-400 cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* MAIN CHAT SCREEN */}
              <div className="md:col-span-8 lg:col-span-9 bg-[#fbfcfd] flex flex-col justify-between relative overflow-hidden">
                <div className="p-2.5 bg-white/80 backdrop-blur border-b border-slate-100 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        Nova Ai
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </h3>
                      <p className="text-[9px] text-emerald-600 font-medium leading-none">Online</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Search className="w-3.5 h-3.5 cursor-pointer hover:text-slate-700" />
                    <Moon className="w-3.5 h-3.5 cursor-pointer hover:text-slate-700" />
                    <div className="w-5 h-5 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center font-medium text-[9px]">Y</div>
                  </div>
                </div>

                {/* Chat Messages / Welcome Hero */}
                <div
                  ref={chatContainerRef}
                  className="flex-1 p-3 overflow-y-auto flex flex-col justify-center items-center text-center max-w-xl mx-auto w-full space-y-3"
                >
                  {messages.length === 0 ? (
                    <div className="space-y-3 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-800">
                        <Globe className="w-5 h-5" />
                      </div>

                      <div className="space-y-1">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                          Hey, I'm <span className="text-emerald-500">Nova.</span> How can I help today?
                        </h2>
                        <p className="text-[10px] sm:text-[11px] text-slate-400 max-w-xs mx-auto">
                          Ask me anything about coding, ideas, or writing.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                        {[
                          { label: "Explain React", text: "Explain React components simply" },
                          { label: "Write code", text: "Write a modern JavaScript fetch example" },
                          { label: "Project ideas", text: "Give me 3 innovative AI startup project ideas" },
                        ].map((promptItem) => (
                          <button
                            key={promptItem.label}
                            onClick={() => handleSendMessage(promptItem.text)}
                            className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-[10px] font-medium text-slate-700 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            {promptItem.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full space-y-2 text-left">
                      {messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${
                            msg.sender === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-xl text-[11px] max-w-[85%] whitespace-pre-wrap ${
                              msg.sender === "user"
                                ? "bg-slate-900 text-white font-normal"
                                : "bg-white border border-slate-200 text-slate-800 shadow-xs"
                            }`}
                          >
                            {msg.sender === "ai" && (
                              <div className="font-semibold text-[9px] text-emerald-600 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                                Nova-Ai
                              </div>
                            )}
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Input Bar */}
                <div className="p-2.5 bg-white/90 border-t border-slate-100">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="relative bg-white rounded-xl border border-slate-200/90 shadow-xs p-2 focus-within:border-emerald-500/80 transition-all"
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask anything..."
                      className="w-full bg-transparent border-0 outline-none text-xs text-slate-800 placeholder-slate-400 pb-5 px-1"
                    />

                    <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button type="button" className="w-5 h-5 rounded hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors cursor-pointer">
                          <Plus className="w-3 h-3" />
                        </button>

                        <button type="button" className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-medium hover:bg-slate-200/70 transition-colors cursor-pointer">
                          <SlidersHorizontal className="w-2.5 h-2.5" />
                          <span>Auto</span>
                        </button>

                        <button type="button" className="w-5 h-5 rounded hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors cursor-pointer">
                          <Wand2 className="w-3 h-3" />
                        </button>

                        <button type="button" className="w-5 h-5 rounded hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors cursor-pointer">
                          <Paperclip className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="w-5 h-5 rounded bg-slate-900 hover:bg-emerald-500 hover:text-black text-white flex items-center justify-center transition-all cursor-pointer"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING GLASS FOOTER */}
        <footer className="pt-1 flex justify-center">
          <div className="flex items-center gap-1 sm:gap-2 px-3 py-1 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-[0_5px_15px_rgba(0,0,0,0.8)] text-[11px] text-slate-300">
            <span className="px-2 py-0.5 rounded-lg font-bold text-white bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center gap-0.5">
              <span className="text-emerald-400 font-mono">/</span>Home
            </span>
            <span className="px-2 py-0.5 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">
              Studio
            </span>
            <span className="px-2 py-0.5 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">
              Work
            </span>
            <span className="px-2 py-0.5 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">
              Services
            </span>
            <span className="px-2 py-0.5 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">
              Contact
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

// MAIN PROJECTS WRAPPER
export default function Projects() {
  const isMobile = useIsMobile();

  const projects = useMemo(
    () => [
      {
        title: "Ai Chatbot",
        link: "https://github.com/Shashannkkp/Ai-Chatbot.git",
        bgColor: "#07090e",
        type: "interactive",
      },
      {
        title: "CodeLens Ai",
        link: "https://github.com/Shashannkkp/codelens-ai.git",
        bgColor: "#3884d3",
        image: isMobile ? photo2 : img2,
        type: "image",
      },
    ],
    [isMobile]
  );

  const sceneRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = useMemo(
    () => projects.map((_, i) => (i + 1) / projects.length),
    [projects]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const idx = thresholds.findIndex((threshold) => progress <= threshold);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <h2
          className={`text-2xl sm:text-3xl font-semibold z-10 text-center ${
            isMobile ? "mt-1" : "mt-4"
          }`}
        >
          My Work
        </h2>

        <div
          className={`relative w-full flex-1 flex items-center justify-center ${
            isMobile ? "-mt-2" : ""
          }`}
        >
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx
                  ? "opacity-100 z-20 pointer-events-auto"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
              style={{ width: "95%", maxWidth: "1280px" }}
            >
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <MH3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center text-[clamp(1.8rem,5vw,4.5rem)] text-white/95 sm:absolute sm:-top-14 sm:left-[35%] lg:left-[-2%] sm:mb-0 font-bangers italic font-semibold ${
                      isMobile ? "-mt-8" : ""
                    }`}
                    style={{
                      zIndex: 30,
                      textAlign: isMobile ? "center" : "left",
                    }}
                  >
                    {project.title}
                  </MH3>
                )}
              </AnimatePresence>

              {/* Display Card Container (Height balanced at 82vh to avoid vertical scrolling) */}
              <div
                className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${
                  isMobile ? "mb-4 rounded-lg" : "mb-6 rounded-xl"
                } h-[78vh] sm:h-[82vh]`}
                style={{ zIndex: 10 }}
              >
                {project.type === "interactive" ? (
                  <NovaAIShowcaseCard />
                ) : (
                  <>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl"
                      loading="lazy"
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        zIndex: 11,
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View Project Action Button */}
        <div className={`absolute z-30 ${isMobile ? "bottom-6" : "bottom-3"}`}>
          <a
            href={activeProject?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all shadow-lg text-xs sm:text-sm"
            aria-label={`View ${activeProject?.title}`}
          >
            View Live Project
          </a>
        </div>
      </div>
    </section>
  );
}