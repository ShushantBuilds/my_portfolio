'use client';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  { title: "Cinematic Recommender Engine", category: "Full-Stack Web & AI", colSpan: "col-span-1 md:col-span-2" },
  { title: "Automated IoT Environment", category: "C++ & Microcontrollers", colSpan: "col-span-1" },
  { title: "A* Pathfinding Visualizer", category: "Algorithms & Python", colSpan: "col-span-1 md:col-span-3" }
];

export default function Projects() {
  return (
    // Added relative and z-10 to stay above the background
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <h2 data-magnetic="true" className="text-4xl md:text-6xl font-bold mb-12 tracking-tight text-white inline-block">Selected Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            data-magnetic="true" // Makes the cursor expand over cards
            className={`group relative rounded-3xl p-8 overflow-hidden border border-white/10 bg-neutral-900/40 backdrop-blur-md hover:bg-neutral-800/50 hover:border-white/30 transition-all cursor-pointer ${project.colSpan}`}
          >
            <div className="absolute top-8 right-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <ExternalLink className="text-white" />
            </div>
            <div className="absolute bottom-8 left-8">
              <p className="text-sm text-neutral-400 mb-2 font-mono uppercase tracking-wider">{project.category}</p>
              <h3 className="text-2xl md:text-3xl font-medium text-white">{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}