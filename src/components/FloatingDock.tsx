import React, { useEffect, useRef, useState } from 'react';
import { Home, User, Cpu, Terminal, Trophy, Milestone, Mail } from 'lucide-react';
import gsap from 'gsap';

interface DockItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export const FloatingDock = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const dockRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const items: DockItem[] = [
    { label: 'Home', icon: <Home className="w-5 h-5" />, href: '#home' },
    { label: 'About', icon: <User className="w-5 h-5" />, href: '#about' },
    { label: 'Skills', icon: <Cpu className="w-5 h-5" />, href: '#skills' },
    { label: 'Projects', icon: <Terminal className="w-5 h-5" />, href: '#projects' },
    { label: 'Timeline', icon: <Milestone className="w-5 h-5" />, href: '#timeline' },
    { label: 'Credentials', icon: <Trophy className="w-5 h-5" />, href: '#credentials' },
    { label: 'Contact', icon: <Mail className="w-5 h-5" />, href: '#contact' },
  ];

  // 1. Scroll hide/reveal logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Don't hide if close to top
      if (currentScrollY < 100) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down -> hide dock
        setIsVisible(false);
      } else {
        // Scrolling up -> show dock
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Scroll-spy intersection observer
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'timeline', 'credentials', 'contact'];
    const observers = sections.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: '-30% 0px -40% 0px', // Trigger when section occupies the middle of screen
        }
      );
      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.element);
      });
    };
  }, []);

  // 3. Dynamic Dock Magnification Effect (macOS style)
  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const itemsEl = dock.querySelectorAll('.dock-item-btn');

    const handleMouseMove = (e: MouseEvent) => {
      itemsEl.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(e.clientX - itemCenterX, 2) + Math.pow(e.clientY - itemCenterY, 2)
        );

        // Magnify items within 150px range
        if (distance < 150) {
          const power = (150 - distance) / 150; // value from 0 to 1
          const scale = 1 + power * 0.35; // Max 1.35x scaling
          
          gsap.to(item, {
            scale: scale,
            y: -power * 10, // lift up slightly
            marginRight: `${power * 4}px`,
            marginLeft: `${power * 4}px`,
            duration: 0.1,
            overwrite: 'auto',
          });
        } else {
          gsap.to(item, {
            scale: 1,
            y: 0,
            marginRight: '0px',
            marginLeft: '0px',
            duration: 0.2,
            overwrite: 'auto',
          });
        }
      });
    };

    const handleMouseLeave = () => {
      itemsEl.forEach((item) => {
        gsap.to(item, {
          scale: 1,
          y: 0,
          marginRight: '0px',
          marginLeft: '0px',
          duration: 0.2,
          overwrite: 'auto',
        });
      });
    };

    dock.addEventListener('mousemove', handleMouseMove);
    dock.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      dock.removeEventListener('mousemove', handleMouseMove);
      dock.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[99] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
      }`}
    >
      <div
        ref={dockRef}
        className="flex items-end gap-3 px-4 py-3 bg-[#0a0a0a]/50 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] hover:border-green-400/30 transition-colors duration-300"
      >
        {items.map((item) => {
          const isActive = activeSection === item.href.slice(1);
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="dock-item-btn relative group flex flex-col items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:text-white transition-colors duration-200"
              aria-label={item.label}
            >
              {/* Floating Tooltip */}
              <span className="absolute bottom-16 px-2.5 py-1 text-[10px] font-sans uppercase tracking-widest font-bold text-gray-200 bg-[#0d0d0d] border border-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg shadow-black/80">
                {item.label}
              </span>

              {/* Icon Container */}
              <div
                className={`flex items-center justify-center w-full h-full rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                    : 'bg-transparent border border-transparent'
                }`}
              >
                {item.icon}
              </div>

              {/* Active Indicator Dot */}
              {isActive && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};
