import { motion } from "framer-motion";
import { socialLinks } from "../data/portfolioData";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 text-center max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-gray-100 mb-6 flex items-center justify-center">
          <span className="text-green-400 mr-2">04.</span> What's Next?
        </h2>
        <p className="text-4xl md:text-5xl font-bold text-gray-200 mb-6">Get In Touch</p>
        <p className="text-gray-400 mb-8">
          I'm always open to discussing quality engineering, AI safety, or just saying hello.
        </p>
        <a
          href={`mailto:${socialLinks.email}`}
          className="inline-block border border-green-400 text-green-400 px-6 py-3 rounded hover:bg-green-400/10 transition"
        >
          Say Hello
        </a>
        <div className="flex justify-center gap-6 mt-10">
          <a href={socialLinks.github} target="_blank" className="text-gray-400 hover:text-green-400">GitHub</a>
          <a href={socialLinks.huggingface} target="_blank" className="text-gray-400 hover:text-green-400">Hugging Face</a>
          <a href={socialLinks.linkedin} target="_blank" className="text-gray-400 hover:text-green-400">LinkedIn</a>
        </div>
      </motion.div>
    </section>
  );
}