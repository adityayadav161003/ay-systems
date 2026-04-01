import SectionWrapper from "@/components/SectionWrapper"
import { motion } from "framer-motion"
import { ExternalLink, Github, Sparkles } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "AY Systems – Agent-Based AutoML Pipeline",
    description: "A production-quality, modular ML system driven by specialized AI agents for data processing, feature engineering, and model selection.",
    impact: "Flagship Engineering Project",
    tech: ["Python", "scikit-learn", "Pandas", "Streamlit", "Orchestration"],
    relevance: "Demonstrates advanced system design and automated ML workflows.",
    github: "https://github.com/adityayadav161003",
    featured: true
  },
  {
    id: 2,
    title: "GestureWave AI",
    description: "Real-time touch-free gesture control system using computer vision for intuitive human-computer interaction.",
    impact: "20–25 FPS Performance",
    tech: ["OpenCV", "MediaPipe", "Python", "Computer Vision"],
    relevance: "Achieved high-speed real-time processing and gesture recognition accuracy.",
    github: "https://github.com/adityayadav161003",
    featured: false
  },
  {
    id: 3,
    title: "AutoML Engine for Tabular Data",
    description: "End-to-end automated pipeline for tabular data including feature selection and comparative model analysis.",
    impact: "15% Efficiency Gain",
    tech: ["scikit-learn", "EDA", "Feature Engineering", "Model Evaluation"],
    relevance: "Improved model training efficiency through automated feature selection.",
    github: "https://github.com/adityayadav161003",
    featured: false
  },
  {
    id: 4,
    title: "Full-Stack Portfolio Website",
    description: "Premium personal branding platform built with modern web technologies, focusing on performance and recruiter UX.",
    impact: "Recruiter-Focused Design",
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion"],
    relevance: "Showcases full-stack engineering and visual design capabilities.",
    github: "https://github.com/adityayadav161003",
    featured: false
  }
]

export default function Projects() {
  return (
    <SectionWrapper id="projects" innerClassName="bg-transparent border-none backdrop-blur-none shadow-none p-0 md:p-0 lg:p-0">
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
              Engineering intelligent systems with a focus on machine learning, 
              computer vision, and scalable data architectures.
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
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.tech.map((t) => (
                      <span key={t} className="px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-xl border border-white/10 bg-white/5 text-gray-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all duration-500">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-500 italic font-medium">
                    {project.relevance}
                  </p>
                </div>

                <div className="flex gap-6 pt-4">
                  <a 
                    href={project.github} 
                    target="_blank"
                    className="flex items-center gap-2 text-xs md:text-sm font-bold text-white uppercase tracking-widest hover:text-blue-400 transition-colors duration-300 group/link"
                  >
                    <Github size={18} className="group-hover/link:scale-110 transition-transform" />
                    Source Code
                  </a>
                  <button className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-600 uppercase tracking-widest cursor-not-allowed group/link">
                    <ExternalLink size={18} className="group-hover/link:scale-110 transition-transform" />
                    Live Demo
                  </button>
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] group-hover:bg-blue-600/10 transition-all duration-1000" />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
