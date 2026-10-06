import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

interface NavbarProps {
  onOpenBooking: () => void;
  onNavigate: (target: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'A Arena', href: '#arena' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Nosso Espaço', href: '#espaco' },
    { label: 'Equipe', href: '#equipe' },
    { label: 'Localização', href: '#localizacao' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'glass-nav py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-[#05080c]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#inicio"
          onClick={(e) => handleLinkClick(e, '#inicio')}
          className="transition-transform duration-300 hover:scale-105"
        >
          <Logo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-xs uppercase tracking-[0.16em] font-display font-semibold text-slate-300 hover:text-white transition-colors relative py-1 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0084ff] to-[#ff5e00] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <Button variant="primary" size="sm" onClick={onOpenBooking}>
            Agendar Horário
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Button variant="primary" size="sm" className="px-3 py-2 text-[11px]" onClick={onOpenBooking}>
            Agendar
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-[#05080c]/95 backdrop-blur-2xl border-t border-white/10 p-6 flex flex-col justify-between animate-in fade-in slide-in-from-top-4 duration-300 z-50 overflow-y-auto">
          <div className="space-y-4 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block text-lg font-display font-bold uppercase tracking-wider text-slate-200 hover:text-[#ff5e00] py-3 border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-8 pb-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
            >
              Agendar Horário
            </Button>
            <p className="text-center text-xs text-slate-500 mt-4">
              Arena Barbearia • Sport Club
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
