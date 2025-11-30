import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'AI Chat', href: '#ai-chat', id: 'ai-chat' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Handle Scroll for global navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to track active section
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
            // Find the entry with the highest intersection ratio
            // With the tight rootMargin, usually only one or two will exist, 
            // and the one 'more' in the center wins.
            const mostVisible = visibleEntries.reduce((prev, current) => {
                return (prev.intersectionRatio > current.intersectionRatio) ? prev : current;
            });

            const targetId = mostVisible.target.id;

            if (targetId === 'hero') {
                setActiveTab(''); // No highlight on hero
            } else {
                setActiveTab(targetId);
            }
        }
    };

    const observer = new IntersectionObserver(handleIntersect, { 
      // This creates a narrow "scanline" in the middle 10% of the screen
      // Top 45% and Bottom 45% are ignored. 
      // Only sections passing through the center trigger the highlight.
      rootMargin: "-45% 0px -45% 0px", 
      threshold: 0
    });

    ['hero', 'about', 'projects', 'ai-chat', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Calculate Pill Position and Size (handles Active Tab & Window Resize)
  useEffect(() => {
    const updatePillPosition = () => {
        if (activeTab && navRefs.current[activeTab] && navContainerRef.current) {
            const activeLink = navRefs.current[activeTab];
            
            // We need the offset relative to the container
            const relativeLeft = activeLink!.offsetLeft;
            const width = activeLink!.offsetWidth;

            setPillStyle({
                left: relativeLeft,
                width: width,
                opacity: 1
            });
        } else {
            // If no active tab (e.g. at Hero), fade out the pill
            setPillStyle(prev => ({ ...prev, opacity: 0 }));
        }
    };

    // Run immediately when activeTab changes
    updatePillPosition();

    // Also run on resize to keep pill aligned
    window.addEventListener('resize', updatePillPosition);
    return () => window.removeEventListener('resize', updatePillPosition);

  }, [activeTab]); 

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      
      {/* 
          Desktop Floating Dock 
          - Pointer events auto enabled on the dock itself 
      */}
      <div 
        className={`pointer-events-auto hidden md:flex items-center p-1.5 rounded-full border transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="flex items-center gap-8 px-6 mr-4 border-r border-white/10">
             <a href="#" className="text-xl font-display font-bold tracking-tighter hover:text-white transition-colors">
                MS.
             </a>
        </div>

        <div className="relative flex items-center" ref={navContainerRef}>
            {/* The "Water" Glass Highlight Pill */}
            <div 
                className="absolute top-0 bottom-0 rounded-full bg-white/10 backdrop-blur-md border border-white/5 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ 
                    left: `${pillStyle.left}px`, 
                    width: `${pillStyle.width}px`, 
                    opacity: pillStyle.opacity,
                    height: '100%' 
                }}
            />

            {navLinks.map((link) => (
                <a
                key={link.name}
                href={link.href}
                // @ts-ignore
                ref={el => navRefs.current[link.id] = el}
                className={`relative z-10 px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                    activeTab === link.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
                >
                {link.name}
                </a>
            ))}
        </div>
      </div>

      {/* Mobile Header Layout */}
      <div className={`pointer-events-auto md:hidden absolute top-0 left-0 right-0 p-6 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/5' : ''}`}>
         <div className="text-xl font-display font-bold tracking-tighter">MS.</div>
         <button 
          className="text-white z-50 relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Full Screen Menu */}
      <div className={`pointer-events-auto md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="h-full flex flex-col items-center justify-center space-y-8">
             {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 hover:to-brand-accent transition-all tracking-tight"
                style={{ transitionDelay: `${100 + idx * 50}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
        </div>
      </div>

    </nav>
  );
};

export default Navbar;