'use client';
import { useRef } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

const projects = [
  { title: "Cinematic Recommender Engine", category: "Full-Stack Web & AI", colSpan: "col-span-1 md:col-span-2" },
  { title: "Automated IoT Environment", category: "C++ & Microcontrollers", colSpan: "col-span-1" },
  { title: "A* Pathfinding Visualizer", category: "Algorithms & Python", colSpan: "col-span-1 md:col-span-3" }
];

export default function Projects() {
  // --- SCROLL VELOCITY PHYSICS ---
  // const { scrollY } = useScroll();
  // const scrollVelocity = useVelocity(scrollY);
  // const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  // Maps the scroll speed to a skew angle (fast scroll = more tilt)
  // const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [4, -4]);

  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      
      {/* --- CHROMATIC GLITCH CSS --- */}
      <style>{`
        .glitch-card:hover {
          animation: chromatic-glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          border-color: rgba(255, 255, 255, 0.5);
        }
        @keyframes chromatic-glitch {
          0% { transform: translate(0); filter: drop-shadow(0 0 0 rgba(255,0,0,0)) drop-shadow(0 0 0 rgba(0,255,255,0)); }
          20% { transform: translate(-2px, 1px); filter: drop-shadow(-4px 0 0 rgba(255,0,65,0.8)) drop-shadow(4px 0 0 rgba(0,255,255,0.8)); }
          40% { transform: translate(-1px, -1px); filter: drop-shadow(2px 0 0 rgba(255,0,65,0.8)) drop-shadow(-2px 0 0 rgba(0,255,255,0.8)); }
          60% { transform: translate(2px, 1px); filter: drop-shadow(-2px 0 0 rgba(255,0,65,0.8)) drop-shadow(2px 0 0 rgba(0,255,255,0.8)); }
          80% { transform: translate(1px, -1px); filter: drop-shadow(2px 0 0 rgba(255,0,65,0.8)) drop-shadow(-2px 0 0 rgba(0,255,255,0.8)); }
          100% { transform: translate(0); filter: drop-shadow(0 0 0 rgba(255,0,0,0)) drop-shadow(0 0 0 rgba(0,255,255,0)); }
        }
      `}</style>

      <h2 data-magnetic="true" className="text-4xl md:text-6xl font-bold mb-12 tracking-tight text-white inline-block">Selected Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            // Apply the physics skew here
            // style={{ skewY: skewVelocity }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            data-magnetic="true"
            className={`glitch-card group relative rounded-3xl p-8 overflow-hidden border border-white/10 bg-neutral-900/40 backdrop-blur-md transition-colors cursor-pointer ${project.colSpan}`}
          >
            <div className="absolute bottom-8 left-8">
              <p className="text-sm text-neutral-400 mb-2 font-mono uppercase tracking-wider">{project.category}</p>
              <h3 className="text-2xl md:text-3xl font-medium text-white group-hover:text-[#00ff41] transition-colors">{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}