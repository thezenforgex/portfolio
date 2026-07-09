import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { GraduationCap, Target, Sparkles, FolderKanban, Cpu, Calendar, Github } from 'lucide-react';

// Counter component that triggers count up when entering viewport
const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const duration = 2000; // 2 seconds
          const stepTime = 16; // ~60fps
          const steps = duration / stepTime;
          const increment = end / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl text-white tracking-wide">
      {count}
      {suffix}
    </span>
  );
};

export const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for mouse tilt tracking
  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);

  // Springs for smooth movement
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(rotateXVal, springConfig);
  const rotateY = useSpring(rotateYVal, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates from -0.5 to 0.5 relative to parent container
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Subtle tilt (max 8 degrees)
    rotateXVal.set(-mouseY * 16);
    rotateYVal.set(mouseX * 16);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateXVal.set(0);
    rotateYVal.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <section id="about" className="relative py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background soft glow and radial spotlights unique to About */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[60%] w-[450px] h-[450px] rounded-full bg-cyan-500/5 blur-[120px] animate-drift-slow" />
        <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[100px] animate-drift-slow" style={{ animationDelay: '-5s' }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-7 text-left flex flex-col justify-center">
          
          {/* Label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-green-400 font-display text-xl select-none">✱</span>
            <span className="text-xs text-gray-500 uppercase tracking-widest font-bold font-sans">
              Who I Am
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black leading-[1.1] text-white tracking-tight mb-8">
            Building intelligent digital experiences powered by{' '}
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent bg-[size:200%_auto] animate-gradient-sweep font-bold">
              data
            </span>
            ,{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent bg-[size:200%_auto] animate-gradient-sweep font-bold">
              design
            </span>{' '}
            &{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-green-400 bg-clip-text text-transparent bg-[size:200%_auto] animate-gradient-sweep font-bold">
              engineering
            </span>
            .
          </h2>

          {/* Clean professional description */}
          <p className="text-gray-400 text-base md:text-lg leading-relaxed font-sans font-light mb-12 max-w-2xl">
            I am a Data Science student at IIT Madras and a full-stack engineer who is passionate about mining actionable insights and translating them into pixel-perfect layouts. I focus on deploying end-to-end applications that unify algorithmic intelligence and clean, fluid client interfaces.
          </p>

          {/* Bento Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            
            {/* Card 1: Education */}
            <div className="interactive-target group/bento relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 hover:border-green-400/20 p-6 backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1">
              {/* Radial hover light */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center text-green-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1 font-sans">
                    Education
                  </h4>
                  <p className="text-base font-bold text-white leading-tight">IIT Madras</p>
                  <p className="text-xs text-gray-500 mt-1">B.S. Data Science (2nd Year)</p>
                </div>
              </div>
            </div>

            {/* Card 2: Focus */}
            <div className="interactive-target group/bento relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/20 p-6 backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1 font-sans">
                    Focus Area
                  </h4>
                  <p className="text-base font-bold text-white leading-tight">Full Stack Development</p>
                  <p className="text-xs text-gray-500 mt-1">Artificial Intelligence Integration</p>
                </div>
              </div>
            </div>

          </div>

          {/* Animated Stats Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/5">
            <div>
              <Counter value={12} suffix="+" />
              <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mt-1.5 font-sans">
                Projects
              </p>
            </div>
            <div>
              <Counter value={25} suffix="+" />
              <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mt-1.5 font-sans">
                Technologies
              </p>
            </div>
            <div>
              <Counter value={2} suffix="+" />
              <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mt-1.5 font-sans">
                Years Learning
              </p>
            </div>
            <div>
              <Counter value={100} suffix="+" />
              <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mt-1.5 font-sans">
                Contributions
              </p>
            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: STACKED FLOATING GLASS CARDS ================= */}
        <div className="lg:col-span-5 flex items-center justify-center">
          
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[360px] aspect-[4/5] cursor-pointer"
            style={{
              perspective: 1200,
            }}
          >
            {/* Soft blue/cyan neon ambient glow behind cards */}
            <div className="absolute -inset-10 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none z-0" />
            
            {/* Entire Stack wrapper inheriting tilt coordinates */}
            <motion.div
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full h-full"
            >
              
              {/* === CARD 3: BACK DEPTH LAYER === */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  z: -40,
                }}
                className={`absolute inset-0 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md shadow-2xl transition-all duration-500 pointer-events-none ${
                  isHovered 
                    ? 'translate-x-[45px] translate-y-[45px] opacity-40 shadow-blue-500/10' 
                    : 'translate-x-[20px] translate-y-[20px] opacity-60'
                }`}
              />

              {/* === CARD 2: MIDDLE DEPTH LAYER === */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  z: -20,
                }}
                className={`absolute inset-0 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-lg shadow-2xl transition-all duration-500 pointer-events-none ${
                  isHovered 
                    ? 'translate-x-[25px] translate-y-[25px] opacity-70 shadow-blue-500/5' 
                    : 'translate-x-[10px] translate-y-[10px] opacity-80'
                }`}
              />

              {/* === CARD 1: FRONT LAYER (WITH CONTENT) === */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut",
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  z: 20,
                }}
                className={`absolute inset-0 rounded-3xl border bg-black/40 backdrop-blur-2xl p-8 flex flex-col justify-between text-left transition-all duration-500 select-none ${
                  isHovered 
                    ? 'border-cyan-400/30 -translate-y-[15px] shadow-[0_30px_60px_-15px_rgba(34,211,238,0.25)]' 
                    : 'border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]'
                }`}
              >
                
                {/* Header Badge */}
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest font-sans">
                      Independent Developer
                    </span>
                    <span className="text-xs font-bold text-white tracking-wide font-sans">
                      AI Enthusiast
                    </span>
                  </div>
                  <Cpu className="w-5 h-5 text-cyan-400/80" />
                </div>

                {/* Bullets List */}
                <div className="my-6 space-y-3.5">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    <span className="text-xs font-semibold text-gray-300">Full Stack Development</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    <span className="text-xs font-semibold text-gray-300">Data Science</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    <span className="text-xs font-semibold text-gray-300">UI Engineering</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    <span className="text-xs font-semibold text-gray-300">Machine Learning</span>
                  </div>
                </div>

                {/* Description Bottom Paragraph */}
                <div className="border-t border-white/5 pt-4">
                  <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed font-sans font-light">
                    Building products that solve real-world problems through thoughtful design, scalable engineering and intelligent systems.
                  </p>
                </div>

              </motion.div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
