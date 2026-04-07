'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scrolling while loading
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto'; // Unlock scrolling
    }, 2500); // 2.5 seconds total load time

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] bg-[#050505] flex flex-col justify-center items-center"
        >
          {/* The expanding loading line */}
          <motion.div 
            initial={{ scaleX: 0, height: "1px" }}
            animate={{ scaleX: 1, height: "1px" }}
            transition={{ duration: 1, ease: "circInOut" }}
            className="w-3/4 max-w-md bg-[#00ff41]"
          />
          
          {/* The System Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-4 font-mono text-xs tracking-[0.3em] text-[#00ff41] uppercase animate-pulse"
          >
            Compiling Kinetic Schematic...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}