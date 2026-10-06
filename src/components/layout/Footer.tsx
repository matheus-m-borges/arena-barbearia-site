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
import React from 'react';
import { MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { business } from '../../config/business';

interface FooterProps {
  onNavigate: (target: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="relative bg-[#030508] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0084ff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff5e00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Mais que um corte. É estilo, amizade, resenha e um ambiente moderno projetado
              para você se sentir em casa.
            </p>
            <div className="pt-2">
              <span className="font-script text-2xl text-[#0084ff]">
                Aqui é diferente!
              </span>
            </div>
          </div>

          {/* Col 2: Links rápidos */}
          <div>
            <h4 className="font-display font-bold uppercase tracking-wider text-white text-sm mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff5e00]" />
              Navegação
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Início', href: '#inicio' },
                { label: 'A Arena', href: '#arena' },
                { label: 'Nossos Serviços', href: '#servicos' },
                { label: 'Nosso Espaço', href: '#espaco' },
                { label: 'Nossa Equipe', href: '#equipe' },
                { label: 'Localização', href: '#localizacao' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.href);
                    }}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Horários de Funcionamento */}
          <div>
            <h4 className="font-display font-bold uppercase tracking-wider text-white text-sm mb-5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0084ff]" />
              Horário de Funcionamento
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {business.hours.map((item) => (
                <li key={item.days} className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">{item.days}</span>
                  <span className="font-semibold text-white">{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contato & Endereço */}
          <div>
            <h4 className="font-display font-bold uppercase tracking-wider text-white text-sm mb-5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#ff5e00]" />
              Atendimento & Redes
            </h4>
            <div className="space-y-3.5 text-sm text-slate-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ff5e00] flex-shrink-0 mt-1" />
                <span>{business.fullAddress}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0084ff] flex-shrink-0" />
                <span className="text-white">{business.phoneDisplay}</span>
              </p>
              {business.instagram && (
                <a
                  href={business.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-[#ff5e00] transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>{business.instagram}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="mt-6">
              <button
                onClick={onOpenBooking}
                className="w-full py-3 px-4 rounded-xl bg-[#ff5e00]/15 hover:bg-[#ff5e00] text-[#ff5e00] hover:text-white font-display font-bold text-xs uppercase tracking-wider border border-[#ff5e00]/30 transition-all duration-300 text-center cursor-pointer"
              >
                Agendar Horário
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Arena Barbearia. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Ilhéus - Bahia</span>
            <span>•</span>
            <span className="text-slate-400">Ecossistema BarberHub</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
