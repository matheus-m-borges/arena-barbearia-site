import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, ExternalLink } from 'lucide-react';
import { business } from '../config/business';

gsap.registerPlugin(ScrollTrigger);

export const Location: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const facadeImgRef = useRef<HTMLImageElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 1024;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Efeito de câmera se afastando: começa scale 1.55 focada na logo do vidro e reduz para 1.00
      if (facadeImgRef.current) {
        gsap.fromTo(
          facadeImgRef.current,
          { scale: 1.55 },
          {
            scale: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'center center',
              scrub: 1.2,
            },
          }
        );
      }

      if (!isMobile && infoCardRef.current) {
        gsap.fromTo(
          infoCardRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'top 20%',
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="localizacao"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center bg-[#05080c] py-20 lg:py-28 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Coluna da Imagem Real da Fachada (Efeito Câmera Zoom Out) */}
          <div className="lg:col-span-7 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] group">
              <img
                ref={facadeImgRef}
                src="/assets/arena/ambiente/foto-03-fachada.jpg"
                alt="Fachada Oficial Arena Barbearia"
                className="w-full h-[400px] sm:h-[480px] lg:h-[540px] object-cover will-change-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-5 left-5 glass-panel px-4 py-2 rounded-xl flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0084ff]" />
                <span className="text-xs font-display font-bold uppercase tracking-wider text-white">
                  Fachada Oficial
                </span>
              </div>
            </div>
          </div>

          {/* Coluna de Informações e Botão Google Maps */}
          <div ref={infoCardRef} className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            <div>
              <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#0084ff] block mb-2">
                NOSSA LOCALIZAÇÃO
              </span>
              <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-white leading-[1.05]">
                VENHA VIVER <br />
                <span className="text-gradient-orange">ESSA EXPERIÊNCIA</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 font-body leading-relaxed">
              Estamos prontos para te receber em um espaço moderno, climatizado e acolhedor.
              Venha tomar um café, jogar uma sinuca e sair no seu melhor visual.
            </p>

            {/* Card com endereço e horários */}
            <div className="p-6 rounded-2xl bg-[#0c121b] border border-white/10 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#ff5e00]/10 text-[#ff5e00] border border-[#ff5e00]/20 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-display font-bold text-white uppercase tracking-wider">
                    Endereço
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">{business.fullAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-white/5">
                <div className="p-2.5 rounded-xl bg-[#0084ff]/10 text-[#0084ff] border border-[#0084ff]/20 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-display font-bold text-white uppercase tracking-wider">
                    Horários
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Segunda a Sexta: 08h às 20h • Sábado: 08h às 18h
                  </p>
                </div>
              </div>
            </div>

            {/* Botão Ver no Google Maps */}
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-xl bg-[#111722] hover:bg-[#1a2334] text-white font-display font-bold text-xs uppercase tracking-wider border border-white/10 hover:border-[#0084ff]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,132,255,0.4)] group"
            >
              <MapPin className="w-4 h-4 text-[#ff5e00]" />
              <span>Ver no Google Maps</span>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
