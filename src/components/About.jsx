import { motion } from "framer-motion";
import { aboutData, skills } from "../data/portfolioData";

export default function About() {
  return (
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-12"
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-100 mb-6 flex items-center">
            <span className="text-green-400 mr-2">01.</span> {aboutData.title}
          </h2>
          {aboutData.paragraphs.map((p, idx) => (
            <p key={idx} className="text-gray-400 mb-4">{p}</p>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-200 mb-3">Languages</h3>
          <ul className="grid grid-cols-2 gap-2 mb-6">
            {skills.languages.map(s => <li key={s} className="text-gray-400">▹ {s}</li>)}
          </ul>
          <h3 className="text-xl font-semibold text-gray-200 mb-3">Testing</h3>
          <ul className="grid grid-cols-2 gap-2 mb-6">
            {skills.testing.map(s => <li key={s} className="text-gray-400">▹ {s}</li>)}
          </ul>
          <h3 className="text-xl font-semibold text-gray-200 mb-3">CI/CD & Tools</h3>
          <ul className="grid grid-cols-2 gap-2">
            {skills.ciCd.map(s => <li key={s} className="text-gray-400">▹ {s}</li>)}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}