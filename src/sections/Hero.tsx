import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../components/ui/Button';
import { Award, Users, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleSmallRef = useRef<HTMLParagraphElement>(null);
  const titleArenaRef = useRef<HTMLSpanElement>(null);
  const titleBarbeariaRef = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const clipperRef = useRef<HTMLDivElement>(null);
  const razorTransitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([titleSmallRef.current, titleArenaRef.current, titleBarbeariaRef.current, subtextRef.current, ctaRef.current, badgesRef.current], { opacity: 1, y: 0 });
        return;
      }

      // 1. Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        bgRef.current,
        { scale: 1.08 },
        { scale: 1.0, duration: 1.5, ease: 'power2.out' }
      )
        .fromTo(
          titleSmallRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.8 },
          '-=1.0'
        )
        .fromTo(
          titleArenaRef.current,
          { opacity: 0, y: 30, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
          '-=0.6'
        )
        .fromTo(
          titleBarbeariaRef.current,
          { opacity: 0, y: 30, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
          '-=0.7'
        )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.7 },
          '-=0.4'
        )
        .fromTo(
          badgesRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        );

      if (!isMobile && clipperRef.current) {
        tl.fromTo(
          clipperRef.current,
          { opacity: 0, scale: 0.9, rotate: -15 },
          { opacity: 1, scale: 1.08, rotate: -8, duration: 1.2 },
          '-=1.2'
        );
      }

      // 2. Scroll Scrub Timeline (0% a 15%)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      scrollTl
        .to(bgRef.current, { scale: 1.08, ease: 'none' }, 0)
        .to(
          [titleSmallRef.current, titleArenaRef.current, titleBarbeariaRef.current, subtextRef.current],
          { y: -80, opacity: 0, ease: 'power1.in' },
          0
        )
        .to(ctaRef.current, { opacity: 0, y: -40, ease: 'power1.in' }, 0)
        .to(badgesRef.current, { opacity: 0, y: -30, ease: 'power1.in' }, 0);

      if (!isMobile && clipperRef.current) {
        scrollTl.to(
          clipperRef.current,
          { x: '20vw', rotation: 8, scale: 0.88, opacity: 0.2, ease: 'none' },
          0
        );
      }

      // 3. Razor Transition (12% a 20% scroll)
      if (razorTransitionRef.current) {
        gsap.fromTo(
          razorTransitionRef.current,
          { x: '-120vw', opacity: 0 },
          {
            x: '120vw',
            opacity: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: heroRef.current,
              start: '70% top',
              end: '110% top',
              scrub: 0.6,
            },
          }
        );
      }
    }, heroRef);

    // Mouse parallax on clipper (desktop only)
    if (!isMobile && clipperRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xOffset = (clientX / window.innerWidth - 0.5) * 18;
        const yOffset = (clientY / window.innerHeight - 0.5) * 18;

        gsap.to(clipperRef.current, {
          x: xOffset,
          y: yOffset,
          duration: 1.2,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#05080c] pt-24 pb-16 lg:pt-0 lg:pb-0"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center will-change-transform scale-100"
          style={{
            backgroundImage: "url('/assets/arena/ambiente/foto-02-interior.jpg')",
          }}
        />
        {/* Cinematic Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(3,5,8,0.97) 0%, rgba(3,5,8,0.85) 42%, rgba(3,5,8,0.40) 72%, rgba(3,5,8,0.15) 100%)',
          }}
        />
        {/* Radial highlight for depth */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#05080c]/40 to-[#05080c]/90 pointer-events-none" />
      </div>

      {/* Floating Clipper (Desktop only) */}
      <div
        ref={clipperRef}
        className="hidden lg:block absolute right-[-2vw] top-[18vh] z-20 pointer-events-none will-change-transform select-none"
        style={{ transform: 'rotate(-8deg) scale(1.08)' }}
      >
        <div className="relative">
          {/* Subtle blue & orange ambient glow */}
          <div className="absolute -inset-8 bg-gradient-to-r from-[#0084ff]/25 to-[#ff5e00]/25 rounded-full blur-2xl opacity-60" />
          <img
            src="/assets/arena/objetos/maquina.jpg"
            alt="Máquina de Corte Arena"
            className="w-[380px] xl:w-[460px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] rounded-3xl mix-blend-screen opacity-90"
            loading="eager"
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Tagline superior */}
          <p
            ref={titleSmallRef}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-bold uppercase tracking-[0.25em] text-[#ff5e00] mb-3 select-none"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff5e00] animate-pulse" />
            MAIS QUE UM CORTE
          </p>

          {/* Headline Principal */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight leading-[0.92] mb-6 select-none">
            <span ref={titleArenaRef} className="block text-white">
              ARENA
            </span>
            <span
              ref={titleBarbeariaRef}
              className="block text-gradient-blue relative"
            >
              BARBEARIA
              <span className="font-script text-2xl sm:text-3xl lg:text-4xl text-[#ff5e00] font-normal tracking-normal ml-3 select-none opacity-95 inline-block -rotate-6">
                Aqui é diferente!
              </span>
            </span>
          </h1>

          {/* Subtítulo Descritivo */}
          <p
            ref={subtextRef}
            className="text-base sm:text-lg text-slate-300 font-body leading-relaxed max-w-xl mb-8"
          >
            Estilo, atitude e bem-estar em um só lugar. Aqui você encontra muito mais que um
            corte de cabelo. É experiência, amizade e um espaço feito pra você.
          </p>

          {/* CTA & Botão */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-12">
            <Button variant="primary" size="lg" onClick={onOpenBooking}>
              Agendar Horário
            </Button>
            <a
              href="#arena"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-slate-300 hover:text-white px-5 py-3.5 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
            >
              Conhecer a Barbearia
            </a>
          </div>

          {/* Badges / Diferenciais */}
          <div
            ref={badgesRef}
            className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-white/10 max-w-lg"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5 text-center sm:text-left">
              <div className="p-2 rounded-lg bg-[#0084ff]/10 text-[#0084ff] border border-[#0084ff]/20">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs sm:text-sm font-display font-bold text-white">
                  Profissionais
                </span>
                <span className="block text-[11px] text-slate-400">Experientes</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5 text-center sm:text-left">
              <div className="p-2 rounded-lg bg-[#ff5e00]/10 text-[#ff5e00] border border-[#ff5e00]/20">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs sm:text-sm font-display font-bold text-white">
                  Ambiente
                </span>
                <span className="block text-[11px] text-slate-400">Aconchegante</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5 text-center sm:text-left">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs sm:text-sm font-display font-bold text-white">
                  Estrutura
                </span>
                <span className="block text-[11px] text-slate-400">Completa</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Razor Cut Transition Beam (entra x: -120vw atravessando para +120vw) */}
      <div
        ref={razorTransitionRef}
        className="pointer-events-none absolute bottom-0 inset-x-0 h-16 z-30 flex items-center justify-center opacity-0 overflow-hidden"
      >
        <div className="relative w-full flex items-center">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#0084ff] to-[#ff5e00] shadow-[0_0_20px_#0084ff]" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-10 bg-white/20 blur-md rounded-full" />
        </div>
      </div>
    </section>
  );
};
