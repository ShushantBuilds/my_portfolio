'use client';
import { motion } from 'framer-motion';

// Helper component to split text into animated letters
const SplitText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: { y: "110%" }, // Start pushed down outside the mask
            visible: { y: "0%" }
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-transparent px-6">
      
      <motion.div
        initial="hidden"
        animate="visible"
        // staggerChildren controls the delay between each letter sliding up!
        variants={{ visible: { transition: { staggerChildren: 0.03, delayChildren: 2.5 } } }} 
        className="z-10 text-center space-y-2 flex flex-col items-center"
      >
        <h1 data-magnetic="true" className="text-7xl md:text-[10vw] font-black tracking-tighter leading-[0.8] text-neutral-50 overflow-hidden">
          <SplitText text="ENGINEERING" />
        </h1>
        
        <h1 data-magnetic="true" className="text-7xl md:text-[10vw] font-extrabold tracking-tighter leading-[0.8] text-neutral-300 font-serif italic overflow-hidden">
          <SplitText text="THE FUTURE" />
        </h1>

        <motion.p
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }}
          className="text-neutral-500 max-w-2xl text-center text-sm md:text-base uppercase tracking-widest font-mono pt-6"
        >
          Full-Stack Web • Embedded Systems • Intelligence
        </motion.p>
      </motion.div>

    </section>
  );
}