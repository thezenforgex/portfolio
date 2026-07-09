import React from 'react';
import { X } from 'lucide-react';
import { ContactForm } from '../sections/Contact';

interface HireMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HireMeModal = ({ isOpen, onClose }: HireMeModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-modal">
      <div 
        className="relative bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-[0_0_50px_rgba(74,222,128,0.15)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="interactive-target absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5 cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-left">
          <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest block mb-1">
            // INTEL TRANSMISSION MODAL
          </span>
          <h2 className="text-3xl font-bold font-sans text-white mb-2 uppercase tracking-wide">
            Let's Work <span className="text-green-400">Together</span>
          </h2>
          <p className="text-gray-400 text-sm mb-6 font-light leading-relaxed">
            Fill out the secure terminal form below and I will get back to you within 24 hours.
          </p>

          <ContactForm isModal={true} />
        </div>
      </div>
    </div>
  );
};
