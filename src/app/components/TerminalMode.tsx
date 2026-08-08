'use client';
import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';

type TerminalLine = { type: 'system' | 'user' | 'error' | 'ascii' | 'success'; text: string };

// 1. Define your projects and their actual URLs here
const PROJECT_DATA = [
  { id: 1, name: "SENTINELNET SHIELD - AI EXTENSION", status: "DEPLOYED", url: "https://github.com/ShushantBuilds/SentinelNet-Backend" }, // Replace with actual URL
  { id: 2, name: "NEAREASE - SERVICES NEAR YOU", status: "ACTIVE", url: "https://github.com/ShushantBuilds/nearease-frontend" }, // Replace with actual URL
  { id: 3, name: "IoT CYBER ATTACK SVM DETECTION", status: "REPOSITORY", url: "https://github.com/ShushantBuilds/IoT-Cyberattack-SVM-Detection" } // Replace with actual URL
];

export default function TerminalMode({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  
  // 2. New state for the interactive menu
  const [interactiveMode, setInteractiveMode] = useState<'projects' | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasBooted = useRef(false);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, interactiveMode, selectedIndex]);

  // Keep input focused when NOT in interactive mode
  useEffect(() => {
    if (!isBooting && !interactiveMode) {
      inputRef.current?.focus();
    }
  }, [isBooting, interactiveMode]);

  // 3. The Keyboard Listener for the Interactive Menu
  useEffect(() => {
    if (interactiveMode !== 'projects') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling when using arrows
      if (['ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(e.key)) {
        e.preventDefault(); 
      }

      if (e.key === 'ArrowUp') {
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : PROJECT_DATA.length - 1));
      } else if (e.key === 'ArrowDown') {
        setSelectedIndex(prev => (prev < PROJECT_DATA.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Enter') {
        const selected = PROJECT_DATA[selectedIndex];
        // Open the link in a new tab
        window.open(selected.url, '_blank');
        
        // Print the action to the terminal history
        setLines(prev => [
          ...prev, 
          { type: 'success', text: `> EXECUTE: ${selected.name}` },
          { type: 'system', text: `LAUNCHING EXTERNAL PROTOCOL...` }
        ]);
        
        // Exit interactive mode
        setInteractiveMode(null);
      } else if (e.key === 'Escape') {
        setLines(prev => [...prev, { type: 'error', text: `> MENU ABORTED BY USER.` }]);
        setInteractiveMode(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [interactiveMode, selectedIndex]);

  // The Advanced Boot Sequence
  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    const asciiLogo = `
   _____ __  __   ____  ____  ____ 
  / ___/ \\ \\/ /  / __ \\/ __ \\/ __ \\
  \\__ \\   \\  /  / /_/ / / / / / / /
 ___/ /   / /  / ____/ /_/ / /_/ / 
/____/   /_/  /_/    \\____/\\____/  v.9.4.1
    `;

    const bootSequence: (TerminalLine & { delay: number })[] = [
      { type: 'ascii', text: asciiLogo, delay: 100 },
      { type: 'system', text: "INIT KERNEL OVERRIDE...", delay: 1200 }, 
      { type: 'system', text: "LOADING MODULES [||||||||||||||||] 100%", delay: 1800 }, 
      { type: 'system', text: "BYPASSING GRAPHICAL USER INTERFACE...", delay: 1000 },
      { type: 'system', text: "DECRYPTING NEURAL CORE...", delay: 2500 }, 
      { type: 'success', text: "ACCESS GRANTED. SECURE CONNECTION ESTABLISHED.", delay: 600 }, 
      { type: 'system', text: " ", delay: 200 },
      { type: 'system', text: "Welcome to the root system. Type 'help' for available commands.", delay: 300 }
    ];

    let accumulatedTime = 0;
    bootSequence.forEach((item, i) => {
      accumulatedTime += item.delay;
      
      setTimeout(() => {
        const { delay, ...lineData } = item; 
        setLines(prev => [...prev, lineData]);
        
        if (i === bootSequence.length - 1) setIsBooting(false);
      }, accumulatedTime); 
    });
  }, []);

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newLines: TerminalLine[] = [{ type: 'user', text: `root@dev:~$ ${cmd}` }];

    switch (cmd) {
      case 'help':
        newLines.push({ type: 'system', text: "AVAILABLE COMMANDS:" });
        newLines.push({ type: 'system', text: "  projects  - View secure project archives (INTERACTIVE)" });
        newLines.push({ type: 'system', text: "  skills    - Load capability matrix" });
        newLines.push({ type: 'system', text: "  whoisdeveloper    - Identify current user protocol" });
        newLines.push({ type: 'system', text: "  clear     - Wipe terminal output" });
        newLines.push({ type: 'system', text: "  gui       - Reboot visual interface (Exit)" });
        break;
      case 'projects':
        newLines.push({ type: 'system', text: "INITIALIZING SECURE PROJECT SELECTOR..." });
        setLines(prev => [...prev, ...newLines]);
        // Trigger the interactive menu instead of printing static text
        setInteractiveMode('projects');
        setSelectedIndex(0);
        setInput('');
        return; 
      case 'skills':
        newLines.push({ type: 'system', text: "EXTRACTING SKILL MATRIX..." });
        newLines.push({ type: 'success', text: "> C/C++, Python, React, Next.js, FreeRTOS, Embedded IoT, Three.js" });
        break;
      case 'whoisdeveloper':
        newLines.push({ type: 'system', text: "USER CLASSIFICATION: GUEST_ENTITY" });
        newLines.push({ type: 'success', text: "HI! I am Shushant. I am currently studying in NIT Raipur" });
        newLines.push({ type: 'success', text: "I can be your co-developer. Give it a TRY." });
        break;
      case 'clear':
        setLines([]);
        setInput('');
        return;
      case 'exit':
      case 'gui':
        newLines.push({ type: 'system', text: "INITIATING GUI REBOOT SEQUENCE..." });
        setLines(prev => [...prev, ...newLines]);
        setTimeout(onClose, 800);
        return;
      default:
        newLines.push({ type: 'error', text: `bash: ${cmd}: command not found. Type 'help'.` });
    }

    setLines(prev => [...prev, ...newLines]);
    setInput('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scaleY: 0.01 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#050505] text-[#00ff41] font-mono p-4 md:p-8 overflow-hidden cursor-text flex flex-col"
      onClick={() => {
        if (!interactiveMode) inputRef.current?.focus();
      }}
    >
      <style>{`
        .crt-glow { text-shadow: 0 0 4px rgba(0, 255, 65, 0.4), 0 0 10px rgba(0, 255, 65, 0.2); }
        .crt-flicker { animation: flicker 0.15s infinite; }
        @keyframes flicker {
          0% { opacity: 0.98; }
          50% { opacity: 1; }
          100% { opacity: 0.98; }
        }
      `}</style>

      {/* TOP STATUS BAR */}
      <div className="w-full flex justify-between border-b border-[#00ff41]/30 pb-2 mb-4 text-xs md:text-sm opacity-70 crt-glow">
        <span>SYS.OVERRIDE_TERM // ROOT_ACCESS</span>
        <span className="animate-pulse">REC_●</span>
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] z-50" />
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] z-40" />

      {/* TERMINAL CONTENT */}
      <div className="flex-1 overflow-y-auto crt-glow crt-flicker pb-20 relative z-10 text-sm md:text-base pr-4">
        
        {/* Render standard lines history */}
        {lines.map((line, i) => (
          <div 
            key={i} 
            className={`whitespace-pre-wrap mb-1 
              ${line.type === 'error' ? 'text-red-500 text-shadow-none' : ''}
              ${line.type === 'success' ? 'text-[#00ffff]' : ''}
              ${line.type === 'ascii' ? 'text-[#00ff41] mb-4 font-bold leading-tight text-xs md:text-sm' : ''}
            `}
          >
            {line.text}
          </div>
        ))}

        {/* Render Interactive Menu OR Standard Input */}
        {interactiveMode === 'projects' ? (
          
          <div className="mt-4 mb-4 select-none">
            <div className="text-[#00ff41] mb-3 opacity-70 border-b border-[#00ff41]/30 inline-block pb-1">
              [ NAVIGATE: ↑/↓ ARROWS ] [ EXECUTE: ENTER ] [ ABORT: ESC ]
            </div>
            
            <div className="space-y-1">
              {PROJECT_DATA.map((proj, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <div 
                    key={proj.id} 
                    className={`flex items-center py-1.5 px-3 w-fit transition-colors ${
                      isSelected 
                        ? 'bg-[#00ffff] text-[#050505] font-bold shadow-[0_0_10px_rgba(0,255,255,0.5)]' 
                        : 'text-[#00ffff] bg-transparent'
                    }`}
                  >
                    <span className="mr-3">{isSelected ? '▶' : ' '}</span>
                    [{proj.id}] {proj.name} - STATUS: {proj.status}
                  </div>
                );
              })}
            </div>
          </div>

        ) : (
          
          !isBooting && (
            <form onSubmit={handleCommand} className="flex items-center mt-2">
              <span className="mr-2 text-[#00ff41] font-bold">root@dev:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent outline-none flex-1 text-[#00ff41] caret-transparent"
                autoComplete="off"
                spellCheck="false"
                autoFocus
              />
              <span className={`inline-block w-2.5 h-5 bg-[#00ff41] ml-1 ${input ? 'animate-none' : 'animate-pulse'}`} />
            </form>
          )

        )}

        <div ref={bottomRef} className="h-4" />
      </div>
    </motion.div>
  );
}