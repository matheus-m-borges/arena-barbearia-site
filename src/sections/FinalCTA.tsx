import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const logoCenterRef = useRef<HTMLDivElement>(null);
  const combRef = useRef<HTMLDivElement>(null);
  const shearsRef = useRef<HTMLDivElement>(null);
  const clipperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 1024;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      if (!isMobile) {
        // Transição: Objetos convergem em volta do logo central sem colidir
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: 1.2,
          },
        });

        // Pente entra da esquerda
        if (combRef.current) {
          tl.fromTo(
            combRef.current,
            { x: '-30vw', opacity: 0, rotate: -25 },
            { x: '0vw', opacity: 0.8, rotate: -8, duration: 1, ease: 'power2.out' },
            0
          );
        }

        // Tesoura entra da direita
        if (shearsRef.current) {
          tl.fromTo(
            shearsRef.current,
            { x: '30vw', opacity: 0, rotate: 25 },
            { x: '0vw', opacity: 0.8, rotate: 12, duration: 1, ease: 'power2.out' },
            0
          );
        }

        // Máquina sobe da parte inferior
        if (clipperRef.current) {
          tl.fromTo(
            clipperRef.current,
            { y: '20vh', opacity: 0, scale: 0.8 },
            { y: '0vh', opacity: 0.85, scale: 1, duration: 1, ease: 'power2.out' },
            0.1
          );
        }

        // Logo pulsa suavemente no centro
        if (logoCenterRef.current) {
          tl.fromTo(
            logoCenterRef.current,
            { scale: 0.9, opacity: 0.7 },
            { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' },
            0
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] w-full flex items-center justify-center bg-[#030508] py-24 overflow-hidden border-t border-white/5"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#0084ff]/15 to-[#ff5e00]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Converging Tools (Desktop) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Pente à esquerda */}
        <div
          ref={combRef}
          className="absolute left-[8vw] top-[30vh] w-64 will-change-transform"
        >
          <img
            src="/assets/arena/objetos/pente.jpg"
            alt="Pente de Barbeiro"
            className="w-full object-contain mix-blend-screen opacity-60"
            loading="lazy"
          />
        </div>

        {/* Tesoura à direita */}
        <div
          ref={shearsRef}
          className="absolute right-[8vw] top-[26vh] w-64 will-change-transform"
        >
          <img
            src="/assets/arena/objetos/tesoura.jpg"
            alt="Tesoura de Barbeiro"
            className="w-full object-contain mix-blend-screen opacity-60"
            loading="lazy"
          />
        </div>

        {/* Máquina na parte inferior */}
        <div
          ref={clipperRef}
          className="absolute right-[22vw] bottom-[6vh] w-56 will-change-transform"
        >
          <img
            src="/assets/arena/objetos/maquina.jpg"
            alt="Máquina de Corte"
            className="w-full object-contain mix-blend-screen opacity-70"
            loading="lazy"
          />
        </div>
      </div>

      {/* Conteúdo Central */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo Arena com aura */}
        <div ref={logoCenterRef} className="inline-block mb-8 relative group">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#0084ff] to-[#ff5e00] opacity-40 blur-xl group-hover:opacity-70 transition duration-700" />
          <img
            src="/assets/arena/logo/arena-logo.png"
            alt="Arena Barbearia"
            className="relative w-28 h-28 sm:w-36 sm:h-36 object-contain mx-auto rounded-full shadow-[0_0_40px_rgba(255,94,0,0.5)] border-2 border-white/20"
            loading="lazy"
          />
        </div>

        {/* Textos */}
        <p className="text-xs sm:text-sm font-display font-bold uppercase tracking-[0.25em] text-[#ff5e00] mb-3">
          SEU PRÓXIMO CORTE
        </p>

        <h2 className="text-5xl sm:text-7xl font-display font-black tracking-tight text-white mb-6">
          COMEÇA <span className="text-gradient-blue">AQUI.</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 font-body max-w-xl mx-auto mb-10 leading-relaxed">
          Agende agora seu horário e garanta seu estilo com a qualidade e a resenha que só a
          Arena Barbearia oferece.
        </p>

        {/* CTA Button */}
        <div className="inline-block relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#0084ff] to-[#ff5e00] opacity-50 blur-lg group-hover:opacity-100 transition duration-500" />
          <Button
            variant="primary"
            size="lg"
            className="relative px-10 py-5 text-base sm:text-lg"
            onClick={onOpenBooking}
          >
            Agendar Horário
          </Button>
        </div>

        <p className="text-xs text-slate-500 mt-6 font-display uppercase tracking-wider">
          Sem complicações • Atendimento de primeira
        </p>
      </div>
    </section>
  );
};
