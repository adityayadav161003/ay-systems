"use client"

import SectionWrapper from "@/components/SectionWrapper"
import { AnimatePresence, motion } from "framer-motion"
import { ExternalLink, Github, Sparkles } from "lucide-react"
import { useEffect, useMemo, useState, type ReactNode } from "react"

const projects = [
  {
    id: 1,
    title: "Orvika AI — Privacy-First Research Assistant",
    description:
      "A privacy-first AI assistant designed for secure document analysis, research augmentation, and intelligent knowledge retrieval using Retrieval-Augmented Generation.",
    impact: "Flagship Project · Generative AI",
    tech: ["Python", "LangChain", "FAISS", "RAG", "LLMs", "NLP", "Vector Databases", "Tauri", "React"],
    highlights: [
      { label: "Built", text: "Retrieval-Augmented Generation (RAG) architecture supporting PDF, DOCX, PPTX, TXT, audio, and video analysis." },
      { label: "Privacy", text: "Sensitive documents never leave the user's device — privacy-first local AI reasoning combined with cloud-based research workflows." },
      { label: "Impact", text: "Generates grounded, citation-backed insights from large document collections for researchers, analysts, and organizations handling confidential data." },
    ],
    links: [{ kind: "private", label: "Private Repo — demo available" }],
    deepDive: {
      problem:
        "Professionals and researchers handling sensitive documents need AI-powered analysis without compromising data privacy. Existing cloud-based AI tools require uploading confidential files to external servers — an unacceptable risk for many organizations.",
      approach:
        "Built a privacy-first RAG architecture where document processing and vector retrieval happen entirely on the user's device using FAISS and local LLM reasoning. Cloud workflows are only triggered for non-sensitive research augmentation tasks, keeping confidential data local at all times.",
      flow: [
        "Document ingestion (PDF, DOCX, PPTX, TXT, audio, video)",
        "Chunking and embedding generation (local)",
        "FAISS vector index construction and storage",
        "Semantic search and context retrieval",
        "LLM reasoning with citation-backed response generation",
        "Privacy-isolated local inference for sensitive queries",
      ],
      results: [
        "Privacy-first architecture ensuring sensitive documents never leave the user's device.",
        "Supports multi-format document analysis including audio and video transcription.",
        "Generates grounded, citation-backed insights from large document collections.",
        "Designed for production-scale use by researchers, analysts, and organizations.",
      ],
      tradeoffs: [
        "Prioritized privacy and local processing over cloud-based performance optimizations.",
        "Chose FAISS for efficient local vector retrieval over managed vector database services.",
      ],
      challenges: [
        "Designing a hybrid local/cloud architecture that maintains strict privacy boundaries.",
        "Optimizing retrieval quality across heterogeneous document types and formats.",
      ],
      next: [
        "Add multi-document cross-referencing and knowledge graph construction.",
        "Implement fine-tuned domain-specific embedding models for specialized research fields.",
      ],
    },
    featured: true,
  },
  {
    id: 2,
    title: "GestureWave AI — Touch-Free Gesture Control",
    description:
      "A real-time computer vision application enabling touch-free interaction through hand gesture recognition powered by MediaPipe and OpenCV.",
    impact: "Computer Vision · Real-time interaction",
    tech: ["Python", "OpenCV", "MediaPipe", "Machine Learning", "Computer Vision"],
    highlights: [
      { label: "Built", text: "Real-time hand tracking and gesture classification pipeline optimized for 20–25 FPS low-latency interaction." },
      { label: "Focus", text: "Stability, latency optimization, and clean gesture-to-action mapping with smoothing and debouncing." },
      { label: "Ownership", text: "Implemented the full CV pipeline, gesture recognition logic, and interaction system end-to-end." },
    ],
    links: [{ kind: "private", label: "Private Repo — demo available" }],
    deepDive: {
      problem:
        "Build a touch-free interaction prototype that feels genuinely responsive in real time — not just a computer vision demo, but a practical touchless control system.",
      approach:
        "Used MediaPipe for robust hand landmark detection, extracted gesture signals from relative landmark positions, and applied smoothing and debouncing to ensure stable, jitter-free action mapping at real-time frame rates.",
      flow: [
        "Webcam frame capture",
        "Hand landmark detection (MediaPipe)",
        "Gesture feature extraction (relative positions / thresholds)",
        "Smoothing + debouncing pipeline",
        "Gesture → action mapping",
        "Real-time feedback loop (20–25 FPS target)",
      ],
      results: [
        "Real-time gesture recognition loop at ~20–25 FPS under typical conditions.",
        "Stable touchless interaction patterns via smoothing and threshold calibration.",
        "Practical touchless system control demonstrating real-world computer vision deployment.",
      ],
      tradeoffs: [
        "Chose a focused gesture set for reliability and stability over supporting many complex gestures.",
        "Optimized for responsiveness and consistent UX rather than maximum classification accuracy.",
      ],
      challenges: ["Handling jittery landmark detections in varied lighting conditions.", "Balancing gesture sensitivity vs false trigger rate."],
      next: ["Add per-user calibration mode for personalized gesture sensitivity.", "Add a lightweight model-based gesture classifier for ambiguous cases."],
    },
    featured: false,
  },
  {
    id: 3,
    title: "Netflix Content Intelligence",
    description:
      "End-to-end exploratory analysis of Netflix's global content library — distribution patterns, top content-producing countries, genre trends, and content growth over time.",
    impact: "Data Analysis · EDA",
    tech: ["Python", "Pandas", "Seaborn", "Matplotlib", "Jupyter"],
    highlights: [
      { label: "Built", text: "Real insight extraction from Netflix's public dataset using systematic EDA techniques." },
      { label: "Outcome", text: "Discovered content distribution patterns and growth trends with clear visual storytelling." },
      { label: "Focus", text: "Data-driven analysis over toy demos — extracting meaning from messy real-world data." },
    ],
    links: [
      { kind: "github", href: "https://github.com/adityayadav161003/Netflix-Data-Analysis", label: "Repo" },
    ],
    deepDive: {
      problem:
        "Public datasets are everywhere but deep analysis work is rare. I wanted to practice systematic EDA on a real, interesting dataset: Netflix's global content library.",
      approach:
        "Load the dataset, understand distributions, identify trends, and visualize patterns that matter: which countries produce most content, genre popularity shifts, impact of releases over time.",
      flow: [
        "Data load + exploration (shape, columns, nulls)",
        "Distribution analysis (content types, genres, countries)",
        "Time-series trends (when content added over time)",
        "Geographic insights (top-producing countries)",
        "Growth patterns and content strategy shifts",
      ],
      results: [
        "Clear visualization of content distribution across countries and genres.",
        "Identified growth trends in Netflix's library over multiple years.",
        "Demonstrated impact of regional content strategies through data.",
      ],
      tradeoffs: ["Focused on visualization clarity over advanced statistical modeling.", "Public dataset so analysis reflects publicly available information."],
      challenges: ["Handling missing or inconsistent data in real public datasets.", "Finding coherent narratives in raw multi-dimensional data."],
      next: ["Add predictive model for future content trends.", "Extend analysis to IMDb ratings correlation."],
    },
    featured: false,
  },
  {
    id: 4,
    title: "IPL Cricket Performance Analytics",
    description:
      "Deep analysis of IPL datasets — player performance metrics, run scorers, wicket takers, team statistics, and toss impact. Real-world sports data wrangling and insight storytelling.",
    impact: "Sports Analytics · Data Engineering",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib"],
    highlights: [
      { label: "Built", text: "Complete pipeline: raw data → cleaning → analysis → insights on player and team performance." },
      { label: "Outcome", text: "Discovered hidden patterns in cricket strategy: toss impact, batting order effectiveness, bowler consistency." },
      { label: "Focus", text: "Real data engineering: messy cricket stats → structured analysis → actionable insights." },
    ],
    links: [
      { kind: "github", href: "https://github.com/adityayadav161003/IPL-Data-Analytics", label: "Repo" },
    ],
    deepDive: {
      problem:
        "Sports data analysis requires both engineering (data cleaning) and storytelling (finding patterns). I wanted to practice both on real IPL datasets.",
      approach:
        "Ingest raw cricket data, standardize formats, calculate performance metrics (strike rate, bowling economy, team stats), and visualize patterns to find strategic insights.",
      flow: [
        "Raw IPL data ingestion",
        "Data cleaning + standardization",
        "Player-level metrics (runs, wickets, consistency)",
        "Team statistics aggregation",
        "Pattern discovery (toss, batting order, performance trends)",
        "Visualization + narrative storytelling",
      ],
      results: [
        "Identified top run-scorers and wicket-takers across seasons.",
        "Quantified toss impact on match outcomes with data evidence.",
        "Discovered patterns in team performance and strategic decisions.",
      ],
      tradeoffs: ["Focused on clarity for sports analysts over advanced ML modeling.", "Public datasets with known collection biases accounted for."],
      challenges: ["Handling inconsistent data formats across different IPL seasons.", "Normalizing player metrics across different eras of the league."],
      next: ["Add predictive model for match outcome prediction.", "Build interactive dashboard for real-time trend exploration."],
    },
    featured: false,
  },
]

