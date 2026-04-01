import SectionWrapper from "@/components/SectionWrapper"
import { motion } from "framer-motion"
import { Brain, BarChart3, Eye, Globe, Zap } from "lucide-react"

const skillCards = [
  {
    title: "Machine Learning",
    icon: <Brain className="text-blue-400" size={32} />,
    description: "Building automated pipelines and predictive models.",
    skills: ["scikit-learn", "Feature Engineering", "Model Evaluation", "AutoML"]
  },
  {
    title: "Data Analysis",
    icon: <BarChart3 className="text-purple-400" size={32} />,
    description: "Extracting insights from complex datasets using statistical methods.",
    skills: ["Python", "Pandas", "NumPy", "EDA", "SQL (Basic)", "Excel"]
  },
  {
    title: "Computer Vision",
    icon: <Eye className="text-emerald-400" size={32} />,
    description: "Developing real-time vision systems and gesture recognition.",
    skills: ["OpenCV", "MediaPipe", "Image Processing", "Vision Workflows"]
  },
  {
    title: "Web & Tools",
    icon: <Globe className="text-orange-400" size={32} />,
    description: "Crafting modern interfaces and managing development lifecycles.",
    skills: ["JavaScript", "HTML", "CSS", "Git", "GitHub", "Next.js"]
  }
]

export default function Skills() {
  return (
    <SectionWrapper id="skills" plain noPadding>
      <div className="space-y-16">
        <div className="text-center md:text-left space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-3 text-purple-400 font-bold tracking-[0.2em] uppercase text-xs">
            <Zap size={16} />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            Technical <span className="text-white/40 italic">Arsenal.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed mx-auto md:ml-0">
            A specialized stack focused on building intelligent, data-driven systems 
            and modern digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCards.map((card, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-[2rem] border border-white/10 bg-[#050505]/60 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-700 hover:-translate-y-3 overflow-hidden"
            >
              {/* Animated Glow Border */}
              <div className="absolute inset-0 rounded-[2rem] p-px bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-blue-500/20 transition-all duration-700" />
              
              {/* Moving Gradient Overlay */}
              <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent group-hover:animate-shimmer" />
              
              <div className="relative z-10 space-y-6">
                <div className="p-4 w-fit rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all duration-700">
                  {card.icon}
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-500">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-500">
                    {card.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {card.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-gray-400 group-hover:bg-blue-500/5 group-hover:text-blue-300 group-hover:border-blue-500/20 transition-all duration-500"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Decorative Corner Light */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
