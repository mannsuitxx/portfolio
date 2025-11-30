import React from 'react';
import { Code, Cpu, Terminal, GraduationCap, Github, Linkedin, Database } from 'lucide-react';

const BentoGrid: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex items-end justify-between reveal">
             <h2 className="font-display text-4xl md:text-5xl font-bold">About & <span className="text-gray-600">Skills</span></h2>
             <span className="text-gray-500 hidden md:block">Based in India</span>
        </div>
       
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-3 gap-4 h-auto md:h-[800px]">
          
          {/* Item 1: Main Focus - AI */}
          <div className="reveal stagger-1 md:col-span-2 md:row-span-2 bg-brand-gray rounded-3xl p-8 relative group overflow-hidden border border-white/5 hover:border-brand-accent/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-purple-900/20 opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="bg-black/50 backdrop-blur-md w-fit p-3 rounded-full border border-white/10">
                    <Cpu className="text-brand-accent" />
                </div>
                <div className="mt-8 md:mt-0">
                    <h3 className="text-3xl font-bold mb-2">Generative AI Specialist</h3>
                    <p className="text-gray-300 leading-relaxed">
                        I specialize in crafting complex system instructions and prompts to make Large Language Models behave with human-like reasoning. Passionate about bridging the gap between raw compute and human creativity.
                    </p>
                </div>
            </div>
          </div>

          {/* Item 2: Skills - Languages */}
          <div className="reveal stagger-2 md:col-span-1 md:row-span-1 bg-[#1a1a1a] rounded-3xl p-6 border border-white/5 flex flex-col justify-between hover:bg-[#202020] transition-colors group">
            <div className="flex justify-between items-start">
                <Code className="text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-gray-500 font-mono">CORE</span>
            </div>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="font-mono text-sm">Java</span>
                        <span className="text-xs text-gray-500">Basics</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden">
                        <div className="bg-emerald-400 h-1 rounded-full w-[40%] group-hover:w-[50%] transition-all duration-1000"></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="font-mono text-sm">C Language</span>
                        <span className="text-xs text-gray-500">Intermediate</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden">
                        <div className="bg-blue-400 h-1 rounded-full w-[60%] group-hover:w-[70%] transition-all duration-1000"></div>
                    </div>
                </div>
            </div>
          </div>

          {/* Item 3: Education */}
          <div className="reveal stagger-3 md:col-span-1 md:row-span-1 bg-gradient-to-br from-brand-accent to-brand-purple rounded-3xl p-6 text-white flex flex-col justify-between overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <GraduationCap size={100}/>
             </div>
             <GraduationCap size={32} className="opacity-80"/>
             <div className="relative z-10">
                <p className="text-xs opacity-70 uppercase font-bold tracking-wider mb-1">Education</p>
                <p className="font-bold text-xl leading-tight">B.Tech Computer Engineering</p>
                <p className="text-sm opacity-90 mt-1">1st Year Student</p>
             </div>
          </div>

          {/* Item 4: Profile */}
          <div className="reveal stagger-1 md:col-span-1 md:row-span-2 bg-[#111] rounded-3xl p-8 border border-white/5 flex flex-col items-center text-center justify-center gap-4 hover:border-white/20 transition-all group">
             <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 relative">
                 <img src="https://raw.githubusercontent.com/mannsuitxx/portfolio/refs/heads/main/components/1756481535509.jpg" alt="Mannat" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
             </div>
             <div>
                 <h4 className="font-display font-bold text-xl">Mannat Suthar</h4>
                 <p className="text-sm text-gray-400 mt-2">Integrating logic with creativity. Exploring the boundaries of code.</p>
             </div>
             <div className="flex gap-4 mt-2">
                 <a href="https://github.com/mannsuitxx" className="p-2 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors"><Github size={18} /></a>
                 <a href="https://linkedin.com/mannatsuthar" className="p-2 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors"><Linkedin size={18} /></a>
             </div>
          </div>

          {/* Item 5: Prompt Engineering Info */}
          <div className="reveal stagger-2 md:col-span-2 md:row-span-1 bg-[#1a1a1a] rounded-3xl p-6 flex items-center justify-between border border-white/5 group hover:bg-[#222] transition-colors cursor-pointer">
             <div className="flex items-center gap-4">
                 <div className="p-4 bg-brand-dark rounded-2xl text-orange-400 group-hover:rotate-12 transition-transform">
                     <Terminal />
                 </div>
                 <div>
                     <h3 className="text-xl font-bold group-hover:text-orange-400 transition-colors">Prompt Engineering</h3>
                     <p className="text-sm text-gray-400">Optimizing LLM outputs for creative workflows</p>
                 </div>
             </div>
          </div>

           {/* Item 6: Tech Stack Marquee */}
           <div className="reveal stagger-3 md:col-span-1 md:row-span-1 bg-[#0f0f0f] rounded-3xl p-6 border border-white/5 flex flex-col justify-center overflow-hidden relative group">
               <p className="text-xs text-center text-gray-500 uppercase tracking-widest mb-4">Tech Stack</p>
               <div className="flex flex-wrap gap-2 justify-center">
                   {['React', 'Gemini API', 'Tailwind', 'Git', 'Java', 'C++', 'Node.js'].map((tech, i) => (
                       <span key={tech} className="px-3 py-1 bg-white/5 text-xs rounded-lg border border-white/5 text-gray-300 hover:bg-white/10 hover:border-white/20 transition-colors cursor-default" style={{ transitionDelay: `${i * 50}ms` }}>
                           {tech}
                       </span>
                   ))}
               </div>
           </div>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
