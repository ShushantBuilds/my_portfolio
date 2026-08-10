'use client';
import { motion } from 'framer-motion';
import { useRef, useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Form States
  const [reviewStatus, setReviewStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [projectStatus, setProjectStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Magnetic Text Logic
  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };
  const resetMouse = () => setPosition({ x: 0, y: 0 });

  // Environment Variables
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

  // Handle Review Submission
  const handleReviewSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReviewStatus('sending');
    
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, e.currentTarget, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setReviewStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setReviewStatus('idle'), 3000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setReviewStatus('error');
        setTimeout(() => setReviewStatus('idle'), 3000);
      });
  };

  // Handle Project Submission
  const handleProjectSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProjectStatus('sending');

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, e.currentTarget, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setProjectStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setProjectStatus('idle'), 3000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setProjectStatus('error');
        setTimeout(() => setProjectStatus('idle'), 3000);
      });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative z-10 border-t border-white/10 pt-20 pb-32">
      
      {/* 1. The Magnetic Header */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={resetMouse}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className="px-12 py-8 rounded-full cursor-pointer mb-12"
        data-magnetic="true" 
      >
        <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase text-center leading-none text-white pointer-events-none">
          Let's Talk
        </h2>
      </motion.div>

      {/* 2. The Communication Hub Grid */}
      <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
        
        {/* --- LEFT PANEL: QUICK REVIEW --- */}
        <div className="bg-neutral-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff41]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <h3 className="text-2xl font-bold text-white mb-2">Drop a Review</h3>
          <p className="text-neutral-400 font-mono text-xs mb-6">SYS.LOG // GUEST_FEEDBACK</p>
          
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <input 
              type="text" 
              name="user_name" 
              required
              placeholder="Your Name / Alias" 
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-neutral-200 font-mono text-sm focus:outline-none focus:border-[#00ff41] transition-colors"
            />
            <input type="hidden" name="inquiry_type" value="Review" />
            
            <textarea 
              name="message" 
              required
              placeholder="What are your thoughts on the architecture?" 
              rows={4}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-neutral-200 font-mono text-sm focus:outline-none focus:border-[#00ff41] transition-colors resize-none"
            />
            
            <button 
              disabled={reviewStatus !== 'idle'}
              className="w-full py-3 rounded-lg bg-[#00ff41]/10 hover:bg-[#00ff41]/20 border border-[#00ff41]/30 text-[#00ff41] font-mono text-sm uppercase tracking-widest transition-colors flex justify-center items-center"
            >
              {reviewStatus === 'idle' && "Submit Log"}
              {reviewStatus === 'sending' && "Transmitting..."}
              {reviewStatus === 'success' && <span className="text-[#00ff41]">Log Received ✓</span>}
              {reviewStatus === 'error' && <span className="text-red-500">Transmission Failed</span>}
            </button>
          </form>
        </div>

        {/* --- RIGHT PANEL: PROJECT INQUIRY --- */}
        <div className="bg-neutral-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ffff]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <h3 className="text-2xl font-bold text-white mb-2">Initialize Project</h3>
          <p className="text-neutral-400 font-mono text-xs mb-6">SYS.REQ // ARCHITECTURE_PROPOSAL</p>
          
          <form onSubmit={handleProjectSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                name="user_name" 
                required
                placeholder="Name" 
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-neutral-200 font-mono text-sm focus:outline-none focus:border-[#00ffff] transition-colors"
              />
              <input 
                type="email" 
                name="user_email" 
                required
                placeholder="Email Address" 
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-neutral-200 font-mono text-sm focus:outline-none focus:border-[#00ffff] transition-colors"
              />
            </div>
            <input type="hidden" name="inquiry_type" value="Project Proposal" />

            <textarea 
              name="message" 
              required
              placeholder="Outline your system requirements, timeline, and objectives..." 
              rows={4}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-neutral-200 font-mono text-sm focus:outline-none focus:border-[#00ffff] transition-colors resize-none"
            />
            
            <button 
              disabled={projectStatus !== 'idle'}
              className="w-full py-3 rounded-lg bg-[#00ffff]/10 hover:bg-[#00ffff]/20 border border-[#00ffff]/30 text-[#00ffff] font-mono text-sm uppercase tracking-widest transition-colors flex justify-center items-center"
            >
              {projectStatus === 'idle' && "Deploy Proposal"}
              {projectStatus === 'sending' && "Encrypting & Sending..."}
              {projectStatus === 'success' && "Proposal Deployed ✓"}
              {projectStatus === 'error' && <span className="text-red-500">Deployment Failed</span>}
            </button>
          </form>
        </div>

      </div>
      
      {/* Footer Links */}
      <div className="absolute bottom-12 flex space-x-8 text-neutral-500 font-mono text-sm uppercase tracking-widest z-20">
        <a href="https://github.com/ShushantBuilds" target="_blank" rel="noreferrer" data-magnetic="true" className="hover:text-white transition-colors">GitHub</a>
        <a href="https://www.linkedin.com/in/shushantgupta/" target="_blank" data-magnetic="true" className="hover:text-white transition-colors">LinkedIn</a>
      </div>
    </section>
  );
}