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
          {projectsData.map((project, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-green-400/50 transition"
            >
              <h3 className="text-xl font-semibold text-gray-100 mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map(t => <span key={t} className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">{t}</span>)}
              </div>
              <div className="flex gap-4 text-sm">
                {project.repo && (
                  <a href={project.repo} target="_blank" className="text-gray-300 hover:text-green-400">GitHub →</a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" className="text-gray-300 hover:text-green-400">Live Demo →</a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}