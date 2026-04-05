'use client';
import { motion, Variants } from 'framer-motion';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-transparent px-6">
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 text-center space-y-4"
      >
        <motion.h1
          variants={textVariants}
          data-magnetic="true"
          className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase leading-[0.8] text-neutral-50"
        >
          ENGINEERING
        </motion.h1>
        
        <motion.h1
          variants={textVariants}
          data-magnetic="true"
          className="text-7xl md:text-[10vw] font-extrabold tracking-tighter uppercase leading-[0.8] text-neutral-300 font-serif italic"
        >
          the FUTURE
        </motion.h1>

        <motion.p
          variants={textVariants}
          className="text-neutral-500 max-w-2xl mx-auto text-sm md:text-base uppercase tracking-widest font-mono pt-6"
        >
          Full-Stack Web • Embedded Systems • Intelligence
        </motion.p>
      </motion.div>

    </section>
  );
}