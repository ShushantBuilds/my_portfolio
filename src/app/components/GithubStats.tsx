'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
  { ssr: false } // This completely disables server-side rendering for this component
);

const techStack = [
  "C/C++", "Python", "React.js", "Next.js", "JavaScript", 
  "TailwindCSS", "Node.js", "Django", "Flutter", 
  "MySQL", "MongoDB", "Google Cloud", "Arduino"
];

export default function GithubStats() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 border-t border-white/10">
      
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* LEFT: Live GitHub Calendar */}
        <div className="w-full md:w-2/3 bg-neutral-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-3xl font-bold text-white">Contribution Activity</h3>
            <span className="w-3 h-3 rounded-full bg-[#00ff41] animate-pulse" />
          </div>
          
          <div className="overflow-x-auto pb-4">
            <GitHubCalendar 
              username="ShushantBuilds" // Your exact GitHub username
              colorScheme="dark"
              blockSize={14}
              blockMargin={6}
              fontSize={12}
              theme={{
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#00ff41'], // Custom matrix green theme
              }}
            />
          </div>
        </div>

        {/* RIGHT: Tech Stack */}
        <div className="w-full md:w-1/3 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-white mb-6">Tech Stack & Arsenal</h3>
          
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white/5 hover:bg-[#00ff41]/20 border border-white/10 hover:border-[#00ff41]/50 text-neutral-300 hover:text-[#00ff41] px-4 py-2 rounded-lg font-mono text-sm transition-colors cursor-default"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}