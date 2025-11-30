import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Projects from './components/Projects';
import AIChat from './components/AIChat';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

const App: React.FC = () => {
  useEffect(() => {
    // Scroll animation observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    // Small delay to ensure elements are mounted in the DOM
    const timer = setTimeout(() => {
      const hiddenElements = document.querySelectorAll('.reveal');
      hiddenElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Keyboard Navigation Logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        const sections = Array.from(document.querySelectorAll('section, footer'));
        const currentScroll = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        // Find current section index based on scroll position
        // A section is "current" if its top is near the current scroll position
        let currentIndex = sections.findIndex(section => {
          const rect = section.getBoundingClientRect();
          return rect.top >= -viewportHeight / 2 && rect.top < viewportHeight / 2;
        });

        if (currentIndex === -1) currentIndex = 0;

        let nextIndex = currentIndex;

        if (e.key === 'ArrowDown') {
          nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else if (e.key === 'ArrowUp') {
          nextIndex = Math.max(currentIndex - 1, 0);
        }

        if (nextIndex !== currentIndex) {
          sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-brand-dark min-h-screen text-brand-light font-sans selection:bg-brand-accent selection:text-white overflow-x-hidden relative cursor-none">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <BentoGrid />
        <Projects />
        <AIChat />
      </main>
      <Footer />
    </div>
  );
};

export default App;