import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, Github, Linkedin, ArrowUpRight, CheckCircle2, AlertCircle, ShieldCheck, Lock } from 'lucide-react';
import { GlintCard } from '../components/GlintCard';

declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: {
          initialize: (config: any) => void;
          prompt: (momentListener?: any) => void;
          renderButton: (parent: HTMLElement, options: any) => void;
        };
      };
    };
  }
}

// Spam keyword blacklist
const SPAM_KEYWORDS = [
  'casino', 'crypto', 'viagra', 'poker', 'porn', 'lottery', 'cheap leads',
  'seo ranking', 'increase traffic', 'rank #1', 'whatsapp group', 'telegram group',
  'investment opportunity', 'buy followers', 'unsolicited'
];

export const ContactForm = ({ isModal = false }: { isModal?: boolean }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Invisible field for bots
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isGoogleVerified, setIsGoogleVerified] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const mountTime = useRef<number>(Date.now());

  // Load Google Identity Services Script
  useEffect(() => {
    mountTime.current = Date.now();
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!clientId) return;

    // Initialize GIS if window.google is ready
    if (window.google?.accounts?.id) {
      initGoogleAuth(clientId);
    } else {
      const timer = setInterval(() => {
        if (window.google?.accounts?.id) {
          initGoogleAuth(clientId);
          clearInterval(timer);
        }
      }, 500);
      return () => clearInterval(timer);
    }
  }, []);

  const initGoogleAuth = (clientId: string) => {
    try {
      window.google?.accounts?.id?.initialize({
        client_id: clientId,
        callback: handleGoogleResponse,
        auto_select: false
      });
    } catch (e) {
      console.warn('Google Identity initialization skipped:', e);
    }
  };

  const handleGoogleResponse = (response: any) => {
    try {
      if (response.credential) {
        // Decode JWT payload
        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const payload = JSON.parse(jsonPayload);

        if (payload.email) {
          setEmail(payload.email);
          if (payload.name) setName(payload.name);
          setIsGoogleVerified(true);
          setErrorMessage('');
        }
      }
    } catch (err) {
      console.error('Failed to parse Google credential:', err);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleTriggerGoogleAuth = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!clientId) {
      alert(
        "Google Authentication Info:\n\nTo connect real Google Sign-In, add your VITE_GOOGLE_CLIENT_ID to your environment variables (.env).\n\nYour contact form is currently protected by the built-in Anti-Spam Firewall!"
      );
      return;
    }

    setIsGoogleLoading(true);
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          setIsGoogleLoading(false);
        }
      });
    } else {
      setIsGoogleLoading(false);
    }
  };

  const validateAntiSpam = (): boolean => {
    // 0. Google Verification Check
    if (!isGoogleVerified || !email) {
      setErrorMessage('Please click "Select & Verify Google Email Account" to authenticate before sending.');
      return false;
    }

    // 1. Honeypot trap check
    if (honeypot.trim() !== '') {
      // Fake success to trick bot scripts
      setStatus('success');
      return false;
    }

    // 2. Velocity check: submission faster than 3 seconds
    const timeElapsed = Date.now() - mountTime.current;
    if (timeElapsed < 3000) {
      setErrorMessage('Submission too fast. Please wait a moment and try again.');
      return false;
    }

    // 3. Spam keyword filter
    const lowerMessage = message.toLowerCase();
    const lowerName = name.toLowerCase();
    const hasSpamKeyword = SPAM_KEYWORDS.some(
      (keyword) => lowerMessage.includes(keyword) || lowerName.includes(keyword)
    );

    if (hasSpamKeyword) {
      setErrorMessage('Message contains flagged promotional keywords.');
      return false;
    }

    // 4. Excessive external links check
    const urlMatches = message.match(/https?:\/\//gi);
    if (urlMatches && urlMatches.length > 2) {
      setErrorMessage('Too many links detected. Please remove excess URLs.');
      return false;
    }

    // 5. LocalStorage Rate Limiter (Max 2 per 10 minutes)
    try {
      const storageKey = 'portfolio_contact_limit';
      const rawHistory = localStorage.getItem(storageKey);
      const history: number[] = rawHistory ? JSON.parse(rawHistory) : [];
      const tenMinsAgo = Date.now() - 10 * 60 * 1000;
      const recentSubmissions = history.filter((t) => t > tenMinsAgo);

      if (recentSubmissions.length >= 2) {
        setErrorMessage('Rate limit reached (max 2 messages per 10 mins). Please try again later.');
        return false;
      }

      recentSubmissions.push(Date.now());
      localStorage.setItem(storageKey, JSON.stringify(recentSubmissions));
    } catch (e) {
      // Fallback if localStorage blocked
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateAntiSpam()) {
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch("https://formsubmit.co/ajax/dasatanu.iitm@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `New Portfolio Message from ${name} ${isGoogleVerified ? '[Verified Google Email]' : ''}`,
          _template: "box",
          _honey: honeypot
        })
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setIsGoogleVerified(false);
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Hidden Honeypot Field for Spambots */}
      <div style={{ display: 'none', opacity: 0, position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <label htmlFor="phone_website_address">Do not fill this field</label>
        <input
          type="text"
          id="phone_website_address"
          name="phone_website_address"
          tabIndex={-1}
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
        />
      </div>

      {status === 'success' ? (
        <div className="text-center py-10 bg-green-500/10 border border-green-500/25 rounded-2xl p-6 animate-modal">
          <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-2">Message Dispatched!</h4>
          <p className="text-gray-400 text-xs font-light">
            Thank you for reaching out. I will get back to you shortly.
          </p>
        </div>
      ) : (
        <>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Full Name
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#111]/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-green-400 focus:bg-[#161616]/80 transition-all duration-300 placeholder-gray-600"
              placeholder="e.g. John Doe"
              disabled={status === 'submitting'}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Email Address <span className="text-red-400">* (Google Verified)</span>
              </label>

              {isGoogleVerified && (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-md animate-fade-in">
                  <ShieldCheck className="w-3 h-3" /> Verified Google Email
                </span>
              )}
            </div>

            <div className="space-y-2">
              {!isGoogleVerified ? (
                <button
                  type="button"
                  onClick={handleTriggerGoogleAuth}
                  disabled={isGoogleLoading}
                  className="interactive-target w-full flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-green-400/40 px-4 py-3.5 rounded-xl text-xs font-semibold text-white transition-all duration-300 shadow-sm hover:shadow-green-500/5 cursor-pointer group"
                >
                  <svg className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                    <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8 0-1.3.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
                    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
                  </svg>
                  <span>{isGoogleLoading ? 'Connecting to Google...' : 'Select & Verify Google Email Account'}</span>
                </button>
              ) : (
                <div className="relative">
                  <input
                    required
                    type="email"
                    value={email}
                    readOnly
                    className="w-full bg-green-500/5 border border-green-500/40 rounded-xl px-4 py-3.5 text-sm text-green-200 focus:outline-none cursor-not-allowed font-medium"
                    disabled={status === 'submitting'}
                  />
                  <Lock className="w-4 h-4 text-green-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Your Message
            </label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-[#111]/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-green-400 focus:bg-[#161616]/80 transition-all duration-300 resize-none placeholder-gray-600"
              placeholder="Describe your project, internship opportunity, or question..."
              disabled={status === 'submitting'}
            />
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 text-xs text-amber-400 mt-2 bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2 text-xs text-red-400 mt-2 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Failed to send. Please try again or email directly.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="interactive-target w-full group overflow-hidden bg-green-400 hover:bg-white text-black font-bold uppercase tracking-wider text-xs py-4 rounded-xl flex justify-center items-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {status === 'submitting' ? (
              <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <>
                <span>Transmit Message</span>
                <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </>
            )}
          </button>
        </>
      )}
    </form>
  );
};

export const Contact = () => {
  return (
    <section id="contact" className="relative pt-32 pb-12 border-t border-white/5 bg-[#030303]">

      {/* Outer container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

        {/* Dynamic header / bloom */}
        <div className="relative text-center mb-24 z-10">
          <span className="text-gray-500 text-xs font-bold uppercase tracking-widest font-sans mb-3 block">
            // INTEL TRANSMISSION
          </span>
          <h2 className="font-display text-[12vw] md:text-8xl lg:text-9xl text-white leading-none tracking-wide select-none uppercase hover-target">
            Let's Talk
          </h2>
          <div className="w-24 h-1 bg-green-400 mx-auto mt-6 rounded-full" />
        </div>

        {/* Form & details panel grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">

          {/* Left panel: Info */}
          <div className="lg:col-span-5 flex flex-col gap-10 text-left">
            <div>
              <h4 className="text-xl font-bold font-sans text-white uppercase tracking-wider mb-4">
                Location & Availability
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed font-sans font-light max-w-sm">
                Based in Chennai, India, actively pursuing internship and development assignments. Open to remote collaborations worldwide.
              </p>
            </div>

            {/* Inboxes */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                Direct Inquiries
              </span>
              <a
                href="mailto:dasatanu.iitm@gmail.com"
                className="interactive-target flex items-center gap-3 text-white hover:text-green-400 transition-colors duration-300 group w-fit"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-green-400/20 text-gray-400 group-hover:text-green-400 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-xs text-gray-500 block">Email Address</span>
                  <span className="text-sm font-semibold">dasatanu.iitm@gmail.com</span>
                </div>
              </a>
            </div>

            {/* Social rows */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                Developer Ecosystem
              </span>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/thezenforgex"
                  target="_blank"
                  rel="noreferrer"
                  className="interactive-target flex items-center gap-2 border border-white/10 hover:border-green-400/50 bg-white/5 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-green-400 transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-gray-500" />
                </a>

                <a
                  href="https://www.linkedin.com/in/atanu-das-/"
                  target="_blank"
                  rel="noreferrer"
                  className="interactive-target flex items-center gap-2 border border-white/10 hover:border-green-400/50 bg-white/5 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-green-400 transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-gray-500" />
                </a>
              </div>
            </div>

          </div>

          {/* Right panel: Glass form */}
          <div className="lg:col-span-7">
            <GlintCard className="p-8 md:p-10 text-left">
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest block mb-1">
                // SECURE TERMINAL MESSAGE
              </span>
              <h4 className="text-xl font-bold font-sans text-white mb-6 uppercase tracking-wide">
                Send a secure message
              </h4>

              <ContactForm />
            </GlintCard>
          </div>

        </div>

        {/* Global Footer info details */}
        <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
          <div className="text-center md:text-left">
            <span className="font-bold text-white uppercase tracking-wider block mb-1">
              Atanu Das
            </span>
            <span className="font-light">Data Science Student & Full Stack Developer</span>
          </div>

          <div className="flex gap-6">
            <a href="#home" className="interactive-target hover:text-white transition-colors">Home</a>
            <a href="#about" className="interactive-target hover:text-white transition-colors">About</a>
            <a href="#skills" className="interactive-target hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="interactive-target hover:text-white transition-colors">Projects</a>
          </div>

          <div className="text-center md:text-right">
            <span>© {new Date().getFullYear()} Atanu Das.</span>
          </div>
        </div>

      </div>

    </section>
  );
};
