import React, { useState } from 'react';
import { Mail, Send, Github, Linkedin, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { GlintCard } from '../components/GlintCard';

export const ContactForm = ({ isModal = false }: { isModal?: boolean }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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
          _subject: `New Portfolio Message from ${name}`,
          _template: "box"
        })
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
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
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111]/60 border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-green-400 focus:bg-[#161616]/80 transition-all duration-300 placeholder-gray-600"
              placeholder="e.g. john@example.com"
              disabled={status === 'submitting'}
            />
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
                href="mailto:atanudas120706@gmail.com"
                className="interactive-target flex items-center gap-3 text-white hover:text-green-400 transition-colors duration-300 group w-fit"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-green-400/20 text-gray-400 group-hover:text-green-400 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-xs text-gray-500 block">Email Address</span>
                  <span className="text-sm font-semibold">atanudas120706@gmail.com</span>
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
                  href="https://github.com/atanudas12-hub"
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
            <span className="block mt-1 text-[10px] text-gray-600 font-bold uppercase tracking-wider">
              Handcrafted in India
            </span>
          </div>
        </div>

      </div>

    </section>
  );
};
