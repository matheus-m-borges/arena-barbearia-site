import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Baby, ShieldCheck, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const FamilySpace: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageClipRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 1024;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      if (!isMobile && imageClipRef.current) {
        // Clip-path abre de inset(10% 20% 10% 20%) para inset(0 0 0 0)
        gsap.fromTo(
          imageClipRef.current,
          { clipPath: 'inset(10% 20% 10% 20%)', opacity: 0.6 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
            },
          }
        );

        // Texto entra no sentido oposto
        if (textContentRef.current) {
          gsap.fromTo(
            textContentRef.current,
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                end: 'top 30%',
                scrub: 1,
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] w-full flex items-center bg-[#05080c] py-20 lg:py-28 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Textos à esquerda */}
          <div ref={textContentRef} className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-[#0084ff]">
              <Heart className="w-4 h-4 text-[#ff5e00]" />
              <span>EXPERIÊNCIA COMPLETA</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-white leading-[1.08]">
              UM ESPAÇO <br />
              <span className="text-gradient-arena">PARA TODOS</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-body leading-relaxed">
              Aqui a experiência acolhe todas as gerações. Criamos uma estrutura pensada
              com carinho para pais e filhos: enquanto você cuida da barba ou joga uma sinuca,
              os pequenos contam com atendimento paciente, espaço dedicado e até cadeira
              especial de corte.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0c121b] border border-white/5">
                <Baby className="w-5 h-5 text-[#ff5e00] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-display font-bold text-white uppercase tracking-wider">
                    Corte Infantil com Paciência
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Cadeira temática de carrinho amarelo e ambiente lúdico.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0c121b] border border-white/5">
                <ShieldCheck className="w-5 h-5 text-[#0084ff] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-display font-bold text-white uppercase tracking-wider">
                    Conforto Familiar
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Ambiente limpo, seguro, respeitoso e climatizado para toda a família.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Imagem real à direita com Clip-path animado */}
          <div className="lg:col-span-7 relative">
            <div
              ref={imageClipRef}
              className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              <img
                src="/assets/arena/ambiente/foto-02-interior.jpg"
                alt="Arena Barbearia - Espaço Infantil e Estrutura"
                className="w-full h-[400px] sm:h-[480px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-display font-bold uppercase tracking-wider text-[#0084ff] block mb-1">
                    Estrutura Dedicada
                  </span>
                  <p className="text-sm font-display font-bold text-white">
                    Do primeiro corte ao estilo definitivo
                  </p>
                </div>
                <div className="p-3 rounded-xl glass-panel text-white">
                  <Sparkles className="w-5 h-5 text-[#ff5e00]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
