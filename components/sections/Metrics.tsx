import SectionWrapper from "@/components/SectionWrapper"
import { motion } from "framer-motion"

const metrics = [
  {
    value: "85-90%",
    label: "Classification Accuracy",
    description: "Fraud Detection Internship Project"
  },
  {
    value: "20-25",
    label: "FPS Performance",
    description: "GestureWave CV System"
  },
  {
    value: "15%",
    label: "Efficiency Gain",
    description: "AutoML Engine Optimization"
  },
  {
    value: "4+",
    label: "Core Projects",
    description: "ML & System Engineering"
  }
]

export default function Metrics() {
  return (
    <SectionWrapper id="metrics" plain noPadding>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 text-center md:text-left">
        {metrics.map((metric, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="space-y-4 group relative"
          >
            <div className="space-y-1">
              <h3 className="text-6xl md:text-7xl font-black text-white group-hover:text-blue-400 transition-colors duration-700 tracking-tighter">
                {metric.value}
              </h3>
              <div className="h-1 w-12 bg-blue-500/20 group-hover:w-full group-hover:bg-blue-500 transition-all duration-700 rounded-full" />
            </div>
            
            <div className="space-y-1">
              <p className="text-xl font-bold text-white/90">
                {metric.label}
              </p>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black leading-relaxed">
                {metric.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
