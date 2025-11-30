import React from 'react';
import { Mail, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#050505] py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">Let's Connect.</h2>
            <p className="text-gray-400 max-w-md text-lg">
                Whether it's a Computer Engineering query or an AI experiment, I'm always open to new ideas and collaborations.
            </p>
            <a href="mailto:buisness@mannsuitx.xyz" className="inline-block mt-8 text-2xl text-brand-accent underline decoration-1 underline-offset-8 hover:text-white transition-colors">
                buisness@mannsuitx.xyz
            </a>
        </div>

        <div className="flex gap-6">
            <a href="https://instagram.com/mannatsuthar_" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Instagram size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Twitter size={20} />
            </a>
            <a href="mailto:buisness@mannsuitx.xyz" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Mail size={20} />
            </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-xs text-gray-600">
        <p>© 2025 Mannat Suthar. All Rights Reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
            <span>Portfolio</span>
            <span>Made with React</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
