import React, { useEffect, useState } from 'react';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const checkPointer = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', checkPointer);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', checkPointer);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Only show on non-touch devices usually, but for this demo we render it always.
  // CSS media queries in index.html will handle hiding the default cursor.

  return (
    <>
      {/* Main Dot */}
      <div 
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-300 hidden md:block mix-blend-difference ${isHidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%)`
        }}
      >
        <div className={`bg-white rounded-full transition-all duration-300 ease-out ${isPointer ? 'w-4 h-4' : 'w-2 h-2'}`} />
      </div>

      {/* Following Ring */}
      <div 
        className={`fixed pointer-events-none z-[9998] transition-opacity duration-300 hidden md:block mix-blend-difference ${isHidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%)` // Center the ring
        }}
      >
        <div 
          className={`border border-white rounded-full transition-all duration-500 ease-out ${
            isPointer ? 'w-16 h-16 opacity-50 bg-white/10 backdrop-blur-sm' : 'w-8 h-8 opacity-100'
          }`} 
        />
      </div>
    </>
  );
};

export default Cursor;