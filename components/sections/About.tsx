import SectionWrapper from "@/components/SectionWrapper"
import { motion } from "framer-motion"
import { User } from "lucide-react"

export default function About() {
  return (
    <SectionWrapper id="about" innerClassName="bg-transparent border-none backdrop-blur-none shadow-none p-0 md:p-0 lg:p-0">
      <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-blue-400 font-bold tracking-[0.2em] uppercase text-xs">
              <User size={16} />
              <span>Personal Narrative</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
              Building With <span className="text-white/40 italic">Intention.</span>
            </h2>
            <div className="h-1.5 w-24 bg-blue-500 rounded-full" />
          </div>

          <div className="space-y-8 text-gray-400 text-lg md:text-xl leading-relaxed font-medium">
            <p>
              I approach engineering as a system — not just code. 
              As a B.Tech Computer Science student at GLA University, 
              I’ve focused my journey on bridging the gap between raw data 
              and intelligent applications.
            </p>
            <p>
              My hands-on experience spans from designing automated ML pipelines 
              to building real-time computer vision systems. I believe in 
              disciplined thinking, rapid iteration, and creating software 
              that delivers measurable impact.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 pt-8 border-t border-white/10">
            <div className="space-y-2">
              <h4 className="text-white font-black text-2xl tracking-tighter">GLA University</h4>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black">Education Hub</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-black text-2xl tracking-tighter">Intrainz</h4>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black">Internship Exposure</p>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative p-px rounded-[3rem] bg-gradient-to-tr from-white/10 to-transparent group overflow-hidden"
        >
          {/* Animated background shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent group-hover:animate-shimmer" />
          
          <div className="bg-[#050505]/60 backdrop-blur-3xl p-10 md:p-16 rounded-[3rem] border border-white/10 space-y-12 relative z-10">
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight italic leading-snug">
              "Build systems. Document thinking. Ship iteratively. Improve relentlessly."
            </h3>
            
            <div className="grid grid-cols-2 gap-10">
              {[
                { value: "7.0", label: "Current CGPA" },
                { value: "85%", label: "Avg Accuracy" },
                { value: "20+", label: "FPS Rate" },
                { value: "15%", label: "Efficiency Gain" }
              ].map((stat, i) => (
                <div key={i} className="space-y-2 group/stat">
                  <span className="text-4xl font-black text-white tracking-tighter group-hover/stat:text-blue-400 transition-colors duration-300">
                    {stat.value}
                  </span>
                  <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-black group-hover/stat:text-gray-400 transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
