import SectionWrapper from "@/components/SectionWrapper"
import { motion } from "framer-motion"
import { Cpu, Camera, BarChart4, Code2, Layers } from "lucide-react"

const items = [
  {
    title: "Machine Learning Pipelines",
    icon: <Cpu className="text-blue-400" size={24} />,
    description: "Repeatable workflows for preprocessing, training, evaluation, and export."
  },
  {
    title: "Computer Vision Systems",
    icon: <Camera className="text-emerald-400" size={24} />,
    description: "Real-time gesture recognition with a focus on latency and stability."
  },
  {
    title: "Data Analysis Workflows",
    icon: <BarChart4 className="text-purple-400" size={24} />,
    description: "Cleaning, EDA, and clear reporting to surface useful signals."
  },
  {
    title: "Modern Web Interfaces",
    icon: <Code2 className="text-orange-400" size={24} />,
    description: "Scalable, high-performance digital platforms with recruiter-friendly UX."
  }
]

export default function WhatIBuild() {
  return (
    <SectionWrapper id="what-i-build" plain noPadding>
      <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
        <div className="lg:w-1/3 space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-3 text-blue-400 font-bold tracking-[0.2em] uppercase text-xs">
              <Layers size={16} />
              <span>Specializations</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black leading-tight text-white tracking-tighter">
              What I <span className="text-white/40 italic">Build.</span>
            </h2>
            <div className="h-1.5 w-24 bg-blue-500 rounded-full mx-auto lg:ml-0" />
          </div>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
            I like projects that combine engineering thinking with practical ML: clean inputs, clear evaluation, and interfaces that make the work usable.
          </p>
        </div>

        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 md:p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 space-y-6">
                <div className="mb-4 p-4 w-fit rounded-2xl bg-black/40 border border-white/5 group-hover:scale-110 group-hover:border-blue-500/30 transition-all duration-500">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors duration-500 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-500 text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
