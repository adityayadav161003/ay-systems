"use client"

import SectionWrapper from "@/components/SectionWrapper"
import { motion, Variants } from "framer-motion"

const skillCategories = [
  {
    icon: "⚙️",
    title: "Core Intelligence Stack",
    skills: ["Python", "scikit-learn", "NumPy", "Pandas", "LLMs", "Generative AI", "AutoML", "Feature Engineering", "Model Evaluation"],
  },
  {
    icon: "👁",
    title: "Perception & Vision",
    skills: ["OpenCV", "MediaPipe", "Real-Time Pipelines", "Gesture Recognition", "Computer Vision"],
  },
  {
    icon: "🏗",
    title: "Systems & Architecture",
    skills: ["Pipeline Design", "Config-Driven Workflows", "Orchestration", "Experiment Tracking", "Artifact Management", "Modular Architecture"],
  },
  {
    icon: "🌐",
    title: "Web & Deployment",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "REST APIs", "Git", "GitHub", "Vercel"],
  },
  {
    icon: "📊",
    title: "Data & Analysis",
    skills: ["SQL", "EDA", "Data Cleaning", "Excel", "Jupyter", "Matplotlib", "Seaborn"],
  },
]

const currentlyWiring = ["RAG", "Vector Databases", "MLflow", "Docker", "FastAPI", "Hugging Face Transformers", "LangChain"]

export default function Skills() {
  const categoryVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  const skillVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
      },
    }),
  }

  return (
    <SectionWrapper id="skills" plain noPadding>
      <div className="space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white">
            The Stack.
          </h2>
          <div className="h-1.5 w-20 bg-cyan-500 rounded-full" />
        </motion.div>

        {/* Categories */}
        <div className="space-y-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              custom={catIndex}
              variants={categoryVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-3"
            >
              <h3 className="text-base md:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span className="text-xl">{category.icon}</span>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    custom={skillIndex}
                    variants={skillVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-medium text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently Wiring In */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-3 pt-8 border-t border-white/10"
        >
          <h3 className="text-base md:text-lg font-bold text-white/70 tracking-tight flex items-center gap-2">
            <span>Currently Wiring In →</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentlyWiring.map((skill, index) => (
              <motion.span
                key={skill}
                custom={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55 + index * 0.05, duration: 0.4 }}
                className="px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/10 text-xs md:text-sm font-medium text-gray-500 hover:bg-white/5 hover:text-gray-400 transition-all duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
