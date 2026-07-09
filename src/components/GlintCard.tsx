import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface GlintCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlintCard = ({ children, className = '' }: GlintCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glint = glintRef.current;
    if (!card || !glint) return;

    // Reset properties to default
    gsap.set(card, { transformPerspective: 1000 });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse position relative to the element (from -0.5 to 0.5)
      const mouseX = (e.clientX - rect.left) / width - 0.5;
      const mouseY = (e.clientY - rect.top) / height - 0.5;

      // Tilts
      const tiltX = -mouseY * 20; // max 10deg rotation
      const tiltY = mouseX * 20;  // max 10deg rotation

      // Set tilts
      gsap.to(card, {
        rotateX: tiltX,
        rotateY: tiltY,
        duration: 0.25,
        ease: "power2.out"
      });

      // Shine glint reflection position (from -50% to 150%)
      const glintX = (mouseX + 0.5) * 200 - 50;
      const glintY = (mouseY + 0.5) * 200 - 50;

      gsap.to(glint, {
        background: `radial-gradient(circle at ${glintX}% ${glintY}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 60%)`,
        duration: 0.25,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      // Smoothly return card to original position
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "elastic.out(1.2, 0.4)"
      });

      // Fade out glint
      gsap.to(glint, {
        background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)',
        duration: 0.6,
        ease: "power2.out"
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl bg-[#0d0d0d]/40 border border-white/10 backdrop-blur-md shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-green-400/20 group ${className}`}
      style={{
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Glint glare layer */}
      <div
        ref={glintRef}
        className="absolute inset-0 pointer-events-none z-10 select-none transition-opacity duration-300"
        style={{
          mixBlendMode: 'overlay'
        }}
      />
      {/* Content wrapper with perspective translation */}
      <div 
        style={{ transform: 'translateZ(20px)' }}
        className="relative z-20 h-full w-full"
      >
        {children}
      </div>
    </div>
  );
};
