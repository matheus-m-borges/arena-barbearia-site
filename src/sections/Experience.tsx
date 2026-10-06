import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Armchair, Gamepad2, Coffee, Users2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const lineEstiloRef = useRef<HTMLSpanElement>(null);
  const lineAmizadeRef = useRef<HTMLSpanElement>(null);
  const lineHistoriasRef = useRef<HTMLSpanElement>(null);
  const benefitsContainerRef = useRef<HTMLDivElement>(null);
  const shearsTransitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 1024;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // 1. Entrance animation for title lines
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 35%',
          scrub: false,
        },
      });

      titleTl
        .fromTo(
          lineEstiloRef.current,
          { opacity: 0, y: 50, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' }
        )
        .fromTo(
          lineAmizadeRef.current,
          { opacity: 0, y: 50, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          lineHistoriasRef.current,
          { opacity: 0, y: 50, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        );

      // 2. Image scale on scroll: 1.12 -> 1.00
      gsap.fromTo(
        imgRef.current,
        { scale: 1.12 },
        {
          scale: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );

      // 3. Desktop Pin & progressive reveal of 4 benefit badges
      if (!isMobile && benefitsContainerRef.current) {
        const benefitCards = benefitsContainerRef.current.children;

        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=100%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        // Benefits enter progressively from left to right
        gsap.set(benefitCards, { opacity: 0, x: -40, scale: 0.95 });

        pinTl.to(benefitCards, {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.25,
          ease: 'power2.out',
        });

        // 4. Shears surge from right diagonal transition to Services
        if (shearsTransitionRef.current) {
          pinTl.fromTo(
            shearsTransitionRef.current,
            { x: '110vw', rotation: 30, opacity: 0 },
            { x: '40vw', rotation: -10, opacity: 1, ease: 'power2.out' },
            '-=0.3'
          );
        }
      }
    }, sectionRef);

    // Mouse tilt effect on pool photo (desktop only)
    if (!isMobile && imageContainerRef.current && imgRef.current) {
      const container = imageContainerRef.current;
      const img = imgRef.current;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // Max tilt: 2deg as specified
        gsap.to(img, {
          rotationY: x * 2,
          rotationX: -y * 2,
          scale: 1.025,
          duration: 0.5,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(img, {
          rotationY: 0,
          rotationX: 0,
          scale: 1.0,
          duration: 0.8,
          ease: 'power2.out',
        });
      };

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, []);

  const benefits = [
    {
      icon: Armchair,
      title: 'ESPAÇO CONFORTÁVEL',
      desc: 'Sofás Chesterfield e climatização de ponta',
      color: 'border-[#0084ff]/30 text-[#0084ff]',
    },
    {
      icon: Gamepad2,
      title: 'DIVERSÃO E RESENHA',
      desc: 'Mesa de sinuca oficial e futebol na TV',
      color: 'border-[#ff5e00]/30 text-[#ff5e00]',
    },
    {
      icon: Coffee,
      title: 'CAFÉ SEMPRE À DISPOSIÇÃO',
      desc: 'Café expresso fresco e bebidas geladas',
      color: 'border-amber-500/30 text-amber-400',
    },
    {
      icon: Users2,
      title: 'PARA TODAS AS IDADES',
      desc: 'Ambiente familiar do avô ao neto',
      color: 'border-emerald-500/30 text-emerald-400',
    },
  ];

  return (
    <section
      id="arena"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center bg-[#070b10] py-20 lg:py-28 overflow-hidden border-t border-white/5"
    >
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#0084ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Coluna de Imagem (55% a 60% largura no desktop) */}
          <div className="lg:col-span-7 relative">
            <div
              ref={imageContainerRef}
              className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] perspective-[1000px] group"
            >
              <img
                ref={imgRef}
                src="/assets/arena/ambiente/foto-01-sinuca.jpg"
                alt="Arena Barbearia - Mesa de Sinuca e Sofás de Convivência"
                className="w-full h-[400px] sm:h-[480px] lg:h-[560px] object-cover will-change-transform transition-all duration-300"
                loading="lazy"
              />

              {/* Gradient border vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05080c]/80 via-transparent to-black/20 pointer-events-none" />

              {/* Tag com logo na foto */}
              <div className="absolute top-5 left-5 glass-panel px-4 py-2 rounded-xl flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5e00]" />
                <span className="text-xs font-display font-bold uppercase tracking-wider text-white">
                  Sport Club & Convivência
                </span>
              </div>
            </div>
          </div>

          {/* Coluna de Textos & Benefícios */}
          <div ref={textColRef} className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#ff5e00] block mb-2">
                UM AMBIENTE FEITO PARA VOCÊ
              </span>

              <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight leading-[1.05] text-white">
                <span ref={lineEstiloRef} className="block">
                  ESTILO,
                </span>
                <span ref={lineAmizadeRef} className="block">
                  AMIZADE
                </span>
                <span ref={lineHistoriasRef} className="block text-gradient-blue">
                  E BOAS HISTÓRIAS
                </span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 font-body leading-relaxed">
              Na Arena Barbearia, você encontra um espaço moderno, confortável e com aquele
              clima de resenha que todo homem gosta. Aqui o cuidado vai além do visual: é sobre
              se sentir bem.
            </p>

            {/* Grid dos 4 benefícios progressivos */}
            <div
              ref={benefitsContainerRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4"
            >
              {benefits.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-4 rounded-2xl bg-[#0c121b] border border-white/5 hover:border-white/15 transition-all duration-300 flex items-start gap-3.5 group"
                  >
                    <div
                      className={`p-2.5 rounded-xl bg-white/5 border flex-shrink-0 group-hover:scale-110 transition-transform ${item.color}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-display font-bold text-white tracking-wider uppercase mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scissors transition element (desktop) */}
      <div
        ref={shearsTransitionRef}
        className="hidden lg:block absolute bottom-4 right-0 z-20 pointer-events-none will-change-transform opacity-0"
      >
        <img
          src="/assets/arena/objetos/tesoura.jpg"
          alt="Tesoura em transição"
          className="w-48 object-contain mix-blend-screen opacity-70"
          loading="lazy"
        />
      </div>
    </section>
  );
};
