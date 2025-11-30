import React, { useEffect, useState } from 'react';
import { ArrowDownRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 pt-20 relative overflow-hidden">
      {/* Background Gradient Blob */}
      <div className={`absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-accent/20 rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className="max-w-7xl mx-auto w-full z-10 flex-1 flex flex-col justify-center">
        <div className={`flex flex-col gap-2 mb-8 transition-all duration-700 delay-100 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="inline-block px-3 py-1 rounded-full border border-white/20 text-xs font-mono text-brand-accent w-fit bg-brand-gray/30 backdrop-blur-sm">
                AVAILABLE FOR PROJECTS
            </span>
        </div>

        <h1 className={`font-display font-bold text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter mb-8 transition-all duration-700 delay-200 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          MANNAT <br />
          <span className="text-gray-500">SUTHAR</span>
        </h1>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 border-t border-white/10 pt-8 transition-all duration-700 delay-300 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="md:col-span-1">
                <p className="text-gray-400 text-lg leading-relaxed">
                    Student of B.Tech Computer Engineering. <br/>
                    Prompt Engineer. <br/>
                    Explorer of Generative AI.
                </p>
            </div>
            <div className="md:col-span-1 flex flex-col justify-between">
                <p className="text-gray-500 text-sm font-mono uppercase">
                    Focus
                </p>
                <ul className="mt-2 space-y-1 text-gray-300">
                    <li>Java & C Basics</li>
                    <li>Generative AI Workflows</li>
                    <li>Modern UI/UX Concepts</li>
                </ul>
            </div>
             <div className="md:col-span-1 flex items-end justify-end">
                <a 
                  href="#projects" 
                  className="group relative flex items-center gap-4 text-xl font-medium px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
                >
                    {/* Glassy Background */}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-full group-hover:bg-white/10 transition-colors" />
                    
                    <span className="relative z-10">View Projects</span>
                    <span className="relative z-10 bg-white text-black p-2 rounded-full group-hover:bg-brand-accent group-hover:text-white transition-all transform group-hover:rotate-45">
                        <ArrowDownRight size={24} />
                    </span>
                </a>
            </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 delay-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <a href="#about" className="animate-bounce-slow flex flex-col items-center text-gray-500 hover:text-white transition-colors">
            <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
            <ChevronDown size={20} />
        </a>
      </div>
    </section>
  );
};

export default Hero;