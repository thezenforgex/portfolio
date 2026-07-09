import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Skill {
  name: string;
  color: string;
  level: string; // e.g. 'Advanced', 'Intermediate', etc.
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
  gridClass?: string;
}

export const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const categories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      description: 'Designing high-fidelity, semantic, and modern interfaces.',
      gridClass: 'md:col-span-6 lg:col-span-7',
      skills: [
        { name: 'HTML5', color: '#e34f26', level: 'Advanced' },
        { name: 'CSS3', color: '#1572b6', level: 'Advanced' },
        { name: 'JavaScript', color: '#f7df1e', level: 'Advanced' },
        { name: 'Jinja Templating', color: '#b41717', level: 'Intermediate' },
        { name: 'Bootstrap', color: '#7952b3', level: 'Advanced' },
        { name: 'React.js', color: '#61dafb', level: 'Intermediate' },
        { name: 'Tailwind CSS', color: '#38bdf8', level: 'Advanced' }
      ]
    },
    {
      title: 'Backend & Logic',
      description: 'Building secure, modular servers and data integration pipelines.',
      gridClass: 'md:col-span-6 lg:col-span-5',
      skills: [
        { name: 'Python', color: '#3776ab', level: 'Advanced' },
        { name: 'Flask', color: '#ffffff', level: 'Advanced' },
        { name: 'FastAPI', color: '#009688', level: 'Intermediate' },
        { name: 'Node.js', color: '#339933', level: 'Basic' }
      ]
    },
    {
      title: 'Databases & Storage',
      description: 'Structuring relations and optimized indexing for query speed.',
      gridClass: 'md:col-span-6 lg:col-span-5',
      skills: [
        { name: 'MySQL', color: '#4479a1', level: 'Advanced' },
        { name: 'PostgreSQL', color: '#336791', level: 'Intermediate' },
        { name: 'SQLite', color: '#003b57', level: 'Advanced' }
      ]
    },
    {
      title: 'Tools & Ecosystem',
      description: 'Version control, cloud infrastructure, and designs.',
      gridClass: 'md:col-span-6 lg:col-span-7',
      skills: [
        { name: 'Git', color: '#f05032', level: 'Advanced' },
        { name: 'GitHub', color: '#ffffff', level: 'Advanced' },
        { name: 'Google Cloud Platform', color: '#4285f4', level: 'Intermediate' },
        { name: 'Figma', color: '#f24e1e', level: 'Advanced' },
        { name: 'VS Code', color: '#007acc', level: 'Advanced' }
      ]
    }
  ];

  useEffect(() => {
    // Scroll reveal for cards
    gsap.fromTo('.skills-bento-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-bento-grid',
          start: 'top 80%',
        }
      }
    );
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="skills" ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-16 fade-up">
        <span className="text-green-400 font-display text-xl select-none">✱</span>
        <h3 className="text-xs text-gray-500 uppercase tracking-widest font-bold font-sans">
          Technical Stack
        </h3>
      </div>

      {/* Bento Grid */}
      <div className="skills-bento-grid grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {categories.map((category, idx) => (
          <div
            key={category.title}
            onMouseMove={handleCardMouseMove}
            className={`skills-bento-card relative overflow-hidden rounded-3xl bg-[#0a0a0a]/40 border border-white/5 p-8 md:p-10 backdrop-blur-xl group hover:border-green-400/20 transition-all duration-500 flex flex-col justify-between ${category.gridClass}`}
            style={{
              // Spotlight effect variable coordinates
              ['--mouse-x' as any]: '0px',
              ['--mouse-y' as any]: '0px',
            }}
          >
            {/* Spotlight radial glow */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(74, 222, 128, 0.08) 0%, transparent 80%)`,
              }}
            />

            <div>
              {/* Header */}
              <span className="text-[10px] text-gray-500 font-sans font-bold uppercase tracking-widest block mb-1">
                // LAYER 0{idx + 1}
              </span>
              <h4 className="text-2xl font-bold font-sans text-white mb-2 uppercase tracking-wide group-hover:text-green-400 transition-colors">
                {category.title}
              </h4>
              <p className="text-gray-400 text-sm font-sans font-light leading-relaxed mb-8 max-w-md">
                {category.description}
              </p>
            </div>

            {/* Badges container */}
            <div className="flex flex-wrap gap-3 z-10">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="interactive-target group/badge flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/5 hover:border-white/20 rounded-xl transition-all duration-300 hover:scale-105 select-none"
                >
                  {/* Skill dot color */}
                  <span
                    className="w-2.5 h-2.5 rounded-full block relative"
                    style={{ backgroundColor: skill.color }}
                  >
                    {/* Pulsing indicator core */}
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
                      style={{ backgroundColor: skill.color }}
                    />
                  </span>
                  
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-gray-200 group-hover/badge:text-white transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">
                      {skill.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
      
    </section>
  );
};
