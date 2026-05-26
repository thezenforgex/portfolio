import React, { useEffect, useRef, useState } from 'react';
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
// Provide a lightweight ambient module for react/jsx-runtime to avoid
// TypeScript augmentation issues when the actual module lacks types.
// Provide lightweight, safe typings for the runtime to avoid TS augmentation
// errors when the installed module lacks type declarations.
declare module 'react/jsx-runtime' {
  // Minimal exports used by JSX emit. Mark as any to avoid type errors.
  export const jsx: any;
  export const jsxs: any;
  export const jsxDEV: any;
  export default jsx;
}

declare module 'react/jsx-runtime.js' {
  export { jsx, jsxs, jsxDEV, default } from 'react/jsx-runtime';
}
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Menu, X, ArrowUpRight, Github, Code2, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

// 1. Magnetic Wrapper
const Magnetic = ({ children }: { children: React.ReactElement }) => {
  const magnetic = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetic.current) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = magnetic.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    magnetic.current?.addEventListener("mousemove", handleMouseMove);
    magnetic.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      magnetic.current?.removeEventListener("mousemove", handleMouseMove);
      magnetic.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return React.cloneElement(children, { ref: magnetic });
};

// 2. Interactive Starfield Canvas
const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: { x: number, y: number, radius: number, vx: number, vy: number, alpha: number }[] = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        alpha: Math.random()
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle glow at mouse position
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 500);
      gradient.addColorStop(0, 'rgba(74, 222, 128, 0.04)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#ffffff';
      stars.forEach(star => {
        // Parallax effect based on mouse
        const dx = (mouseX - width / 2) * 0.0002 * star.radius;
        const dy = (mouseY - height / 2) * 0.0002 * star.radius;

        star.x += star.vx - dx;
        star.y += star.vy - dy;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]" />;
};

// 3. Custom Cursor
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.hover-target')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return <div ref={cursorRef} className={`custom-cursor ${isHovering ? 'hovering' : ''}`} />;
};

const TechBadge = ({ name, color }: { name: string, color: string }) => (
  <div className="hover-target flex items-center gap-3 px-5 py-2.5 bg-[#1a1a1a]/50 rounded-full border border-gray-800 hover:border-gray-500 transition-colors duration-300">
    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
    <span className="text-sm text-gray-300 font-medium">{name}</span>
  </div>
);

const KaggleBadge = ({ title, imageSrc, href }: { title: string, imageSrc: string, href?: string }) => {
  const content = (
    <>
      <div className="relative w-24 h-24 drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-3 group-hover:scale-110">
        <img src={imageSrc} alt={title} className="w-full h-full object-contain" />
      </div>
      <span className="text-xs text-gray-400 font-medium text-center leading-tight group-hover:text-white transition-colors">
        {title}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="hover-target flex flex-col items-center gap-4 group w-28"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 group w-28">
      {content}
    </div>
  );
};

