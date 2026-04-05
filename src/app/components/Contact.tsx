'use client';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Calculates the distance from the center of the text to the mouse
  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // The 0.2 multiplier controls how far it pulls. 
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const resetMouse = () => setPosition({ x: 0, y: 0 });

  return (
    <section className="h-screen flex flex-col justify-center items-center relative z-10 border-t border-white/10">
      
      {/* 1. motion.div restores the physical wobble 
        2. data-magnetic="true" tells the new global cursor to expand 
      */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={resetMouse}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className="px-12 py-8 rounded-full cursor-pointer"
        data-magnetic="true" 
      >
        <h2 className="text-7xl md:text-[12vw] font-black tracking-tighter uppercase text-center leading-none text-white pointer-events-none">
          Let's Talk
        </h2>
      </motion.div>
      
      <div className="absolute bottom-12 flex space-x-8 text-neutral-500 font-mono text-sm uppercase tracking-widest z-20">
        <a href="#" data-magnetic="true" className="hover:text-white transition-colors">GitHub</a>
        <a href="#" data-magnetic="true" className="hover:text-white transition-colors">LinkedIn</a>
        <a href="#" data-magnetic="true" className="hover:text-white transition-colors">Email</a>
      </div>
    </section>
  );
}