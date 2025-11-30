import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string; // Add demoUrl
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, category, description, image, tags, demoUrl }) => (
  <div className="group relative bg-brand-gray rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 reveal">
    <div className="aspect-video overflow-hidden bg-gray-800 relative">
        <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
             <a 
                href={demoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white text-black px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-brand-accent hover:text-white transition-colors"
             >
                View Demo <ArrowUpRight size={16} />
             </a>
        </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
            <span className="text-xs font-mono text-brand-accent uppercase tracking-wider">{category}</span>
            <h3 className="text-2xl font-bold mt-1 group-hover:text-brand-accent transition-colors">{title}</h3>
        </div>
        <a href="https://github.com/mannsuitxx" className="text-gray-500 hover:text-white transition-colors"><Github size={20} /></a>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="px-3 py-1 bg-white/5 text-xs rounded-full text-gray-300 border border-white/5">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Projects: React.FC = () => {
  const projects = [
    {
      title: "AI Chatbox",
      category: "Web Development",
      description: "A responsive website featuring a custom-trained Gemini AI assistant that answers questions about my skills and experience in real-time.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["React", "TypeScript", "Gemini API", "Tailwind"],
      demoUrl: "https://your-ai-chatbox-demo-url.com" // Replace with actual AI Chatbox demo URL
    },
    {
      title: "Disaster Management System Implemantation",
      category: "Java Application",
      description: "A robust AI based Implementation For Disaster In Education system For local Schools and Colleges.",
      image: "https://raw.githubusercontent.com/mannsuitxx/portfolio/7a69db5e86e40800fb2949f4f4daf6515924f805/components/proj2.png",
      tags: ["JavaScript", "Python", "DBMS" , "ReactJS" ,"tailwindCSS"],
      demoUrl: "https://pulseai-wb.netlify.app/" // Replace with actual Disaster Management System demo URL
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 reveal">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">Selected <span className="text-brand-accent">Projects</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl">
                A collection of my technical endeavors, ranging from AI integration to low-level system programming.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <div key={index} className={`reveal stagger-${index + 1}`}>
                    <ProjectCard {...project} />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
