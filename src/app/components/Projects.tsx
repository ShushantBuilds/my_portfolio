'use client';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

// 1. ADD IMAGE PATHS HERE (Place your images in the /public folder)
const projects = [
  { 
    title: "Cinematic Recommender Engine", 
    category: "Full-Stack Web & AI", 
    colSpan: "col-span-1 md:col-span-2",
    image: "/movie-bg.jpg" // Example: Place movie-bg.jpg in your public folder
  },
  { 
    title: "Automated IoT Environment", 
    category: "C++ & Microcontrollers", 
    colSpan: "col-span-1",
    image: "/iot-bg.jpg" 
  },
  { 
    title: "A* Pathfinding Visualizer", 
    category: "Algorithms & Python", 
    colSpan: "col-span-1 md:col-span-3",
    image: "/pathfinder-bg.jpg" 
  }
];

export default function Projects() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [4, -4]);

  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      
      <style>{`
        .glitch-card:hover {
          animation: chromatic-glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          border-color: rgba(255, 255, 255, 0.5);
        }
        @keyframes chromatic-glitch {
          0% { transform: translate(0); filter: drop-shadow(0 0 0 rgba(255,0,0,0)); }
          20% { transform: translate(-2px, 1px); filter: drop-shadow(-4px 0 0 rgba(255,0,65,0.8)); }
          40% { transform: translate(-1px, -1px); filter: drop-shadow(2px 0 0 rgba(255,0,65,0.8)); }
          60% { transform: translate(2px, 1px); filter: drop-shadow(-2px 0 0 rgba(255,0,65,0.8)); }
          80% { transform: translate(1px, -1px); filter: drop-shadow(2px 0 0 rgba(255,0,65,0.8)); }
          100% { transform: translate(0); filter: drop-shadow(0 0 0 rgba(255,0,0,0)); }
        }
      `}</style>

      <h2 data-magnetic="true" className="text-4xl md:text-6xl font-bold mb-12 tracking-tight text-white inline-block">Selected Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            style={{ skewY: skewVelocity }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            data-magnetic="true"
            className={`glitch-card group relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 cursor-pointer ${project.colSpan}`}
          >
            {/* 🚀 NEW: Background Image with dark overlay */}
            <div className="absolute inset-0 bg-neutral-950/70 group-hover:bg-neutral-950/40 transition-colors duration-500 z-10" />
            <img 
              src={project.image} 
              alt={project.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Content (Z-20 keeps it above the image) */}
            <div className="absolute bottom-8 left-8 z-20">
              <p className="text-sm text-[#00ff41] mb-2 font-mono uppercase tracking-wider bg-black/50 px-2 py-1 rounded inline-block backdrop-blur-sm">
                {project.category}
              </p>
              <h3 className="text-2xl md:text-3xl font-medium text-white drop-shadow-lg">{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}