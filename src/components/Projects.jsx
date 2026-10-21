import { motion } from "framer-motion";
import { projectsData } from "../data/portfolioData";

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-gray-100 mb-12 flex items-center">
          <span className="text-green-400 mr-2">03.</span> Some Things I've Built
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <motion.div
              key={project.repo}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-green-400/50 transition"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-3">{project.category}</p>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
              {project.note && <p className="text-gray-400 mb-4 text-xs leading-relaxed">{project.note}</p>}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map(t => <span key={t} className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">{t}</span>)}
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400">Source code →</a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400">{project.demoLabel} →</a>
                )}
                {project.evidence && (
                  <a href={project.evidence} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400">{project.evidenceLabel} →</a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-sm"><a href="https://github.com/kallurayaankit?tab=repositories" className="text-green-400 underline">Explore all public repositories</a></p>
      </motion.div>
    </section>
  );
}
