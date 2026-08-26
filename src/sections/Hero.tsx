import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight, Github, Linkedin, Award, FileText } from 'lucide-react';
import { GlintCard } from '../components/GlintCard';

interface HeroProps {
  onOpenHireModal: () => void;
}

export const Hero = ({ onOpenHireModal }: HeroProps) => {
  const yearsRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLHeadingElement>(null);
  const modelsRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // 1. Text Reveal Animation for lines
    gsap.fromTo('.hero-title-word',
      { y: '100%', rotate: 3 },
      {
        y: '0%',
        rotate: 0,
        duration: 1.4,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.4
      }
    );

    gsap.fromTo('.hero-fade-in',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.8
      }
    );

    // 2. Count up stats animation
    const animateCount = (ref: React.RefObject<HTMLHeadingElement | null>, target: number) => {
      if (!ref.current) return;
      const obj = { value: 0 };
      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        delay: 1.2,
        onUpdate: () => {
          if (ref.current) {
            ref.current.innerText = `${Math.floor(obj.value)}+`;
          }
        }
      });
    };

    animateCount(yearsRef, 3);
    animateCount(projectsRef, 6); // We now showcase 6 projects!
    animateCount(modelsRef, 1);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 w-full max-w-7xl mx-auto z-10">
        
        {/* Left Typography and Introduction */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Availability Badge */}
          <div className="hero-fade-in mb-6 flex items-center gap-2.5 px-4 py-1.5 bg-green-500/10 border border-green-500/25 rounded-full w-fit">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs text-green-400 uppercase tracking-widest font-bold">
              Available for Internships
            </span>
          </div>

          {/* Main Titles */}
          <div className="relative">
            <div className="overflow-hidden h-[80px] md:h-[120px] flex items-center">
              <h1 className="hero-title-word font-display text-[15vw] md:text-8xl lg:text-9xl leading-[0.85] text-green-400 select-none uppercase">
                Data
              </h1>
            </div>
            <div className="overflow-hidden h-[80px] md:h-[120px] flex items-center">
              <h1 className="hero-title-word font-display text-[15vw] md:text-8xl lg:text-9xl leading-[0.85] text-white select-none uppercase">
                Science
              </h1>
            </div>
          </div>

          <p className="hero-fade-in text-gray-400 text-lg md:text-xl font-sans mt-8 leading-relaxed max-w-xl">
            Hi, I'm <span className="text-white font-semibold">Atanu</span>. A Data Science student at{' '}
            <span className="text-white border-b border-green-400/50 pb-0.5 font-medium">IIT Madras</span> and
            Full-Stack Developer bridging data insights and premium engineering.
          </p>

          {/* CTAs */}
          <div className="hero-fade-in flex flex-wrap gap-5 mt-10">
            <button
              onClick={onOpenHireModal}
              className="interactive-target relative group overflow-hidden bg-green-400 text-black font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-lg flex items-center gap-2 transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 shadow-[0_8px_30px_rgba(74,222,128,0.3)] hover:shadow-white/10 cursor-pointer"
            >
              Let's Talk
              <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </button>

            <a
              href="#projects"
              className="interactive-target flex items-center gap-3 border border-white/10 hover:border-green-400/50 bg-white/5 hover:bg-green-400/5 hover:text-green-400 px-7 py-4 text-sm font-semibold uppercase tracking-wider text-gray-300 rounded-lg transition-all duration-300"
            >
              View Work
            </a>
          </div>

          {/* Social icons row */}
          <div className="hero-fade-in flex items-center gap-6 mt-12">
            <a
              href="https://github.com/thezenforgex"
              target="_blank"
              rel="noreferrer"
              className="interactive-target text-gray-500 hover:text-white transition-colors duration-300"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/atanu-das-/"
              target="_blank"
              rel="noreferrer"
              className="interactive-target text-gray-500 hover:text-white transition-colors duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://g.dev/atanudas"
              target="_blank"
              rel="noreferrer"
              className="interactive-target flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-white transition-colors duration-300"
            >
              <Award className="w-4 h-4" />
              <span>G.dev</span>
            </a>
          </div>

        </div>

        {/* Right 3D Glint profile Card */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end">
          <div className="hero-fade-in w-full max-w-[340px] relative">
            {/* Ambient Background Aura behind the card */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-green-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <GlintCard className="w-full p-4 flex flex-col justify-between">
              {/* Card Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[10px] font-sans text-gray-500 uppercase tracking-widest font-bold">
                  STUDENT ID // IITM
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              </div>

              {/* Profile Image Viewport */}
              <div className="my-4 relative aspect-square rounded-xl overflow-hidden bg-[#161616] border border-white/5 group-hover:border-green-400/20 transition-colors duration-500">
                <img
                  src="/badges/profile.jpg"
                  alt="Atanu Das Profile Picture"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </div>

              {/* Card Metadata info */}
              <div className="flex flex-col gap-1 text-left mt-2">
                <h2 className="text-xl font-bold font-sans text-white tracking-wide">
                  Atanu Das
                </h2>
                <div className="flex justify-between items-center text-[11px] text-gray-400 font-sans tracking-wide">
                  <span>Data Science BS</span>
                  <span className="text-green-400 font-bold uppercase tracking-widest">Chennai, IN</span>
                </div>
              </div>
            </GlintCard>
          </div>

          {/* Quick Stats Grid underneath */}
          <div className="hero-fade-in grid grid-cols-3 gap-6 w-full max-w-[340px] mt-8 pt-6 border-t border-white/5">
            <div>
              <h3 ref={yearsRef} className="font-display text-3xl md:text-4xl text-green-400 tracking-wide">0+</h3>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Years Coding</p>
            </div>
            <div>
              <h3 ref={projectsRef} className="font-display text-3xl md:text-4xl text-green-400 tracking-wide">0+</h3>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Projects Done</p>
            </div>
            <div>
              <h3 ref={modelsRef} className="font-display text-3xl md:text-4xl text-green-400 tracking-wide">0+</h3>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">AI/ML Models</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
