'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const profileScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.8]);
  const profileOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const profileY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

  const profileDisplay = useTransform(scrollYProgress, (v) => v > 0.15 ? "none" : "flex");

  const textOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.3], [100, 0]);
  const textScale = useTransform(scrollYProgress, [0.15, 0.3], [0.9, 1]);

  return (
    <section ref={containerRef} className="relative h-[350vh] bg-transparent">
      
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden px-4 md:px-6">
        <motion.div
          style={{ scale: profileScale, opacity: profileOpacity, y: profileY, display: profileDisplay }}
          className="absolute z-10 flex flex-col items-center text-center gap-6 bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-[2rem] w-full max-w-3xl shadow-[0_0_50px_rgba(0,255,65,0.05)]"
        >
          <div className="relative group cursor-pointer shrink-0">
            <img 
              src="https://github.com/ShushantBuilds.png" 
              alt="Shushant" 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-[#00ff41]/50 group-hover:border-[#00ff41] transition-colors object-cover shadow-2xl"
            />
            <div className="absolute bottom-1 right-2 w-5 h-5 bg-[#00ff41] rounded-full border-4 border-[#0a0a0a] animate-pulse" />
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3">
              Shushant
              <span className="text-sm bg-white/10 text-neutral-300 px-3 py-1 rounded-full font-mono font-normal">he/him</span>
            </h2>
            <p className="text-[#00ff41] font-mono text-sm uppercase tracking-widest mt-2 mb-4">
              MCA'27 NIT Raipur • @ShushantBuilds
            </p>
            <p className="text-neutral-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              I'm a student currently studying at NIT Raipur. I'm looking to collaborate on web and app development, currently learning Flutter. <br/>
              <span className="text-white font-serif italic mt-4 block text-xl">"Jack of All, King of None."</span>
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <a 
                href="/Shushant_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-[#00ff41]/10 border border-white/20 hover:border-[#00ff41]/50 text-white hover:text-[#00ff41] font-mono text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
              >
                <span>[ VIEW CV ]</span>
              </a>
            </div>
          </div>
        </motion.div>
        
        {/* 2. THE SCROLL-REVEALED TEXT */}
        {/* 🚀 FIX 3: Raised to z-30 so it acts as the true foreground layer */}
        <motion.div
          style={{ opacity: textOpacity, y: textY, scale: textScale }}
          className="absolute z-30 text-center flex flex-col items-center w-full pointer-events-none"
        >
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[9vw] font-black tracking-tighter leading-[0.85] text-neutral-50 whitespace-nowrap">
            ENGINEERING
          </h1>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[9vw] font-extrabold tracking-tighter leading-[0.85] text-neutral-300 font-serif italic whitespace-nowrap">
            THE FUTURE
          </h1>

          <p className="text-neutral-500 max-w-2xl text-center text-xs md:text-sm uppercase tracking-[0.3em] font-mono pt-8">
            Full-Stack Web • Embedded Systems • Intelligence
          </p>
        </motion.div>

      </div>
    </section>
  );
}