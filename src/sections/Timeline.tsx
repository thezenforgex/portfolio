import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Briefcase, Sparkles, ExternalLink, Linkedin, Award, X, ZoomIn, ShieldCheck, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  type: 'education' | 'experience';
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  certificateImage?: string;
  certificateTitle?: string;
  certificateId?: string;
  link?: string;
  linkLabel?: string;
  verifyUrl?: string;
}

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCertificate(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
      year: 'Aug 2026 — Sep 2026',
      type: 'experience',
      title: 'LearnDepth Academy',
      subtitle: 'Machine Learning Intern',
      description: 'Successfully completed the Learning Based Machine Learning Internship Program with LearnDepth Academy, gaining intensive hands-on experience in machine learning concepts, algorithms, and project-based engineering.',
      details: [
        'Completed the Learning Based Machine Learning Internship Program with hands-on algorithm implementation.',
        'Engineered predictive models and end-to-end data workflows with practical evaluations.',
        'Awarded Certificate of Internship Program Completion (ISO 9001:2015 & MSME certified).'
      ],
      certificateImage: '/intership/learndepth.png',
      certificateTitle: 'Certificate of Internship Program Completion',
      certificateId: 'LD-INT-2026-290598',
      link: 'https://www.linkedin.com/in/atanu-das-/edit/forms/position/2998786818/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B9OAP5UHXSEq1LPxlxScPpQ%3D%3D',
      linkLabel: 'LinkedIn Post',
      verifyUrl: 'https://learndepthacademy.com/verify-certificate'
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

                  {/* Certificate preview & action links if available */}
                  {(item.certificateImage || item.link) && (
                    <div className="mt-6 pt-5 border-t border-white/5 flex flex-col gap-4">
                      {item.certificateImage && (
                        <div
                          onClick={() => setSelectedCertificate(item.certificateImage!)}
                          className="group/cert relative overflow-hidden rounded-xl border border-white/10 bg-black/60 p-3 hover:border-green-400/40 transition-all duration-300 cursor-pointer"
                        >
                          <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="relative w-full sm:w-40 h-24 shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/5">
                              <img
                                src={item.certificateImage}
                                alt={item.certificateTitle || `${item.title} Certificate`}
                                className="w-full h-full object-cover object-center group-hover/cert:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-[10px] text-white font-medium bg-black/80 px-2 py-1 rounded-md flex items-center gap-1">
                                  <ZoomIn className="w-3 h-3 text-green-400" /> Click to view
                                </span>
                              </div>
                            </div>
                            <div className="flex-1 text-left py-0.5">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest font-sans">
                                  Verified Credential
                                </span>
                                {item.certificateId && (
                                  <span className="text-[9px] font-mono text-gray-300 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                                    ID: {item.certificateId}
                                  </span>
                                )}
                                <span className="text-[9px] text-gray-500">• ISO 9001:2015 / MSME</span>
                              </div>
                              <h6 className="text-sm font-bold text-white leading-snug">
                                {item.certificateTitle || 'Certificate of Internship Program Completion'}
                              </h6>
                              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                                Learning Based Machine Learning Internship Program • LearnDepth Academy
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-3">
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="interactive-target inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0077b5]/15 hover:bg-[#0077b5]/25 border border-[#0077b5]/30 hover:border-[#0077b5]/60 text-blue-300 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 group/btn"
                          >
                            <Linkedin className="w-3.5 h-3.5 text-blue-400 group-hover/btn:scale-110 transition-transform" />
                            <span>{item.linkLabel || 'LinkedIn Post'}</span>
                            <ExternalLink className="w-3 h-3 text-blue-400/80 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </a>
                        )}

                        {item.certificateImage && (
                          <button
                            type="button"
                            onClick={() => setSelectedCertificate(item.certificateImage!)}
                            className="interactive-target inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-green-500/10 hover:bg-green-500/20 border border-green-500/25 hover:border-green-400/50 text-green-400 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer group/btn"
                          >
                            <Award className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                            <span>View Certificate</span>
                            <ZoomIn className="w-3 h-3 text-green-400/80" />
                          </button>
                        )}

                        {item.verifyUrl && (
                          <a
                            href={item.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="interactive-target inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white text-xs font-medium transition-all duration-200"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                            <span>Verify Portal</span>
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Certificate Lightbox Modal */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-modal"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative bg-[#0d0d0d] border border-white/10 rounded-2xl p-4 md:p-6 w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0_0_60px_rgba(74,222,128,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-green-400" />
                  <h5 className="text-sm font-bold text-white uppercase tracking-wider">
                    LearnDepth Academy — Certificate of Completion
                  </h5>
                </div>
                <span className="text-[10px] font-mono text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded">
                  ID: LD-INT-2026-290598
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="interactive-target text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Preview Image */}
            <div className="relative flex-1 overflow-auto flex items-center justify-center rounded-xl bg-black/60 p-2 border border-white/5">
              <img
                src={selectedCertificate}
                alt="Certificate"
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Footer with actions */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2 text-gray-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span>Verified Machine Learning Internship Program (Aug 13 — Sep 30, 2026)</span>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <span className="font-mono text-gray-300">LD-INT-2026-290598</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={selectedCertificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="LearnDepth_Internship_Certificate.png"
                  className="interactive-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-xs font-medium transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Open Full Image</span>
                </a>
                <a
                  href="https://learndepthacademy.com/verify-certificate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-xs font-medium transition-colors"
                >
                  <ShieldCheck className="w-3 h-3 text-green-400" />
                  <span>Verify at Portal</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/atanu-das-/edit/forms/position/2998786818/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B9OAP5UHXSEq1LPxlxScPpQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0077b5]/20 hover:bg-[#0077b5]/30 border border-[#0077b5]/40 text-blue-300 text-xs font-medium transition-colors"
                >
                  <Linkedin className="w-3 h-3 text-blue-400" />
                  <span>LinkedIn Post</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
