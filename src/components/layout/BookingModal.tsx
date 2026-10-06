import React from 'react';
import { X, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { business } from '../../config/business';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#0c121b] border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-10 animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#ff5e00]/10 border border-[#ff5e00]/30 flex items-center justify-center text-[#ff5e00]">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0084ff]">
              Agendamento Online
            </span>
            <h3 className="text-xl font-display font-bold text-white">
              Em Breve no BarberHub
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          Estamos integrando o sistema de agendamento online inteligente oficial da{' '}
          <strong className="text-white">Arena Barbearia</strong> para você escolher
          seu barbeiro e horário favorito em poucos cliques.
        </p>

        <div className="bg-[#101724] border border-white/5 rounded-xl p-4 mb-6 space-y-3">
          <div className="flex items-start gap-3 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-[#ff5e00] flex-shrink-0 mt-0.5" />
            <span>Atendimento por ordem de chegada ou contato direto.</span>
          </div>
          <div className="flex items-start gap-3 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-[#0084ff] flex-shrink-0 mt-0.5" />
            <span>Mesa de sinuca livre, cerveja gelada e café enquanto você aguarda.</span>
          </div>
          <div className="flex items-start gap-3 text-xs text-slate-300">
            <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>{business.fullAddress}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {business.instagram && (
            <a
              href={business.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-display font-semibold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Ver no Instagram</span>
            </a>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-display font-semibold text-xs uppercase tracking-wider transition-colors border border-white/10 cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
