import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SchematicBackground from './components/SchematicBackground';
import MagneticCursor from './components/MagneticCursor';

import GithubStats from './components/GithubStats';

export default function Home() {
  return (
    <main className="bg-neutral-950 min-h-screen relative">
      <MagneticCursor />
      <SchematicBackground />
      
      <Hero />
      <Projects />  
      <GithubStats />   
      <Contact />
    </main>
  );
}