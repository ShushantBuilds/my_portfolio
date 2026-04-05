'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { capabilityStack, StackItem } from '../lib/data'; // Adjust path

export default function SystemTerminal() {
  const [activeLayer, setActiveLayer] = useState<StackItem | null>(capabilityStack[0]);

  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 border-t border-white/10">
      <h2 data-magnetic="true" className="text-4xl md:text-6xl font-bold mb-12 tracking-tight text-white inline-block">
        System Architecture
      </h2>

      {/* Glass Terminal Container */}
      <div className="rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-md overflow-hidden grid grid-cols-1 md:grid-cols-10 h-[600px]">
        
        {/* Left Nav (Layers) */}
        <div className="md:col-span-3 border-r border-white/10 bg-black/30 p-8 flex flex-col space-y-4">
          {capabilityStack.map((layer, index) => (
            <motion.button
              key={layer.title}
              onHoverStart={() => setActiveLayer(layer)}
              className={`p-6 rounded-xl border transition-colors flex items-center justify-between group ${
                activeLayer?.title === layer.title 
                  ? 'border-neutral-500 bg-neutral-800' 
                  : 'border-white/10 bg-neutral-900/50 hover:border-white/30'
              }`}
            >
              <h3 className={`text-xl font-semibold tracking-tight ${activeLayer?.title === layer.title ? 'text-white' : 'text-neutral-300'}`}>
                {layer.title}
              </h3>
              <motion.div
                animate={{ x: activeLayer?.title === layer.title ? 10 : 0 }}
                transition={{ duration: 0.2 }}
                className={`${activeLayer?.title === layer.title ? 'text-white' : 'text-neutral-500 group-hover:text-white'}`}
              >
                &rarr;
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Right Output (Details) */}
        <div className="md:col-span-7 p-10 font-mono text-sm space-y-8 text-neutral-300 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer?.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <p className="text-xl text-neutral-100 font-semibold tracking-tight">{activeLayer?.title}</p>
              <p className="text-neutral-400">{activeLayer?.description}</p>
              
              <div className="space-y-2">
                <p className="text-white font-semibold">Capabilities:</p>
                <ul className="list-disc list-outside pl-5 space-y-1">
                  {activeLayer?.capabilities.map((cap) => (
                    <li key={cap}>{cap}</li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-2">
                <p className="text-white font-semibold">Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {activeLayer?.tech.map((tech) => (
                    <span key={tech} className="bg-neutral-800 border border-white/10 rounded-full px-4 py-1.5 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}