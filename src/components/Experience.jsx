import { motion } from "framer-motion";
import { experienceData } from "../data/portfolioData";

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-gray-100 mb-12 flex items-center">
          <span className="text-green-400 mr-2">02.</span> Where I've Worked
        </h2>
        <div className="space-y-12">
          {experienceData.map((job, idx) => (
            <div key={idx} className="border-l-2 border-green-400 pl-6">
              <h3 className="text-xl font-semibold text-gray-200">{job.role} · {job.company}</h3>
              <p className="text-sm text-gray-400 mb-3">{job.period}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                {job.points.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}