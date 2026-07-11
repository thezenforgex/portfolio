import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { Github, ExternalLink, ChevronDown, ChevronUp, Code } from 'lucide-react';

interface Project {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl: string;
  demoUrl?: string;
  features: string[];
  challenges: string;
  architecture: string;
}

export const Projects = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const projects: Project[] = [
    {
      num: '01',
      title: 'Placement Portal',
      subtitle: 'Featured Academic Capstone',
      description: 'A comprehensive, roles-based campus recruitment portal designed to manage operations for students, recruiters, and placement officers.',
      tags: ['Python', 'Flask', 'SQLite', 'Jinja', 'FastAPI'],
      image: '/project/placement-portal.png',
      githubUrl: 'https://github.com/atanudas12-hub/MAD1-Project',
      features: [
        'Secure multi-tier login for Students, Recruiters, and Admin Officers.',
        'Automated resume filtering based on job criteria thresholds.',
        'FastAPI backend logic supporting lightweight analytical updates.'
      ],
      challenges: 'Managing concurrent student applications and syncing placement officer approvals securely without heavy databases.',
      architecture: 'Flask client-server architecture using Jinja dynamic views with a SQLite transactional layer, integrated with background REST endpoints.'
    },
    {
      num: '02',
      title: 'Odoo1',
      subtitle: 'Data Analytics & Reporting Platform',
      description: 'An interactive analysis dashboard that ingests raw sales transaction records to generate visual reports.',
      tags: ['Odoo', ''],
      image: '/project/odoo.png',
      githubUrl: 'https://github.com/sagnik328-sen/odoo',
      features: [
        'Real-time revenue metrics aggregation and forecasting charts.',
        'Data filtration by region, product type, and client demographics.',
        'CSV/Excel exports with automated formatting.'
      ],
      challenges: 'Handling real-time client side data rendering for files containing over 50,000 transaction records smoothly.',
      architecture: 'Pandas data wrangling pipelines combined with a clean Next.js dashboard template using charting libraries.'
    },
  ];

  useEffect(() => {
    // Scroll reveal cards
    gsap.fromTo('.project-launch-card',
      { y: 70, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 85%',
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

  const toggleExpand = (title: string) => {
    setExpandedProject(expandedProject === title ? null : title);
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-4 mb-20 fade-up">
        <span className="text-green-400 font-display text-xl select-none">✱</span>
        <h3 className="text-xs text-gray-500 uppercase tracking-widest font-bold font-sans">
          Selected Launchpad
        </h3>
      </div>

      {/* Projects Bento Deck */}
      <div className="projects-grid grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
        {projects.map((proj, idx) => {
          const isFeatured = idx === 0;
          const isExpanded = expandedProject === proj.title;

          return (
            <div
              key={proj.title}
              onMouseMove={handleCardMouseMove}
              className={`project-launch-card relative overflow-hidden rounded-3xl bg-[#0a0a0a]/40 border border-white/5 p-6 md:p-8 backdrop-blur-xl group hover:border-green-400/20 transition-all duration-500 flex flex-col justify-between ${isFeatured ? 'md:col-span-12' : 'md:col-span-6'
                }`}
              style={{
                ['--mouse-x' as any]: '0px',
                ['--mouse-y' as any]: '0px',
              }}
            >
              {/* Spotlight lighting */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                  background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(74, 222, 128, 0.05) 0%, transparent 80%)`,
                }}
              />

              <div className="relative z-10 flex flex-col justify-between h-full">

                {/* Viewport Frame Header (Browser Style) */}
                <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-[10px] text-gray-500 font-sans font-bold uppercase tracking-widest">
                    // RELEASE 0{proj.num}
                  </span>
                </div>

                <div className={`grid grid-cols-1 ${isFeatured ? 'lg:grid-cols-12 lg:gap-10' : 'gap-6'} items-start`}>

                  {/* Left Column: Specs */}
                  <div className={isFeatured ? 'lg:col-span-6' : ''}>

                    <span className="text-xs text-green-400 font-sans tracking-wide block mb-1">
                      {proj.subtitle}
                    </span>

                    <h4 className="text-3xl font-bold font-sans text-white uppercase tracking-wide group-hover:text-green-400 transition-colors mb-4">
                      {proj.title}
                    </h4>

                    <p className="text-gray-400 text-sm md:text-base leading-relaxed font-sans font-light mb-6">
                      {proj.description}
                    </p>

                    {/* Tags row */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/5 border border-white/5 hover:border-white/10 rounded-lg text-xs font-semibold text-gray-300 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions Panel */}
                    <div className="flex items-center gap-4 flex-wrap">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="interactive-target flex items-center gap-2 border border-white/10 hover:border-green-400/50 bg-white/5 hover:bg-green-400/5 hover:text-green-400 px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-200 transition-all duration-300"
                        data-cursor-text="Code"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>

                      <button
                        onClick={() => toggleExpand(proj.title)}
                        className="interactive-target flex items-center gap-2 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-200 transition-all duration-300 cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            <span>Hide Specs</span>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Tech Specs</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Device Mockup Frame */}
                  <div className={isFeatured ? 'lg:col-span-6 mt-6 lg:mt-0' : 'mt-4'}>
                    <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/5 bg-[#161616] group-hover:border-green-400/20 transition-all duration-500 shadow-2xl">
                      <img
                        src={proj.image}
                        alt={`${proj.title} Mockup`}
                        className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                    </div>
                  </div>

                </div>

                {/* Card Expansion Drawer */}
                {isExpanded && (
                  <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 text-left animate-modal">
                    <div>
                      <h5 className="text-xs font-bold text-green-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <Code className="w-4 h-4" />
                        <span>Technical Challenges Solved</span>
                      </h5>
                      <p className="text-xs text-gray-400 leading-relaxed font-light font-sans">
                        {proj.challenges}
                      </p>

                      <h5 className="text-xs font-bold text-green-400 uppercase tracking-widest mt-6 mb-3">
                        System Architecture
                      </h5>
                      <p className="text-xs text-gray-400 leading-relaxed font-light font-sans">
                        {proj.architecture}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-green-400 uppercase tracking-widest mb-3">
                        Key Engineering Milestones
                      </h5>
                      <ul className="space-y-3">
                        {proj.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex gap-2 text-xs text-gray-400 font-light font-sans leading-normal">
                            <span className="text-green-500 font-bold">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
