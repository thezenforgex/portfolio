import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Briefcase, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  type: 'education' | 'experience';
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  const timelineData: TimelineItem[] = [
    {
      year: '2024 — Present',
      type: 'education',
      title: 'IIT Madras',
      subtitle: 'Bachelor of Science (BS) in Data Science',
      description: 'Acquiring theoretical foundations in statistical inference, programming paradigms, machine learning engineering, and database relations.',
      details: ['Focused on Python, database modeling, and automated pipelines.', 'Actively participating in developer cohorts and hackathons.']
    },
    {
      year: '2025 — Present',
      type: 'experience',
      title: 'Independent Developer',
      subtitle: 'Building full-stack products & data models',
      description: 'Designing and deploying web applications using Python, Flask, Jinja, Next.js, and SQL, while training ML structures.',
      details: ['Successfully completed the Placement Portal MAD-1 academic product.', 'Built and hosted data scripts and predictive models.']
    },
    {
      year: '2026',
      type: 'experience',
      title: 'Seeking Internships',
      subtitle: 'Full-Stack Developer & Analyst role',
      description: 'Actively preparing and applying for development or analytical opportunities to build real-world products at scale.',
      details: ['Demonstrating robust code design with multiple frontend and backend frameworks.', 'Eager to collaborate on high-traffic databases and services.']
    }
  ];

  useEffect(() => {
    // Scroll drawing SVG path line
    const line = lineRef.current;
    if (!line) return;

    gsap.fromTo(line,
      { strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 40%',
          end: 'bottom 60%',
          scrub: true,
        }
      }
    );

    // Scroll reveal timeline blocks
    gsap.utils.toArray('.timeline-block').forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      );
    });

  }, []);

  return (
    <section id="timeline" ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto relative">

      {/* Header */}
      <div className="flex items-center gap-4 mb-20 fade-up">
        <span className="text-green-400 font-display text-xl select-none">✱</span>
        <h3 className="text-xs text-gray-500 uppercase tracking-widest font-bold font-sans">
          Cinematic Timeline
        </h3>
      </div>

      {/* Timeline Layout */}
      <div className="relative pl-8 md:pl-16">

        {/* Vertical SVG Progress Line */}
        <div className="absolute left-[15px] md:left-[31px] top-0 bottom-0 w-[2px] z-0">
          <svg className="w-full h-full" viewBox="0 0 2 1000" preserveAspectRatio="none">
            {/* Background static line */}
            <line x1="1" y1="0" x2="1" y2="1000" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
            {/* Animated drawing line */}
            <line
              ref={lineRef}
              x1="1"
              y1="0"
              x2="1"
              y2="1000"
              stroke="#4ade80"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
          </svg>
        </div>

        {/* Timeline Items */}
        <div className="space-y-16">
          {timelineData.map((item, index) => {
            const isEdu = item.type === 'education';
            return (
              <div key={index} className="timeline-block relative z-10 flex flex-col md:flex-row gap-6 md:gap-12 text-left">

                {/* Node icon bullet */}
                <div className="absolute -left-[30px] md:-left-[46px] top-1.5 w-[32px] h-[32px] rounded-full bg-[#0a0a0a] border-2 border-white/10 group-hover:border-green-400 flex items-center justify-center text-gray-400 transition-colors z-20 shadow-md shadow-black/80">
                  <div className="w-[20px] h-[20px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    {isEdu ? <GraduationCap className="w-3.5 h-3.5 text-blue-400" /> : <Briefcase className="w-3.5 h-3.5 text-green-400" />}
                  </div>
                </div>

                {/* Date Side column */}
                <div className="md:w-1/4 shrink-0 pt-2">
                  <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-gray-300 tracking-wider">
                    {item.year}
                  </div>
                </div>

                {/* Content glass Card */}
                <div className="flex-1 p-6 md:p-8 bg-[#0a0a0a]/50 border border-white/5 rounded-2xl backdrop-blur-md shadow-lg hover:border-green-400/20 transition-all duration-300">
                  <div className="flex items-center gap-2 text-xs font-bold text-green-400 uppercase tracking-widest mb-1.5">
                    {isEdu ? (
                      <span className="text-blue-400">Education</span>
                    ) : (
                      <span className="text-green-400">Experience</span>
                    )}
                  </div>

                  <h4 className="text-xl md:text-2xl font-bold font-sans text-white uppercase tracking-wide">
                    {item.title}
                  </h4>
                  <h5 className="text-sm font-medium text-gray-300 mt-1 mb-4">
                    {item.subtitle}
                  </h5>

                  <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light mb-6">
                    {item.description}
                  </p>

                  {/* Bullet details details list */}
                  <ul className="space-y-2 border-t border-white/5 pt-4">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex gap-3 text-xs text-gray-400 leading-normal">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-500/80 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
