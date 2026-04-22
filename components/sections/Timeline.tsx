import SectionWrapper from "@/components/SectionWrapper"
import { motion } from "framer-motion"
import { Briefcase, GraduationCap, Award, History } from "lucide-react"

const timeline = [
  {
    title: "Machine Learning Intern",
    company: "Intrainz Innovation",
    date: "Summer 2024",
    icon: <Briefcase className="text-blue-400" size={24} />,
    description: [
      "Fraud transaction classification system (Python, scikit-learn) achieving ~85–90% accuracy — full lifecycle ownership from data prep to evaluation.",
      "Java-based data processing pipeline for transaction ingestion, delivering ~20% throughput improvement.",
      "Generative AI proof-of-concept for synthetic training data generation, resulting in ~10% model robustness improvement.",
      "Structured experiment logs with metric tracking and iterative refinement based on error patterns."
    ]
  },
  {
    title: "Independent Systems Builder",
    company: "Self-Directed",
    date: "2024 – Present",
    icon: <Briefcase className="text-cyan-400" size={24} />,
    description: [
      "Building production-quality intelligent systems, data tools, and AI-powered interfaces.",
      "Real engineering work: pipelines, models, metrics — not coursework exercises.",
      "Focus on measurable results, clean architecture, and systems that scale."
    ]
  },
  {
    title: "B.Tech in Computer Science",
    company: "GLA University, Mathura",
    date: "Expected June 2027",
    icon: <GraduationCap className="text-purple-400" size={24} />,
    description: [
      "Current CGPA: 7.0/10",
      "Relevant coursework: Probability & Statistics, Linear Algebra, DBMS, Operating Systems, ML fundamentals."
    ]
  },
  {
    title: "Leadership Roles",
    company: "GLA University Campus Clubs",
    date: "2023 - Present",
    icon: <Award className="text-emerald-400" size={24} />,
    description: [
      "Synergy Coordinator, Entrepreneurship Cell",
      "General Secretary, CSED Club",
      "Supported coordination, communication, and event execution across student teams."
    ]
  }
]

const certifications = [
  { title: "HP LIFE — Data Science & Analytics", date: "2024" },
  { title: "Deloitte Australia — Technology Job Simulation", date: "2024" },
  { title: "In Progress: Google ML Crash Course", date: "2024-2025" },
  { title: "In Progress: AWS Cloud Practitioner", date: "2024-2025" },
]

export default function Timeline() {
  return (
    <SectionWrapper id="experience" plain noPadding>
      <div className="max-w-6xl mx-auto space-y-20">
        <div className="text-center md:text-left space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-3 text-emerald-400 font-bold tracking-[0.2em] uppercase text-xs">
            <History size={16} />
            <span>Experience & Leadership</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            Career <span className="text-white/40 italic">Timeline.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed mx-auto md:ml-0">
            A focused path: hands-on ML work, a strong CS foundation, and leadership on campus.
          </p>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
          {timeline.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Dot and Icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl border border-white/20 bg-black text-white shadow-2xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-700 group-hover:scale-110 group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] z-20">
                {item.icon}
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-3.5rem)] p-8 md:p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl hover:bg-white/[0.05] transition-all duration-700 group-hover:border-blue-500/20 group-hover:shadow-[0_0_80px_rgba(59,130,246,0.02)]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="space-y-1">
                    <h3 className="font-black text-white text-2xl group-hover:text-blue-400 transition-colors duration-500">
                      {item.title}
                    </h3>
                    <div className="text-blue-400/80 text-sm font-bold flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      {item.company}
                    </div>
                  </div>
                  <time className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 group-hover:text-blue-500 group-hover:border-blue-500/20 transition-all self-start md:self-center">
                    {item.date}
                  </time>
                </div>
                <ul className="text-gray-500 text-sm md:text-base space-y-4 leading-relaxed">
                  {item.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-3 group/li">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0 group-hover/li:bg-blue-500 transition-colors duration-300" />
                      <span className="group-hover/li:text-gray-300 transition-colors duration-300">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="space-y-6 pt-8 border-t border-white/10"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white tracking-tight">Certifications & Learning</h3>
            <p className="text-sm text-gray-500">Relevant credentials and ongoing development:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">{cert.title}</p>
                  <p className="text-xs text-gray-500">{cert.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
