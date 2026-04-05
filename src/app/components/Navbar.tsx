'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar3D from './Avatar3D';
import TerminalMode from './TerminalMode';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-[60] transition-all duration-300 ${
          isScrolled 
            ? 'bg-neutral-950/60 backdrop-blur-lg border-b border-white/10 py-3 shadow-2xl' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          <div data-magnetic="true" className="flex items-center space-x-2 cursor-pointer">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-sm tracking-widest uppercase text-white font-semibold">
              Hello Devs_
            </span>
          </div>

          {/* 🚀 UPDATED: Wrapper with Tooltip 🚀 */}
          <div className="relative flex items-center group">
            
            {/* The Floating Hacker Tooltip */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.8 }} // Delays appearance so it doesn't crowd the initial load
              className="absolute right-full mr-4 pointer-events-none hidden md:block" // Hidden on tiny mobile screens
            >
              <div className="bg-black/60 backdrop-blur-md border border-[#00ff41]/40 text-[#00ff41] font-mono text-xs px-3 py-1.5 rounded flex items-center space-x-2 shadow-[0_0_10px_rgba(0,255,65,0.1)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse" />
                <span>SYS.OVERRIDE_READY</span>
              </div>
            </motion.div>

            <div data-magnetic="true" title="System Override">
              <Avatar3D onClick={() => setIsTerminalOpen(true)} />
            </div>
          </div>

        </div>
      </motion.nav>

      <AnimatePresence>
        {isTerminalOpen && (
          <TerminalMode onClose={() => setIsTerminalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}