type ProjectLink =
  | { kind: "github" | "demo"; href: string; label: string }
  | { kind: "private"; label: string }
type ProjectHighlight = { label: string; text: string }
type ProjectDeepDive = {
  problem: string
  approach: string
  flow: string[]
  results: string[]
  tradeoffs: string[]
  challenges: string[]
  next: string[]
}

export default function Projects() {
  const [activeId, setActiveId] = useState<number | null>(null)
  const activeProject = useMemo(() => projects.find((p) => p.id === activeId) ?? null, [activeId])

  useEffect(() => {
    if (!activeProject) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [activeProject])

  return (
    <SectionWrapper id="projects" plain noPadding>
      <div className="space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-blue-400 font-bold tracking-[0.2em] uppercase text-xs">
              <Sparkles size={16} />
              <span>Selected Works</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
              Featured <span className="text-white/40 italic">Projects.</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
              Four builds that show how I work: privacy-first Generative AI, real-time computer vision, and real-world data analysis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative p-8 md:p-12 rounded-[2.5rem] border transition-all duration-700 overflow-hidden flex flex-col justify-between ${
                project.featured 
                  ? 'md:col-span-2 border-white/20 bg-gradient-to-br from-white/[0.05] to-transparent shadow-[0_0_80px_rgba(255,255,255,0.02)]' 
                  : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
              }`}
            >
              {/* Animated Glow Border */}
              <div className="absolute inset-0 p-px bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-blue-500/20 transition-all duration-1000" />
              
              {project.featured && (
                <div className="absolute top-8 right-8 px-4 py-1.5 rounded-full bg-blue-500 text-white text-[10px] font-black tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  Flagship
                </div>
              )}
              
              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase">
                      {project.impact}
                    </p>
                    <h3 className={`font-black tracking-tight text-white group-hover:text-blue-400 transition-colors duration-500 ${project.featured ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                      {project.title}
                    </h3>
                  </div>
                  <p className={`text-gray-400 leading-relaxed ${project.featured ? 'text-lg md:text-xl max-w-3xl' : 'text-sm md:text-base'}`}>
                    {project.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    {(project.highlights as ProjectHighlight[]).map((h) => (
                      <div key={h.label} className="text-sm text-gray-500 leading-relaxed">
                        <span className="text-white/80 font-black tracking-tight">{h.label}:</span>{" "}
                        <span className="text-gray-400">{h.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.tech.map((t) => (
                      <span key={t} className="px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-xl border border-white/10 bg-white/5 text-gray-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all duration-500">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 pt-4">
                  <button
                    onClick={() => setActiveId(project.id)}
                    className="flex items-center gap-2 text-xs md:text-sm font-bold text-white uppercase tracking-widest hover:text-blue-400 transition-colors duration-300 group/link"
                  >
                    <ExternalLink size={18} className="group-hover/link:scale-110 transition-transform" />
                    Deep Dive
                  </button>

                  {(project.links as ProjectLink[]).map((link) => {
                    if (link.kind === "private") {
                      return (
                        <div
                          key={`${project.id}-${link.kind}`}
                          className="flex items-center gap-2 text-xs md:text-sm font-bold text-white/55 uppercase tracking-widest"
                        >
                          <Github size={18} className="opacity-70" />
                          {link.label}
                        </div>
                      )
                    }

                    return (
                      <a
                        key={`${project.id}-${link.kind}`}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-xs md:text-sm font-bold text-white uppercase tracking-widest hover:text-blue-400 transition-colors duration-300 group/link"
                      >
                        {link.kind === "github" ? (
                          <Github size={18} className="group-hover/link:scale-110 transition-transform" />
                        ) : (
                          <ExternalLink size={18} className="group-hover/link:scale-110 transition-transform" />
                        )}
                        {link.label}
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] group-hover:bg-blue-600/10 transition-all duration-1000" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80]"
            aria-modal="true"
            role="dialog"
          >
            <button
              onClick={() => setActiveId(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              aria-label="Close"
            />

            <div className="absolute inset-0 px-4 py-10 md:py-16 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.985 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-4xl mx-auto rounded-[2.75rem] border border-white/10 bg-[#050505]/80 backdrop-blur-3xl shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "radial-gradient(1200px circle at 20% 0%, rgba(59,130,246,0.16), transparent 55%)" }} />
                <div className="relative z-10 p-8 md:p-12 space-y-10">
                  <div className="flex items-start justify-between gap-8">
                    <div className="space-y-3">
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
                        Project Deep Dive
                      </div>
                      <div className="text-3xl md:text-5xl font-black tracking-tight text-white">{activeProject.title}</div>
                      <div className="text-white/65 text-base md:text-lg leading-relaxed">{activeProject.description}</div>
                    </div>
                    <button
                      onClick={() => setActiveId(null)}
                      className="shrink-0 px-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.25em] text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      Close
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-xl border border-white/10 bg-white/5 text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <DeepDiveSection title="Problem">
                    <p className="text-white/75 leading-relaxed">{(activeProject.deepDive as ProjectDeepDive).problem}</p>
                  </DeepDiveSection>

                  <DeepDiveSection title="Approach">
                    <p className="text-white/75 leading-relaxed">{(activeProject.deepDive as ProjectDeepDive).approach}</p>
                  </DeepDiveSection>

                  <DeepDiveSection title="System Flow">
                    <ul className="space-y-3">
                      {(activeProject.deepDive as ProjectDeepDive).flow.map((step) => (
                        <li key={step} className="flex items-start gap-3 text-white/75">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/25 shrink-0" />
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </DeepDiveSection>

                  <div className="grid md:grid-cols-2 gap-8">
                    <DeepDiveSection title="Results">
                      <ul className="space-y-3">
                        {(activeProject.deepDive as ProjectDeepDive).results.map((r) => (
                          <li key={r} className="flex items-start gap-3 text-white/75">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400/60 shrink-0" />
                            <span className="leading-relaxed">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </DeepDiveSection>

                    <DeepDiveSection title="My Role">
                      <div className="space-y-3">
                        {(activeProject.highlights as ProjectHighlight[])
                          .filter((h) => h.label === "Ownership" || h.label === "Built")
                          .map((h) => (
                            <div key={h.label} className="text-white/75 leading-relaxed">
                              <span className="text-white/85 font-black tracking-tight">{h.label}:</span> {h.text}
                            </div>
                          ))}
                      </div>
                    </DeepDiveSection>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <DeepDiveSection title="Tradeoffs">
                      <ul className="space-y-3">
                        {(activeProject.deepDive as ProjectDeepDive).tradeoffs.map((t) => (
                          <li key={t} className="flex items-start gap-3 text-white/75">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/25 shrink-0" />
                            <span className="leading-relaxed">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </DeepDiveSection>

                    <DeepDiveSection title="Challenges">
                      <ul className="space-y-3">
                        {(activeProject.deepDive as ProjectDeepDive).challenges.map((c) => (
                          <li key={c} className="flex items-start gap-3 text-white/75">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/25 shrink-0" />
                            <span className="leading-relaxed">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </DeepDiveSection>
                  </div>

                  <DeepDiveSection title="Next Improvements">
                    <ul className="space-y-3">
                      {(activeProject.deepDive as ProjectDeepDive).next.map((n) => (
                        <li key={n} className="flex items-start gap-3 text-white/75">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400/60 shrink-0" />
                          <span className="leading-relaxed">{n}</span>
                        </li>
                      ))}
                    </ul>
                  </DeepDiveSection>

                  <div className="flex flex-wrap gap-4 pt-2">
                    {(activeProject.links as ProjectLink[]).map((link) => {
                      if (link.kind === "private") {
                        return (
                          <div
                            key={`${activeProject.id}-${link.kind}-modal`}
                            className="px-5 py-3 rounded-2xl border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.25em] text-white/60"
                          >
                            {link.label}
                          </div>
                        )
                      }

                      return (
                        <a
                          key={`${activeProject.id}-${link.kind}-modal`}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-3 rounded-2xl border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.25em] text-white/75 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          {link.kind === "github" ? "Open Repo" : "Open Demo"}
                        </a>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SectionWrapper>
  )
}

function DeepDiveSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/55">{title}</div>
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">{children}</div>
    </div>
  )
}
