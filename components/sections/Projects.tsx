import SectionWrapper from "@/components/SectionWrapper"

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <h2 className="text-4xl font-bold mb-10">
        Selected Projects.
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
          <h3 className="font-semibold mb-2">Project One</h3>
          <p className="text-gray-400 text-sm">
            Flagship engineering system.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
          <h3 className="font-semibold mb-2">Project Two</h3>
          <p className="text-gray-400 text-sm">
            Backend architecture project.
          </p>
        </div>

        <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
          <h3 className="font-semibold mb-2">Project Three</h3>
          <p className="text-gray-400 text-sm">
            Experimental system build.
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}
