'use client';
import { motion } from 'framer-motion';

const SplitText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: { y: "110%" },
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
        variants={{ visible: { transition: { staggerChildren: 0.03, delayChildren: 2.5 } } }} 
        className="z-10 text-center flex flex-col items-center w-full max-w-4xl"
      >
        <h1 data-magnetic="true" className="text-7xl md:text-[10vw] font-black tracking-tighter leading-[0.8] text-neutral-50 overflow-hidden mb-2">
          <SplitText text="ENGINEERING" />
        </h1>
        
        <h1 data-magnetic="true" className="text-7xl md:text-[10vw] font-extrabold tracking-tighter leading-[0.8] text-neutral-300 font-serif italic overflow-hidden mb-12">
          <SplitText text="THE FUTURE" />
        </h1>

        {/* 🚀 NEW: The Personal Terminal Bio Card */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 3.5 } } }}
          className="flex flex-col md:flex-row items-center md:items-start text-left gap-6 bg-neutral-900/40 backdrop-blur-md border border-white/10 p-6 rounded-3xl w-full max-w-2xl shadow-[0_0_30px_rgba(0,255,65,0.05)]"
        >
          <div className="relative group cursor-pointer shrink-0">
            {/* Auto-fetches your actual GitHub avatar */}
            <img 
              src="https://github.com/ShushantBuilds.png" 
              alt="Shushant" 
              className="w-24 h-24 rounded-full border-2 border-[#00ff41]/50 group-hover:border-[#00ff41] transition-colors object-cover"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#00ff41] rounded-full border-2 border-neutral-900 animate-pulse" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Shushant
              <span className="text-xs bg-white/10 text-neutral-300 px-2 py-1 rounded-full font-mono font-normal">he/him</span>
            </h2>
            <p className="text-[#00ff41] font-mono text-xs uppercase tracking-widest mt-1 mb-3">
              MCA'27 NIT Raipur • @ShushantBuilds
            </p>
            <p className="text-neutral-400 text-sm leading-relaxed">
              I'm a student currently studying at NIT Raipur. I'm looking to collaborate on web and app development, currently learning Flutter. <br/>
              <span className="text-white italic mt-2 block">"Jack of All, King of None."</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}