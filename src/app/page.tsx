import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SchematicBackground from './components/SchematicBackground';
import MagneticCursor from './components/MagneticCursor';

// Import both options here 👇
import SystemTerminal from './components/SystemTerminal';
// import SystemAccordion from './components/SystemAccordion';

export default function Home() {
  return (
    <main className="bg-neutral-950 min-h-screen relative">
      <MagneticCursor />
      <SchematicBackground />
      
      <Hero />
      <Projects />
      
      {/* 🚀 TEST OPTIONS ONE BY ONE 🚀 */}
      
      {/* Test Option A (comment this line when testing B) */}
      <SystemTerminal />
      
      {/* Test Option B (uncomment this line to test B) */}
      {/* <SystemAccordion /> */}
      
      <Contact />
    </main>
  );
}