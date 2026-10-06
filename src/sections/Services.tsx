import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scissors, ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps {
  onOpenBooking: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const shearsPinRef = useRef<HTMLDivElement>(null);
  const bladeUpperRef = useRef<SVGGElement>(null);
  const bladeLowerRef = useRef<SVGGElement>(null);
  const lineBeamRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: 'CORTE',
      desc: 'Estilo e personalidade no seu dia a dia.',
      tag: 'Mais Pedido',
      image: '/assets/arena/servicos/corte.jpg',
      badgeColor: 'bg-[#ff5e00]',
    },
    {
      title: 'BARBA',
      desc: 'Cuidado e precisão em cada detalhe.',
      tag: 'Precisão',
      image: '/assets/arena/servicos/barba.jpg',
      badgeColor: 'bg-[#0084ff]',
    },
    {
      title: 'CORTE + BARBA',
      desc: 'O combo completo para o seu melhor estilo.',
      tag: 'Combo Vip',
      image: '/assets/arena/servicos/corte-barba.jpg',
      badgeColor: 'bg-emerald-500',
    },
    {
      title: 'INFANTIL',
      desc: 'Estilo e cuidado especial para os pequenos.',
      tag: 'Kids Arena',
      image: '/assets/arena/servicos/infantil.jpg',
      badgeColor: 'bg-amber-500',
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 1024;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const cards = cardsContainerRef.current?.children;
      if (!cards) return;

      if (!isMobile) {
        // Desktop timeline sincronizada com a tesoura
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        // Estado inicial dos cards: deslocados para baixo, opacos
        gsap.set(cards, { y: 70, opacity: 0, scale: 0.94 });

        // 25% - Card 1 (CORTE) & Blades snip
        tl.to(cards[0], { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }, 0.25)
          .to(bladeUpperRef.current, { rotate: -12, transformOrigin: '50% 50%', duration: 0.3 }, 0.2)
          .to(bladeUpperRef.current, { rotate: 0, transformOrigin: '50% 50%', duration: 0.2 }, 0.26)
          .to(bladeLowerRef.current, { rotate: 12, transformOrigin: '50% 50%', duration: 0.3 }, 0.2)
          .to(bladeLowerRef.current, { rotate: 0, transformOrigin: '50% 50%', duration: 0.2 }, 0.26);

        // 50% - Card 2 (BARBA) & Blades snip
        tl.to(cards[1], { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }, 0.5)
          .to(bladeUpperRef.current, { rotate: -15, transformOrigin: '50% 50%', duration: 0.3 }, 0.45)
          .to(bladeUpperRef.current, { rotate: 0, transformOrigin: '50% 50%', duration: 0.2 }, 0.51)
          .to(bladeLowerRef.current, { rotate: 15, transformOrigin: '50% 50%', duration: 0.3 }, 0.45)
          .to(bladeLowerRef.current, { rotate: 0, transformOrigin: '50% 50%', duration: 0.2 }, 0.51);

        // 75% - Card 3 (CORTE + BARBA) & Blades snip
        tl.to(cards[2], { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }, 0.75)
          .to(bladeUpperRef.current, { rotate: -12, transformOrigin: '50% 50%', duration: 0.3 }, 0.7)
          .to(bladeUpperRef.current, { rotate: 0, transformOrigin: '50% 50%', duration: 0.2 }, 0.76)
          .to(bladeLowerRef.current, { rotate: 12, transformOrigin: '50% 50%', duration: 0.3 }, 0.7)
          .to(bladeLowerRef.current, { rotate: 0, transformOrigin: '50% 50%', duration: 0.2 }, 0.76);

        // 100% - Card 4 (INFANTIL)
        tl.to(cards[3], { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }, 1.0)
          .to(bladeUpperRef.current, { rotate: -18, transformOrigin: '50% 50%', duration: 0.3 }, 0.95)
          .to(bladeUpperRef.current, { rotate: 0, transformOrigin: '50% 50%', duration: 0.2 }, 1.01)
          .to(bladeLowerRef.current, { rotate: 18, transformOrigin: '50% 50%', duration: 0.3 }, 0.95)
          .to(bladeLowerRef.current, { rotate: 0, transformOrigin: '50% 50%', duration: 0.2 }, 1.01);

        // Transição: Linha fina azul atravessa e expande ao final
        if (lineBeamRef.current) {
          tl.fromTo(
            lineBeamRef.current,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.4, ease: 'power2.inOut' },
            0.9
          );
        }
      } else {
        // Mobile scroll stagger simples
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center bg-[#05080c] py-20 lg:py-24 overflow-hidden border-t border-white/5"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#0084ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Header da seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-[#0084ff] mb-2">
              <Scissors className="w-4 h-4" />
              <span>NOSSOS SERVIÇOS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-white">
              CUIDADO, TÉCNICA <br />
              <span className="text-gradient-orange">& ESTILO PARA VOCÊ</span>
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-lg">
              Cuidado, técnica e precisão para o seu melhor visual em cada detalhe.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-slate-300 hover:text-[#ff5e00] transition-colors group cursor-pointer"
            >
              <span>Ver todos os serviços</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Floating animated scissors indicator (Desktop) */}
        <div
          ref={shearsPinRef}
          className="hidden lg:flex items-center justify-end mb-4 pr-6 select-none pointer-events-none"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400">
            <svg
              className="w-6 h-6 text-[#ff5e00]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <g ref={bladeUpperRef}>
                <line x1="6" y1="6" x2="18" y2="18" />
                <circle cx="6" cy="6" r="3" />
              </g>
              <g ref={bladeLowerRef}>
                <line x1="18" y1="6" x2="6" y2="18" />
                <circle cx="6" cy="18" r="3" />
              </g>
            </svg>
            <span className="font-display font-semibold tracking-wider uppercase text-[11px] text-slate-300">
              Sincronizado no Corte
            </span>
          </div>
        </div>

        {/* Grid dos 4 Cards */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((serv) => (
            <div
              key={serv.title}
              onClick={onOpenBooking}
              className="group relative rounded-2xl overflow-hidden bg-[#0a0e16] border border-white/10 hover:border-[#0084ff]/60 hover:-translate-y-2 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.6)] cursor-pointer flex flex-col"
            >
              {/* Imagem do Serviço */}
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <img
                  src={serv.image}
                  alt={serv.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e16] via-[#0a0e16]/30 to-transparent" />

                {/* Badge no topo */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-wider text-white shadow-md ${serv.badgeColor}`}
                  >
                    <Sparkles className="w-3 h-3" />
                    {serv.tag}
                  </span>
                </div>

                {/* Overlay no hover com seta */}
                <div className="absolute inset-0 bg-[#0084ff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="glass-panel px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider text-white flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span>Conhecer Serviço</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#ff5e00]" />
                  </div>
                </div>
              </div>

              {/* Informações */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-display font-black text-white group-hover:text-[#0084ff] transition-colors mb-2">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-body">
                    {serv.desc}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="font-display font-semibold uppercase text-slate-400 group-hover:text-white transition-colors">
                    Agendar
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#ff5e00] text-slate-300 group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blue Beam transition line to Gallery */}
      <div
        ref={lineBeamRef}
        className="hidden lg:block absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#0084ff] via-[#00b4d8] to-[#ff5e00] shadow-[0_0_15px_#0084ff]"
      />
    </section>
  );
};