const GitHubContributionChart = () => {
  const githubUrl = "https://github.com/atanudas12-hub";
  const contributionChartUrl = "https://ghchart.rshah.org/4ade80/atanudas12-hub";

  return (
    <section id="github" className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-16 fade-up">
        <span className="text-gray-500 text-xl">âœ±</span>
        <h3 className="text-sm text-gray-400 uppercase tracking-widest font-semibold">GITHUB ACTIVITY</h3>
      </div>

      <div className="fade-up border border-gray-800/50 bg-[#1a1a1a]/30 rounded-2xl p-6 md:p-10 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <p className="text-gray-500 text-sm mb-2">github.com/atanudas12-hub</p>
            <h4 className="font-display text-3xl md:text-4xl text-white tracking-wide uppercase">
              Contribution Chart
            </h4>
          </div>

          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hover-target inline-flex w-fit items-center gap-3 border border-gray-700 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-gray-200 transition-colors hover:border-green-400 hover:text-green-400"
          >
            <Github size={18} />
            Visit GitHub
          </a>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-800 bg-[#0d0d0d] p-4 md:p-6">
          <img
            src={contributionChartUrl}
            alt="Atanu Das GitHub contribution chart"
            className="min-w-[760px] w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

const CodingProfiles = () => {
  const leetcodeUrl = "https://leetcode.com/u/atanudas12-hub/";
  const leetcodeCardUrl = "https://leetcard.jacoblin.cool/atanudas12-hub?theme=dark&font=Inter&ext=heatmap";
  const hackerRankUrl = "https://www.hackerrank.com/profile/atanudas120706";

  return (
    <section id="coding-profiles" className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-16 fade-up">
        <span className="text-gray-500 text-xl">*</span>
        <h3 className="text-sm text-gray-400 uppercase tracking-widest font-semibold">CODING PROFILES</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 fade-up">
        <div className="border border-gray-800/50 bg-[#1a1a1a]/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
            <div>
              <p className="text-gray-500 text-sm mb-2">leetcode.com/u/atanudas12-hub</p>
              <h4 className="font-display text-3xl text-white tracking-wide uppercase">
                LeetCode
              </h4>
            </div>

            <a
              href={leetcodeUrl}
              target="_blank"
              rel="noreferrer"
              className="hover-target inline-flex w-fit items-center gap-3 border border-gray-700 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-gray-200 transition-colors hover:border-yellow-400 hover:text-yellow-400"
            >
              <Code2 size={18} />
              Visit LeetCode
            </a>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-800 bg-[#0d0d0d] p-4">
            <img
              src={leetcodeCardUrl}
              alt="Atanu Das LeetCode stats card"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>

        <div className="border border-gray-800/50 bg-[#1a1a1a]/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
            <div>
              <p className="text-gray-500 text-sm mb-2">hackerrank.com/profile/atanudas120706</p>
              <h4 className="font-display text-3xl text-white tracking-wide uppercase">
                HackerRank
              </h4>
            </div>

            <a
              href={hackerRankUrl}
              target="_blank"
              rel="noreferrer"
              className="hover-target inline-flex w-fit items-center gap-3 border border-gray-700 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-gray-200 transition-colors hover:border-green-400 hover:text-green-400"
            >
              <Trophy size={18} />
              Visit HackerRank
            </a>
          </div>

          <a
            href={hackerRankUrl}
            target="_blank"
            rel="noreferrer"
            className="hover-target group block rounded-lg border border-gray-800 bg-[#0d0d0d] p-8 transition-colors hover:border-green-400/70"
          >
            <div className="flex h-full min-h-[255px] flex-col justify-between gap-10">
              <div>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-400/10 text-green-400">
                  <Trophy size={28} />
                </div>
                <p className="text-sm uppercase tracking-[0.24em] text-green-400">Practice Profile</p>
                <h5 className="mt-4 font-display text-4xl text-white tracking-wide uppercase">
                  atanudas120706
                </h5>
              </div>

              <div className="flex items-center justify-between gap-6 border-t border-gray-800 pt-6">
                <span className="text-sm text-gray-400">View certificates, skills, and challenges.</span>
                <ArrowUpRight className="shrink-0 text-gray-500 transition-colors group-hover:text-green-400" size={28} />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

const ProjectRow = ({ num, title, tags, image, setHoveredImage }: { num: string, title: string, tags: string[], image: string, setHoveredImage: (img: string | null) => void }) => (
  <div
    className="hover-target group flex flex-col md:flex-row md:items-start gap-4 md:gap-8 py-12 border-b border-gray-800 hover:bg-[#1a1a1a]/80 transition-all duration-500 px-6 -mx-6 cursor-pointer relative"
    onMouseEnter={() => setHoveredImage(image)}
    onMouseLeave={() => setHoveredImage(null)}
  >
    <span className="text-gray-500 font-display text-2xl mt-2 group-hover:text-green-400 transition-colors duration-500">{num}</span>
    <div className="flex-1">
      <h3 className="font-display text-5xl md:text-7xl lg:text-8xl text-gray-300 group-hover:text-white transition-colors duration-500 tracking-wide uppercase flex items-center gap-6">
        {title}
        <ArrowUpRight className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-green-400" size={48} />
      </h3>
      <div className="flex flex-wrap gap-4 mt-6">
        {tags.map((tag, i) => (
          <span key={tag} className="text-sm text-gray-400 flex items-center gap-4 group-hover:text-gray-300 transition-colors duration-500">
            {tag}
            {i < tags.length - 1 && <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-green-400/50 transition-colors duration-500"></span>}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>
    <div className={`relative w-full max-w-md bg-[#0a0a0a] h-full border-l border-gray-800 p-12 flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-white hover:rotate-90 transition-all duration-300">
        <X size={32} />
      </button>

      <div className="mt-24 grid grid-cols-2 gap-12">
        <div>
          <h4 className="text-gray-500 text-sm font-semibold tracking-widest mb-6">SOCIAL</h4>
          <ul className="space-y-4">
            <li><a href="https://github.com/atanudas12-hub" className="text-gray-300 hover:text-green-400 transition-colors text-lg">Github</a></li>
            <li><a href="https://www.linkedin.com/in/atanu-das-/" className="text-gray-300 hover:text-green-400 transition-colors text-lg">Linkedin</a></li>
            {/* <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-lg">Facebook</a></li> */}
            <li><a href="https://www.kaggle.com/atanudas0712" className="text-gray-300 hover:text-green-400 transition-colors text-lg">Kaggle</a></li>
            <li><a href="https://leetcode.com/u/atanudas12-hub/" className="text-gray-300 hover:text-green-400 transition-colors text-lg">LeetCode</a></li>
            <li><a href="https://www.hackerrank.com/profile/atanudas120706" className="text-gray-300 hover:text-green-400 transition-colors text-lg">HackerRank</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gray-500 text-sm font-semibold tracking-widest mb-6">MENU</h4>
          <ul className="space-y-4">
            <li><a href="#home" onClick={onClose} className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-3 text-lg"><span className="w-2 h-2 rounded-full bg-green-400"></span> Home</a></li>
            <li><a href="#about" onClick={onClose} className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-3 text-lg"><span className="w-2 h-2 rounded-full bg-blue-400"></span> About Me</a></li>
            <li><a href="#education" onClick={onClose} className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-3 text-lg"><span className="w-2 h-2 rounded-full bg-orange-400"></span> Education</a></li>
            <li><a href="#experience" onClick={onClose} className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-3 text-lg"><span className="w-2 h-2 rounded-full bg-purple-400"></span> Experience</a></li>
            <li><a href="#projects" onClick={onClose} className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-3 text-lg"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Projects</a></li>
            <li><a href="#github" onClick={onClose} className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-3 text-lg"><span className="w-2 h-2 rounded-full bg-green-400"></span> GitHub</a></li>
            <li><a href="#coding-profiles" onClick={onClose} className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-3 text-lg"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Coding Profiles</a></li>
            <li><a href="#google-skills" onClick={onClose} className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-3 text-lg"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Google Skills</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-auto">
        <h4 className="text-gray-500 text-sm font-semibold tracking-widest mb-4">GET IN TOUCH</h4>
        <a href="mailto:atanudas120706@gmail.com" className="text-gray-300 hover:text-green-400 transition-colors text-lg">atanudas120706@gmail.com</a>
      </div>
    </div>
  </div>
);
const HireMeModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');


  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch("https://formsubmit.co/ajax/atanudas120706@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `New Hiring Inquiry from ${name}`,
          _template: "box"
        })
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          setName('');
          setEmail('');
          setMessage('');
          onClose();
        }, 4000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-modal">
      <div className="bg-[#111] border border-green-500/30 rounded-2xl p-8 w-full max-w-md relative shadow-[0_0_40px_rgba(74,222,128,0.1)]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-400/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-2xl font-display text-white mb-2 uppercase tracking-wide">Message Sent!</h2>
            <p className="text-gray-400 text-sm">Thank you for reaching out. I'll get back to you soon.</p>
            <p className="text-gray-500 text-xs mt-4 italic">*Note: If this is your first time using this form, I might need to activate it on my end first.</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-display text-white mb-2 uppercase tracking-wide">Let's Work <span className="text-green-400">Together</span></h2>
            <p className="text-gray-400 mb-6 text-sm">Fill out the form below and I'll get back to you as soon as possible.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors" placeholder="John Doe" disabled={status === 'submitting'} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Email</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors" placeholder="john@example.com" disabled={status === 'submitting'} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Message</label>
                <textarea required value={message} onChange={e => setMessage(e.target.value)} rows={4} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors resize-none" placeholder="Tell me about your project..." disabled={status === 'submitting'}></textarea>
              </div>
              {status === 'error' && (
                <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again or email directly.</p>
              )}

              <button type="submit" disabled={status === 'submitting'} className="w-full bg-green-400 text-black font-bold uppercase tracking-wider py-4 rounded-lg hover:bg-white transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center">
                {status === 'submitting' ? (
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. Hero Text Reveal Animation
    gsap.to('.hero-text-line', {
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
      delay: 0.2,
    });

    gsap.to('.hero-fade', {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.8,
    });

    // 3. Scroll Reveal Animations
    gsap.utils.toArray('.fade-up').forEach((el: unknown) => {
      gsap.fromTo(el as Element,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el as Element,
            start: 'top 85%',
          }
        }
      );
    });

    // Profile Image Reveal Animation
    gsap.fromTo('.profile-image-wrapper',
      { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.5,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: '.profile-image-container',
          start: 'top 80%',
        }
      }
    );

    // 4. Project Image Follow Cursor
    const reveal = imageRevealRef.current;
    if (reveal) {
      const xTo = gsap.quickTo(reveal, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(reveal, "y", { duration: 0.4, ease: "power3" });

      const moveImage = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener('mousemove', moveImage);
      return () => {
        window.removeEventListener('mousemove', moveImage);
        lenis.destroy();
      };
    }

    return () => lenis.destroy();
  }, []);

  return (
    <div className="font-sans text-gray-200 selection:bg-green-400/30 selection:text-green-400">
      <CustomCursor />
      <Starfield />

      {/* Project Image Reveal Container */}
      <div ref={imageRevealRef} className={`project-image-reveal ${hoveredImage ? 'active' : ''}`}>
        {hoveredImage && <img src={hoveredImage} alt="Project Preview" />}
      </div>

      {/* Menu Button */}
      <Magnetic>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="fixed top-8 right-8 z-40 text-white mix-blend-difference hover:scale-110 transition-transform p-4"
        >
          <Menu size={36} />
        </button>
      </Magnetic>

      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <HireMeModal isOpen={isHireModalOpen} onClose={() => setIsHireModalOpen(false)} />

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center pt-20 px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-7xl mx-auto">
            <div className="lg:col-span-8">
              <div className="text-reveal-mask overflow-hidden py-2">
                <h1 className="hero-text-line transform translate-y-full font-display text-7xl md:text-9xl leading-[0.85] tracking-wide uppercase">
                  <span className="text-green-400 block">DATA</span>
                </h1>
              </div>
              <div className="text-reveal-mask overflow-hidden py-2">
                <h1 className="hero-text-line transform translate-y-full font-display text-7xl md:text-9xl leading-[0.85] tracking-wide uppercase">
                  <span className="text-white block">SCIENCE</span>
                </h1>
              </div>
              <div className="mt-8">
                <div className="hero-fade opacity-0 transform translate-y-8 bg-grid-pattern max-w-2xl">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Hi! I'm <span className="text-white font-medium">Atanu</span>. A Data Science student at IIT Madras and Full-Stack Developer passionate about extracting insights from data and building scalable web applications.
                  </p>
                </div>
              </div>
              <div className="mt-12 hero-fade opacity-0 transform translate-y-8 inline-block">
                <Magnetic>
                  <button
                    onClick={() => setIsHireModalOpen(true)}
                    className="bg-green-400 text-black font-bold px-10 py-4 tracking-wider hover:bg-white transition-colors duration-300 rounded-sm"
                  >
                    HIRE ME
                  </button>
                </Magnetic>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-center gap-12 lg:text-right mt-12 lg:mt-0">
              <div className="hero-fade opacity-0 transform translate-y-8">
                <h3 className="font-display text-6xl text-green-400">3+</h3>
                <p className="text-gray-400 text-sm uppercase tracking-widest mt-2">Years Coding</p>
              </div>
              <div className="hero-fade opacity-0 transform translate-y-8">
                <h3 className="font-display text-6xl text-green-400">3+</h3>
                <p className="text-gray-400 text-sm uppercase tracking-widest mt-2">Projects Built</p>
              </div>
              <div className="hero-fade opacity-0 transform translate-y-8">
                <h3 className="font-display text-6xl text-green-400">1+</h3>
                <p className="text-gray-400 text-sm uppercase tracking-widest mt-2">Data Models</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <h2 className="fade-up text-3xl md:text-5xl lg:text-6xl font-sans font-light leading-tight text-gray-300 max-w-5xl">
            I believe in a <span className="text-white font-medium">data-driven approach</span>, combining analytical rigor with robust full-stack engineering to solve complex problems.
          </h2>

          <div className="mt-32 grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-gray-800 pt-16">
            <div className="md:col-span-4 fade-up">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">This is me.</p>
              <h3 className="text-4xl md:text-5xl font-medium text-white">Hi, I'm Atanu.</h3>

              <div className="relative mt-12 max-w-[280px] group profile-image-container">
                <div className="absolute inset-0 border-2 border-green-400 translate-x-4 translate-y-4 rounded-xl transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#1a1a1a] z-10 profile-image-wrapper">
                  <img src="/badges/profile.jpg" alt="Atanu Das" className="w-full h-full object-cover group-hover: transition-all duration-700 scale-105 group-hover:scale-100" />
                </div>
              </div>
            </div>
            <div className="md:col-span-8 flex flex-col gap-8 text-gray-400 text-xl font-light leading-relaxed fade-up">
              <p>I'm a Data Science student and Full-Stack Developer dedicated to turning complex data into actionable insights and building seamless web applications.</p>
              <p>My approach bridges the gap between machine learning and software engineering. By combining statistical analysis with modern web technologies, I strive to deliver end-to-end solutions that are both intelligent and user-friendly.</p>
            </div>
          </div>
        </section>

        {/* Stack Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16 fade-up">
            <span className="text-gray-500 text-xl">✱</span>
            <h3 className="text-sm text-gray-400 uppercase tracking-widest font-semibold">MY STACK</h3>
          </div>

          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-gray-800 pb-16 fade-up">
              <div className="md:col-span-4">
                <h4 className="font-display text-4xl text-gray-400 tracking-wide uppercase">FRONTEND</h4>
              </div>
              <div className="md:col-span-8 flex flex-wrap gap-4">
                <TechBadge name="HTML" color="#e34f26" />
                <TechBadge name="CSS" color="#1572b6" />
                <TechBadge name="JavaScript" color="#f7df1e" />
                <TechBadge name="Jinja" color="#b41717" />
                <TechBadge name="Bootstrap" color="#7952b3" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-gray-800 pb-16 fade-up">
              <div className="md:col-span-4">
                <h4 className="font-display text-4xl text-gray-400 tracking-wide uppercase">BACKEND</h4>
              </div>
              <div className="md:col-span-8 flex flex-wrap gap-4">
                <TechBadge name="Flask" color="#ffffff" />
                <TechBadge name="Python" color="#3776ab" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-gray-800 pb-16 fade-up">
              <div className="md:col-span-4">
                <h4 className="font-display text-4xl text-gray-400 tracking-wide uppercase">DATABASE</h4>
              </div>
              <div className="md:col-span-8 flex flex-wrap gap-4">
                <TechBadge name="MySQL" color="#4479a1" />
                <TechBadge name="PostgreSQL" color="#336791" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-gray-800 pb-16 fade-up">
              <div className="md:col-span-4">
                <h4 className="font-display text-4xl text-gray-400 tracking-wide uppercase">TOOLS</h4>
              </div>
              <div className="md:col-span-8 flex flex-wrap gap-4">
                <TechBadge name="Git" color="#f05032" />
                <TechBadge name="GitHub" color="#ffffff" />
                <TechBadge name="Google Cloud" color="#4285f4" />
                <TechBadge name="Figma" color="#f24e1e" />
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16 fade-up">
            <span className="text-gray-500 text-xl">✱</span>
            <h3 className="text-sm text-gray-400 uppercase tracking-widest font-semibold">MY EDUCATION</h3>
          </div>

          <div className="space-y-12">
            <div className="border-b border-gray-800 pb-12 fade-up group">
              <p className="text-gray-500 text-sm mb-2 group-hover:text-green-400 transition-colors">IIT Madras</p>
              <h4 className="font-display text-4xl md:text-5xl text-gray-200 tracking-wide mb-2 uppercase group-hover:text-white transition-colors">BS in Data Science</h4>
              <p className="text-gray-500 text-sm">2nd Year Student</p>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section id="badges" className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16 fade-up">
            <span className="text-gray-500 text-xl">✱</span>
            <h3 className="text-sm text-gray-400 uppercase tracking-widest font-semibold">MY BADGES</h3>
          </div>

          <div className="space-y-12 fade-up">
            <div className="border border-gray-800/50 bg-[#1a1a1a]/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
              <h4 className="font-display text-3xl text-white mb-10 tracking-wide flex items-center gap-3">
                <span className="text-blue-400">Kaggle</span> Achievements
              </h4>

              <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12">
                <KaggleBadge
                  title="Python"
                  imageSrc="/badges/python.png"
                />
                <KaggleBadge
                  title="AI Agents Intensive Course with Google"
                  imageSrc="/badges/AI_Agents_Google.png"
                />
                {/* <KaggleBadge
                  title="Intro to Programming"
                  imageSrc="/badges/intro-programming.png"
                /> */}
                {/* <KaggleBadge
                  title="Data Visualization"
                  imageSrc="/badges/data-viz.png"
                /> */}
                {/* <KaggleBadge
                  title="Discord Community"
                  imageSrc="/badges/discord.png"
                /> */}
                {/* <KaggleBadge
                  title="Computer Vision"
                  imageSrc="/badges/computer-vision.png"
                />
                <KaggleBadge
                  title="7-Day Streak"
                  imageSrc="/badges/7-day-streak.png"
                /> */}
              </div>
            </div>
          </div>
        </section>

        {/* Google Skills Achievement Section */}
        <section id="google-skills" className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16 fade-up">
            <span className="text-gray-500 text-xl">✱</span>
            <h3 className="text-sm text-gray-400 uppercase tracking-widest font-semibold">GOOGLE SKILLS ACHIEVEMENT II</h3>
          </div>

          <div className="space-y-12 fade-up">
            <div className="border border-gray-800/50 bg-[#1a1a1a]/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
              <h4 className="font-display text-3xl text-white mb-10 tracking-wide flex items-center gap-3">
                <span className="text-blue-500">Google</span> Cloud Skills
              </h4>

              <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12">
                <KaggleBadge
                  title="Arcade Holistic Infrastructure"
                  imageSrc="/google/google1.png"
                  href="https://www.skills.google/public_profiles/b3b7964e-3a87-4a1d-92ca-b6da0a7f0164/badges/22907787"
                />
                {/* <KaggleBadge
                  title="Google Achievement 2"
                  imageSrc="/google/badge2google.png"
                />
                <KaggleBadge
                  title="Google Skills Badge"
                  imageSrc="/google/badge3google.jpg"
                  href="https://www.skills.google/public_profiles/b3b7964e-3a87-4a1d-92ca-b6da0a7f0164/badges/22907787"
                /> */}
              </div>
            </div>
          </div>
        </section>

        <GitHubContributionChart />
        <CodingProfiles />

        {/* Experience Section */}
        <section id="experience" className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16 fade-up">
            <span className="text-gray-500 text-xl">✱</span>
            <h3 className="text-sm text-gray-400 uppercase tracking-widest font-semibold">MY EXPERIENCE</h3>
          </div>

          <div className="space-y-12">
            <div className="border-b border-gray-800 pb-12 fade-up group">
              <p className="text-gray-500 text-sm mb-2 group-hover:text-green-400 transition-colors">Independent Developer & Student</p>
              <h4 className="font-display text-4xl md:text-5xl text-gray-200 tracking-wide mb-4 uppercase group-hover:text-white transition-colors">Actively Seeking Opportunities</h4>
              <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
                Currently focused on expanding my technical foundation through intensive academic study and comprehensive hands-on projects. I am highly motivated to apply my skills in a professional environment and am actively pursuing internship roles to drive real-world impact and gain practical industry experience.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16 fade-up">
            <span className="text-gray-500 text-xl">✱</span>
            <h3 className="text-sm text-gray-400 uppercase tracking-widest font-semibold">SELECTED PROJECTS</h3>
          </div>

          <div className="flex flex-col fade-up">
            <ProjectRow num="01." title="Churn Predictor" tags={['Python', 'Scikit-Learn', 'FastAPI', 'React']} image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" setHoveredImage={setHoveredImage} />
            <ProjectRow num="02." title="Sales Analytics" tags={['Pandas', 'Matplotlib', 'Next.js']} image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800" setHoveredImage={setHoveredImage} />
            <ProjectRow num="03." title="Resume Roaster" tags={['GPT-4', 'Next.js', 'PostgreSQL']} image="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800" setHoveredImage={setHoveredImage} />
            <ProjectRow num="04." title="Electro EV" tags={['Next.js', 'Payload CMS', 'Tailwind CSS']} image="https://images.unsplash.com/photo-1593941707882-a5bba14938cb?auto=format&fit=crop&q=80&w=800" setHoveredImage={setHoveredImage} />
            <ProjectRow num="05." title="Real Estate API" tags={['Node.js', 'Express', 'MongoDB']} image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" setHoveredImage={setHoveredImage} />
            <ProjectRow num="06." title="devLinks" tags={['Next.js', 'Formik', 'Drag & Drop']} image="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800" setHoveredImage={setHoveredImage} />
          </div>
        </section>

        {/* Footer */}
        <footer className="footer-neon relative mt-20 overflow-hidden border-t border-cyan-400/10 bg-black px-6 pb-12 pt-32 md:px-12 lg:px-24">
          <div className="footer-name-bg hover-target" aria-hidden="true">
            <span className="footer-name-outline">ATANU DAS</span>
            <span className="footer-name-bloom">ATANU DAS</span>
            <span className="footer-name-glow">ATANU DAS</span>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center fade-up">
            <p className="text-gray-400 mb-6 text-sm md:text-base uppercase tracking-[0.2em] font-medium">Ready to start a project?</p>

            <Magnetic>
              <button onClick={() => setIsHireModalOpen(true)} className="hover-target group relative inline-block font-display text-[10vw] md:text-7xl lg:text-9xl text-white transition-colors tracking-wide mb-24 cursor-pointer">
                <span className="relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-emerald-600 transition-all duration-500">
                  LET'S TALK
                </span>
                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>
            </Magnetic>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pt-12 border-t border-gray-800/50 text-sm text-gray-500 text-left">
              <div className="flex flex-col gap-3">
                <span className="text-gray-300 font-medium mb-1 uppercase tracking-wider text-xs">Contact</span>
                <a href="mailto:atanudas120706@gmail.com" className="hover:text-green-400 transition-colors w-fit">atanudas120706@gmail.com</a>
                <a href="tel:+910000000000" className="hover:text-green-400 transition-colors w-fit">+91 00000 00000</a>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-gray-300 font-medium mb-1 uppercase tracking-wider text-xs">Socials</span>
                <div className="flex flex-wrap gap-6">
                  <a href="https://github.com/atanudas12-hub" className="hover:text-green-400 transition-colors">GitHub</a>
                  <a href="https://www.linkedin.com/in/atanu-das-/" className="hover:text-green-400 transition-colors">LinkedIn</a>
                  <a href="https://leetcode.com/u/atanudas12-hub/" className="hover:text-green-400 transition-colors">LeetCode</a>
                  <a href="https://www.hackerrank.com/profile/atanudas120706" className="hover:text-green-400 transition-colors">HackerRank</a>
                  <a href="#" className="hover:text-green-400 transition-colors">Twitter</a>
                </div>
              </div>

              <div className="flex flex-col gap-3 md:items-end">
                <span className="text-gray-300 font-medium mb-1 uppercase tracking-wider text-xs">Location</span>
                <p>IIT Madras, Chennai</p>
                <p className="mt-2 text-gray-600">© {new Date().getFullYear()} Atanu Das</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
