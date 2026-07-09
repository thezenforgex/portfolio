/** @jsxRuntime classic */
// @ts-ignore: suppress missing type declarations for react in this environment
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Workaround: Provide minimal JSX typings when @types/react or react/jsx-runtime
// declarations are missing in the environment. This prevents TypeScript errors
// like "JSX element implicitly has type 'any'" during compilation.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Import sections & components
import { CustomCursor } from './components/CustomCursor';
import { BackgroundEffects } from './components/BackgroundEffects';
import { FloatingDock } from './components/FloatingDock';
import { HireMeModal } from './components/HireMeModal';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Timeline } from './sections/Timeline';
import { StatsBento } from './sections/StatsBento';
import { Contact } from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    // 2. Global Scroll Reveal animation for elements with .fade-up
    gsap.utils.toArray('.fade-up').forEach((el: any) => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      );
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="font-sans text-gray-200 bg-[#030303] selection:bg-green-400/30 selection:text-green-400 min-h-screen">
      
      {/* Immersive Utilities */}
      <CustomCursor />
      <BackgroundEffects />
      <FloatingDock />

      {/* Hire Inquiry Modal */}
      <HireMeModal
        isOpen={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
      />

      {/* Main Structural Layout */}
      <main className="relative">
        <Hero onOpenHireModal={() => setIsHireModalOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <StatsBento />
        <Contact />
      </main>

    </div>
  );
}
