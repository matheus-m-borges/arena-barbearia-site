import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Info, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TeamProps {
  onOpenBooking: () => void;
}

export const Team: React.FC<TeamProps> = ({ onOpenBooking }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const teamMembers = [
    {
      name: 'BARBEIRO 01',
      role: 'Master Barber • Especialista em Cortes Clássicos',
      image: '/assets/arena/equipe/barbeiro-01.jpg',
      ref: card1Ref,
    },
    {
      name: 'BARBEIRO 02',
      role: 'Fade Specialist • Especialista em Barba e Degradê',
      image: '/assets/arena/equipe/barbeiro-02.jpg',
      ref: card2Ref,
    },
    {
      name: 'BARBEIRO 03',
      role: 'Stylist • Visagismo e Atendimento Personalizado',
      image: '/assets/arena/equipe/barbeiro-03.jpg',
      ref: card3Ref,
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 1024;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      if (!isMobile) {
        // Cards começam sobrepostos no centro e se abrem conforme scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'center center',
            scrub: 1,
          },
        });

        // Card 1 desloca para a esquerda com leve rotação
        tl.fromTo(
          card1Ref.current,
          { x: 120, rotationY: 8, opacity: 0.5 },
          { x: 0, rotationY: -3, opacity: 1, duration: 1, ease: 'power2.out' },
          0
        )
          // Card 2 permanece no centro
          .fromTo(
            card2Ref.current,
            { scale: 0.9, opacity: 0.8 },
            { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' },
            0
          )
          // Card 3 desloca para a direita com leve rotação
          .fromTo(
            card3Ref.current,
            { x: -120, rotationY: -8, opacity: 0.5 },
            { x: 0, rotationY: 3, opacity: 1, duration: 1, ease: 'power2.out' },
            0
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="equipe"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center bg-[#070b10] py-20 lg:py-28 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-[#ff5e00] mb-2">
            <Users className="w-4 h-4" />
            <span>NOSSA EQUIPE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-white">
            PROFISSIONAIS QUE <br />
            <span className="text-gradient-blue">FAZEM A DIFERENÇA</span>
          </h2>
          <p className="text-sm text-slate-400 font-body mt-3">
            Técnica, pontualidade e dedicação para proporcionar sua melhor experiência.
          </p>

          {/* Aviso obrigatório de conteúdo temporário */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Conteúdo temporário — Fotos e nomes da equipe oficial em atualização</span>
          </div>
        </div>

        {/* Grid dos Cards com efeito leque */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[1200px]">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              ref={member.ref}
              className="relative group rounded-3xl overflow-hidden bg-[#0c121b] border border-white/10 hover:border-[#ff5e00]/50 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.8)] will-change-transform"
            >
              {/* Foto com transição P&B parcial para cor no hover */}
              <div className="relative h-96 overflow-hidden bg-slate-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c121b] via-[#0c121b]/40 to-transparent" />

                {/* Badge temporário */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-wider bg-black/60 text-slate-300 backdrop-blur-md border border-white/10">
                    Aguardando Foto Real
                  </span>
                </div>
              </div>

              {/* Informações & Botão de Agendamento */}
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-white group-hover:text-[#ff5e00] transition-colors mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-body mb-6">
                  {member.role}
                </p>

                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 group-hover:bg-[#ff5e00] text-slate-300 group-hover:text-white font-display font-bold text-xs uppercase tracking-wider border border-white/10 group-hover:border-[#ff5e00] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar com este profissional</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
