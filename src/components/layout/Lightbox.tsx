import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  images: { src: string; title: string; desc: string }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || images.length === 0) return null;

  const current = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 select-none">
      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 p-5 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <h4 className="text-white font-display font-bold text-lg">{current.title}</h4>
          <p className="text-slate-400 text-xs">{current.desc}</p>
        </div>
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Fechar"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-[#ff5e00] text-white transition-all z-20 cursor-pointer"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-[#ff5e00] text-white transition-all z-20 cursor-pointer"
        aria-label="Próxima"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Main Image */}
      <div className="relative max-w-5xl max-h-[85vh] p-4 flex items-center justify-center">
        <img
          src={current.src}
          alt={current.title}
          className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.9)] border border-white/10"
        />
      </div>

      {/* Bottom Counter */}
      <div className="absolute bottom-6 inset-x-0 text-center text-xs text-slate-400 tracking-wider font-semibold">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};
