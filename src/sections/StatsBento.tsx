import React, { useEffect } from 'react';
import gsap from 'gsap';
import { Github, Code2, Trophy, ArrowUpRight, Award, CloudLightning } from 'lucide-react';

export const StatsBento = () => {
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  useEffect(() => {
    gsap.fromTo('.bento-achieve-card',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.bento-achieve-grid',
          start: 'top 85%',
        }
      }
    );
  }, []);

  return (
    <section id="credentials" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-4 mb-16 fade-up">
        <span className="text-green-400 font-display text-xl select-none">✱</span>
        <h3 className="text-xs text-gray-500 uppercase tracking-widest font-bold font-sans">
          Achievements & Coding Profiles
        </h3>
      </div>

      {/* Grid */}
      <div className="bento-achieve-grid grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">

        {/* --- LEETCODE --- */}
        <div
          onMouseMove={handleCardMouseMove}
          className="bento-achieve-card md:col-span-12 lg:col-span-7 relative overflow-hidden rounded-3xl bg-[#0a0a0a]/40 border border-white/5 p-6 md:p-8 backdrop-blur-xl group hover:border-yellow-400/20 transition-all duration-500"
          style={{
            ['--mouse-x' as any]: '0px',
            ['--mouse-y' as any]: '0px',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
            style={{
              background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(234, 179, 8, 0.06) 0%, transparent 80%)`,
            }}
          />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
              <div>
                <span className="text-[10px] text-gray-500 font-sans tracking-wider block mb-1">leetcode.com/u/atanudas12-hub</span>
                <h4 className="text-2xl font-bold font-sans text-white uppercase tracking-wide group-hover:text-yellow-400 transition-colors">LeetCode Profile</h4>
              </div>
              <a
                href="https://leetcode.com/u/atanudas12-hub/"
                target="_blank"
                rel="noreferrer"
                className="interactive-target flex items-center gap-2 border border-white/10 hover:border-yellow-400/40 bg-white/5 hover:bg-yellow-400/5 hover:text-yellow-400 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-300 transition-all duration-300"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Visit LeetCode</span>
              </a>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/5 bg-black/60 p-4">
              <img
                src="https://leetcard.jacoblin.cool/atanudas12-hub?theme=dark&font=Inter&ext=heatmap"
                alt="Atanu Das LeetCode Stats"
                className="w-full h-auto opacity-95 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* --- HACKERRANK --- */}
        <div
          onMouseMove={handleCardMouseMove}
          className="bento-achieve-card md:col-span-12 lg:col-span-5 relative overflow-hidden rounded-3xl bg-[#0a0a0a]/40 border border-white/5 p-6 md:p-8 backdrop-blur-xl group hover:border-green-400/20 transition-all duration-500"
          style={{
            ['--mouse-x' as any]: '0px',
            ['--mouse-y' as any]: '0px',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
            style={{
              background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(74, 222, 128, 0.06) 0%, transparent 80%)`,
            }}
          />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
              <div>
                <span className="text-[10px] text-gray-500 font-sans tracking-wider block mb-1">hackerrank.com/atanudas120706</span>
                <h4 className="text-2xl font-bold font-sans text-white uppercase tracking-wide group-hover:text-green-400 transition-colors">HackerRank</h4>
              </div>
            </div>

            <a
              href="https://www.hackerrank.com/profile/atanudas120706"
              target="_blank"
              rel="noreferrer"
              className="interactive-target block rounded-2xl border border-white/5 bg-black/60 p-6 transition-all duration-300 hover:border-green-400/30"
            >
              <div className="flex flex-col justify-between gap-8 min-h-[160px]">
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-400/10 text-green-400">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-green-400 font-bold">Certification Profile</p>
                  <h5 className="mt-2 text-xl font-bold text-white tracking-wide uppercase">atanudas120706</h5>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs">
                  <span className="text-gray-500">View certificates & skill badges</span>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* --- GITHUB CONTRIBUTION --- */}
        <div
          onMouseMove={handleCardMouseMove}
          className="bento-achieve-card md:col-span-12 relative overflow-hidden rounded-3xl bg-[#0a0a0a]/40 border border-white/5 p-6 md:p-8 backdrop-blur-xl group hover:border-green-400/20 transition-all duration-500"
          style={{
            ['--mouse-x' as any]: '0px',
            ['--mouse-y' as any]: '0px',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(74, 222, 128, 0.05) 0%, transparent 80%)`,
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <span className="text-[10px] text-gray-500 font-sans tracking-wider block mb-1">github.com/atanudas12-hub</span>
              <h4 className="text-2xl font-bold font-sans text-white uppercase tracking-wide">Contribution Chart</h4>
            </div>
            <a
              href="https://github.com/thezenforgex"
              target="_blank"
              rel="noreferrer"
              className="interactive-target flex items-center gap-2 border border-white/10 hover:border-green-400/40 bg-white/5 hover:bg-green-400/5 hover:text-green-400 px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-200 transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              <span>Visit GitHub</span>
            </a>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/5 bg-black/60 p-5">
            <img
              src="https://ghchart.rshah.org/4ade80/thezenforgex"
              alt="Atanu Das GitHub contribution chart"
              className="min-w-[760px] w-full h-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
              loading="lazy"
            />
          </div>
        </div>

        {/* --- GOOGLE DEVELOPERS PROFILE --- */}
        <div
          onMouseMove={handleCardMouseMove}
          className="bento-achieve-card md:col-span-12 lg:col-span-6 relative overflow-hidden rounded-3xl bg-[#0a0a0a]/40 border border-white/5 p-6 md:p-8 backdrop-blur-xl group hover:border-blue-400/20 transition-all duration-500"
          style={{
            ['--mouse-x' as any]: '0px',
            ['--mouse-y' as any]: '0px',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
            style={{
              background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.06) 0%, transparent 80%)`,
            }}
          />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] text-gray-500 font-sans tracking-wider block mb-1">g.dev/atanudas</span>
              <h4 className="text-2xl font-bold font-sans text-white uppercase tracking-wide group-hover:text-blue-400 transition-colors mb-6">Google Developer Profile</h4>
            </div>

            <a
              href="https://g.dev/atanudas"
              target="_blank"
              rel="noreferrer"
              className="interactive-target flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 rounded-2xl border border-white/5 bg-black/60 p-6 transition-all duration-300 hover:border-blue-400/30"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-2xl font-black text-blue-500 shadow-md">
                  G
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Google for Developers</p>
                  <p className="text-lg font-bold text-white leading-tight mt-0.5">Atanu Das</p>
                  <p className="text-xs text-gray-400">g.dev/atanudas</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 rounded-xl border border-white/10 hover:border-blue-400 bg-white/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-200 group-hover:text-blue-400 transition-all duration-300">
                <span>View</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>
        </div>

        {/* --- GOOGLE CLOUD SKILLS --- */}
        <div
          onMouseMove={handleCardMouseMove}
          className="bento-achieve-card md:col-span-12 lg:col-span-6 relative overflow-hidden rounded-3xl bg-[#0a0a0a]/40 border border-white/5 p-6 md:p-8 backdrop-blur-xl group hover:border-blue-500/20 transition-all duration-500"
          style={{
            ['--mouse-x' as any]: '0px',
            ['--mouse-y' as any]: '0px',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
            style={{
              background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(37, 99, 235, 0.06) 0%, transparent 80%)`,
            }}
          />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] text-gray-500 font-sans tracking-wider block mb-1">Google Cloud Credentials</span>
              <h4 className="text-2xl font-bold font-sans text-white uppercase tracking-wide group-hover:text-blue-400 transition-colors mb-6">Skills Achievements</h4>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center rounded-2xl border border-white/5 bg-black/60 p-6">
              <a
                href="https://www.skills.google/public_profiles/b3b7964e-3a87-4a1d-92ca-b6da0a7f0164/badges/22907787"
                target="_blank"
                rel="noreferrer"
                className="interactive-target shrink-0 relative group/badge w-24 h-24 hover:scale-105 transition-transform duration-300"
              >
                <img
                  src="/google/google1.png"
                  alt="Arcade Holistic Infrastructure Badge"
                  className="w-full h-full object-contain"
                />
              </a>
              <div className="text-left flex-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1">
                  <CloudLightning className="w-3.5 h-3.5" />
                  <span>Google Cloud Arcade</span>
                </span>
                <h5 className="text-base font-bold text-white mt-1">Holistic Infrastructure</h5>
                <p className="text-xs text-gray-400 mt-1 font-light">
                  Successfully deployed server infrastructures, VPCs, and automated Kubernetes container groups within the Arcade simulation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- KAGGLE ACHIEVEMENTS --- */}
        <div
          onMouseMove={handleCardMouseMove}
          className="bento-achieve-card md:col-span-12 lg:col-span-8 relative overflow-hidden rounded-3xl bg-[#0a0a0a]/40 border border-white/5 p-6 md:p-8 backdrop-blur-xl group hover:border-sky-400/20 transition-all duration-500"
          style={{
            ['--mouse-x' as any]: '0px',
            ['--mouse-y' as any]: '0px',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
            style={{
              background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(56, 189, 248, 0.05) 0%, transparent 80%)`,
            }}
          />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="mb-8">
              <span className="text-[10px] text-gray-500 font-sans tracking-wider block mb-1" url="https://www.kaggle.com/atanudas0712">kaggle.com/atanudas0712</span>
              <h4 className="text-2xl font-bold font-sans text-white uppercase tracking-wide group-hover:text-sky-400 transition-colors">Kaggle Achievements</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Badge 1 */}
              <div className="flex gap-4 items-center bg-black/60 rounded-2xl border border-white/5 p-5">
                <div className="w-16 h-16 shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <img src="/badges/python.png" alt="Python Badge" className="w-full h-full object-contain" />
                </div>
                <div className="text-left">
                  <span className="text-[9px] font-bold text-sky-400 uppercase tracking-widest font-sans">// Certificate</span>
                  <h5 className="text-sm font-bold text-white mt-0.5">Python Programming</h5>
                  <p className="text-[11px] text-gray-400 font-light mt-1">Core structures, OOP paradigms, and libraries.</p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="flex gap-4 items-center bg-black/60 rounded-2xl border border-white/5 p-5">
                <div className="w-16 h-16 shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <img src="/badges/AI_Agents_Google.png" alt="AI Agents Google Badge" className="w-full h-full object-contain" />
                </div>
                <div className="text-left">
                  <span className="text-[9px] font-bold text-sky-400 uppercase tracking-widest font-sans">// Intensive Course</span>
                  <h5 className="text-sm font-bold text-white mt-0.5">AI Agents & Google</h5>
                  <p className="text-[11px] text-gray-400 font-light mt-1">Building reasoning agentic workflows with Gemini.</p>
                </div>
              </div>
              {/* Badge 3 */}
              <div className="flex gap-4 items-center bg-black/60 rounded-2xl border border-white/5 p-5">
                <div className="w-16 h-16 shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <img src="/badges/vibecoding.png" alt="5-Day AI Agents: Intensive Vibe Coding Course Badge" className="w-full h-full object-contain" />
                </div>
                <div className="text-left">
                  <span className="text-[9px] font-bold text-sky-400 uppercase tracking-widest font-sans">5-Day AI Agents: Intensive Vibe Coding Course Badge</span>
                  <h5 className="text-sm font-bold text-white mt-0.5">AI Agents & Google</h5>
                  <p className="text-[11px] text-gray-400 font-light mt-1">Building reasoning agentic workflows with Gemini.</p>
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* --- HACKATHONS --- */}
        <div
          onMouseMove={handleCardMouseMove}
          className="bento-achieve-card md:col-span-12 lg:col-span-4 relative overflow-hidden rounded-3xl bg-[#0a0a0a]/40 border border-white/5 p-6 md:p-8 backdrop-blur-xl group hover:border-emerald-500/20 transition-all duration-500"
          style={{
            ['--mouse-x' as any]: '0px',
            ['--mouse-y' as any]: '0px',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
            style={{
              background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(16, 185, 129, 0.06) 0%, transparent 80%)`,
            }}
          />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="mb-6">
              <span className="text-[10px] text-gray-500 font-sans tracking-wider block mb-1">Competitions</span>
              <h4 className="text-2xl font-bold font-sans text-white uppercase tracking-wide group-hover:text-emerald-400 transition-colors">Hackathons</h4>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="https://credsverse.com/credentials/212789e6-1ee0-4eff-b1ef-fe72e8476fdf"
                target="_blank"
                rel="noreferrer"
                className="interactive-target flex items-center gap-4 p-4 bg-black/60 border border-white/5 rounded-2xl transition-all duration-300 hover:border-emerald-500/30 group/item"
              >
                <div className="w-12 h-12 shrink-0 transition-transform duration-300 group-hover/item:-translate-y-1">
                  <img src="/hackethon/1st.png" alt="Hackarena 2.0 Badge" className="w-full h-full object-contain" />
                </div>
                <div className="text-left flex-grow">
                  <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest block font-sans">Hackarena 2.0</span>
                  <h5 className="text-xs font-bold text-white mt-0.5">Credsverse Verification</h5>
                  <p className="text-[10px] text-gray-500">Credential ID: 212789e6</p>
                </div>
              </a>

              <a
                href="https://d2c-cdn-mumbai.s3.ap-south-1.amazonaws.com/lambda-pdfs/certificate-images/11431b02-d480-4c5e-a200-be0c29e0f707.pdf"
                target="_blank"
                rel="noreferrer"
                className="interactive-target flex items-center gap-4 p-4 bg-black/60 border border-white/5 rounded-2xl transition-all duration-300 hover:border-emerald-500/30 group/item"
              >
                <div className="w-12 h-12 shrink-0 transition-transform duration-300 group-hover/item:-translate-y-1">
                  <img src="/hackethon/2nd.png" alt="Hackathon Certificate" className="w-full h-full object-contain" />
                </div>
                <div className="text-left flex-grow">
                  <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest block font-sans">Unstop Hackathon</span>
                  <h5 className="text-xs font-bold text-white mt-0.5">D2C Certificate</h5>
                  <p className="text-[10px] text-gray-500">View PDF Verification</p>
                </div>
              </a>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
