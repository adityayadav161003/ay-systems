"use client"

import { motion } from "framer-motion"
import TypingDrill from "./TypingDrill"
import InteractiveStatement from "./InteractiveStatement"
import PipelineBuilder from "./PipelineBuilder"
import ThemeSwitcher from "./ThemeSwitcher"
import DeveloperCalendar from "./DeveloperCalendar"
import InteractionPulse from "./InteractionPulse"
import LabPageHeader from "./LabPageHeader"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
}

export default function LabDashboard() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <LabPageHeader />

      {/* Components Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Row 1: Typing Drill (7 cols) + Interactive Statement (5 cols) */}
        <motion.div variants={itemVariants} className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <TypingDrill />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <InteractiveStatement />
          </div>
        </motion.div>

        {/* Row 2: Pipeline Builder (full width) */}
        <motion.div variants={itemVariants} className="col-span-12">
          <PipelineBuilder />
        </motion.div>

        {/* Row 3: Theme Switcher (4 cols) + Calendar (4 cols) + Pulse (4 cols) */}
        <motion.div variants={itemVariants} className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <ThemeSwitcher />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <DeveloperCalendar />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <InteractionPulse />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
