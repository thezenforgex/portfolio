import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;

    // Set initial position out of screen
    gsap.set([ring, dot], { xPercent: -50, yPercent: -50 });

    const xRingTo = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
    const yRingTo = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });
    
    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      setIsHidden(false);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
      xDotTo(e.clientX);
      yDotTo(e.clientY);
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    const onMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target or parent is a magnetic element
      const interactiveEl = target.closest('a, button, [role="button"], .interactive-target');
      
      if (interactiveEl) {
        setIsHovered(true);
        
        // Check for custom cursor text
        const text = interactiveEl.getAttribute('data-cursor-text');
        if (text) {
          setCursorText(text);
        } else {
          setCursorText('');
        }

        // Magnetic effect if it has magnetic class
        if (interactiveEl.classList.contains('magnetic')) {
          const rect = interactiveEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          gsap.to(ring, {
            x: centerX,
            y: centerY,
            width: rect.width + 16,
            height: rect.height + 16,
            borderRadius: interactiveEl.classList.contains('rounded-full') ? '50%' : '12px',
            backgroundColor: 'rgba(74, 222, 128, 0.1)',
            borderColor: 'rgba(74, 222, 128, 0.4)',
            duration: 0.3,
            overwrite: 'auto'
          });
          
          gsap.to(dot, {
            opacity: 0,
            duration: 0.2
          });
          return;
        }
        
        // Standard interactive hover: expand ring, hide dot
        gsap.to(ring, {
          width: text ? 90 : 60,
          height: text ? 90 : 60,
          backgroundColor: text ? 'rgba(255, 255, 255, 0.95)' : 'rgba(74, 222, 128, 0.15)',
          borderColor: text ? 'rgba(255, 255, 255, 0.95)' : 'rgba(74, 222, 128, 0.6)',
          duration: 0.3,
          overwrite: 'auto'
        });
        
        gsap.to(dot, {
          scale: 0,
          duration: 0.2,
          overwrite: 'auto'
        });

      } else {
        // Reset to default
        setIsHovered(false);
        setCursorText('');
        
        gsap.to(ring, {
          width: 24,
          height: 24,
          backgroundColor: 'transparent',
          borderColor: 'rgba(74, 222, 128, 0.5)',
          borderRadius: '50%',
          duration: 0.3,
          overwrite: 'auto'
        });
        
        gsap.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          overwrite: 'auto'
        });
      }
    };

    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 rounded-full border border-green-400 pointer-events-none z-[9999] mix-blend-screen flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '24px',
          height: '24px',
          transition: 'background-color 0.2s, border-color 0.2s, opacity 0.2s ease',
          backgroundColor: 'transparent',
          boxShadow: isHovered && !cursorText ? '0 0 15px rgba(74, 222, 128, 0.3)' : 'none',
          opacity: isHidden ? 0 : 1,
        }}
      >
        {cursorText && (
          <span className="text-black font-sans text-xs font-bold uppercase tracking-wider scale-100 select-none">
            {cursorText}
          </span>
        )}
      </div>

      {/* Inner Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-green-400 rounded-full pointer-events-none z-[9999] mix-blend-screen -translate-x-1/2 -translate-y-1/2"
        style={{
          boxShadow: '0 0 8px rgba(74, 222, 128, 0.8)',
          opacity: isHidden ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      />
    </>
  );
};
