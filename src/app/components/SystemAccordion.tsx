'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { capabilityStack, StackItem } from '../lib/data'; // Adjust path

export default function SystemAccordion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 border-t border-white/10">
      <h2 data-magnetic="true" className="text-4xl md:text-6xl font-bold mb-16 tracking-tight text-white inline-block">
        System Architecture
      </h2>

      <div className="space-y-4">
        {capabilityStack.map((layer, index) => (
          <div key={layer.title} className="border border-white/10 rounded-3xl bg-neutral-900/40 backdrop-blur-md overflow-hidden">
            
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-8 text-left group"
            >
              <h3 className="text-3xl font-bold tracking-tight text-white">{layer.title}</h3>
              <motion.div
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-neutral-500 group-hover:text-white"
              >
                &darr;
              </motion.div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="px-10 pb-10"
                >
                  <div className="border-t border-white/10 pt-8 space-y-8 font-mono text-sm text-neutral-300 grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    
                    {/* Left details */}
                    <div className="space-y-6">
                      <p className="text-neutral-400">{layer.description}</p>
                      
                      <div className="space-y-2">
                        <p className="text-white font-semibold">Technologies:</p>
                        <div className="flex flex-wrap gap-2">
                          {layer.tech.map((tech) => (
                            <span key={tech} className="bg-neutral-800 border border-white/10 rounded-full px-4 py-1.5 text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right capabilities */}
                    <div className="space-y-3">
                      <p className="text-white font-semibold">Capabilities:</p>
                      <ul className="list-disc list-outside pl-5 space-y-1.5">
                        {layer.capabilities.map((cap) => (
                          <li key={cap}>{cap}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}