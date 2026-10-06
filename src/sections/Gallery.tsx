import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Images } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GalleryProps {
  onOpenLightbox: (index: number) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onOpenLightbox }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const photo3Ref = useRef<HTMLDivElement>(null);

  const galleryItems = [
    {
      src: '/assets/arena/ambiente/foto-01-sinuca.jpg',
      title: 'Mesa de Sinuca & Convivência',
      desc: 'Mesa oficial de feltro vermelho e sofás para relaxar e bater resenha.',
    },
    {
      src: '/assets/arena/ambiente/foto-02-interior.jpg',
      title: 'Estrutura & Espaço Família',
      desc: 'Bancadas profissionais, iluminação esportiva e área infantil com carrinho amarelo.',
    },
    {
      src: '/assets/arena/ambiente/foto-03-fachada.jpg',
      title: 'Fachada Moderna Arena',
      desc: 'Visual contemporâneo com vidro, paisagismo e acesso facilitado.',
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 1024;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      if (!isMobile) {
        // Timeline de montagem do mosaico conforme scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'center center',
            scrub: 1,
          },
        });

        // Foto 1 começa grande (~70%) e reduz para sua posição
        tl.fromTo(
          photo1Ref.current,
          { scale: 1.15, opacity: 0.7 },
          { scale: 1.0, opacity: 1, duration: 1, ease: 'power2.out' },
          0
        )
          // Foto 2 entra da direita
          .fromTo(
            photo2Ref.current,
            { x: '10vw', opacity: 0 },
            { x: '0vw', opacity: 1, duration: 1, ease: 'power2.out' },
            0.2
          )
          // Foto 3 entra de baixo
          .fromTo(
            photo3Ref.current,
            { y: '10vh', opacity: 0 },
            { y: '0vh', opacity: 1, duration: 1, ease: 'power2.out' },
            0.3
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="espaco"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center bg-[#070b11] py-20 lg:py-28 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Header da Galeria */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-[#ff5e00] mb-2">
            <Images className="w-4 h-4" />
            <span>GALERIA OFICIAL</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-white">
            NOSSO <span className="text-gradient-blue">ESPAÇO</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-body mt-3 leading-relaxed">
            Um ambiente moderno, completo e pensado em cada detalhe para você se sentir em
            casa. Fotografias reais da Arena Barbearia.
          </p>
        </div>

        {/* Mosaico de Fotografias Reais */}
        <div
          ref={mosaicRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
        >
          {/* Foto Principal (Sinuca) - Ocupa 7 colunas */}
          <div
            ref={photo1Ref}
            onClick={() => onOpenLightbox(0)}
            className="lg:col-span-7 relative group rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer min-h-[350px] lg:min-h-[480px]"
          >
            <img
              src={galleryItems[0].src}
              alt={galleryItems[0].title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity group-hover:opacity-75" />

            {/* Badge "Ver Foto" */}
            <div className="absolute top-5 right-5 glass-panel px-3.5 py-1.5 rounded-full text-[11px] font-display font-bold uppercase tracking-wider text-white flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:bg-[#ff5e00] transition-all">
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Foto</span>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[11px] font-display font-bold uppercase tracking-wider text-[#ff5e00] block mb-1">
                Convivência & Lazer
              </span>
              <h3 className="text-2xl font-display font-bold text-white mb-1">
                {galleryItems[0].title}
              </h3>
              <p className="text-xs text-slate-300 max-w-md">{galleryItems[0].desc}</p>
            </div>
          </div>

          {/* Fotos Laterais (Interior & Fachada) - Ocupam 5 colunas */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            {/* Foto 2: Interior / Kids */}
            <div
              ref={photo2Ref}
              onClick={() => onOpenLightbox(1)}
              className="relative group rounded-3xl overflow-hidden border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.7)] cursor-pointer h-[230px] lg:h-[224px]"
            >
              <img
                src={galleryItems[1].src}
                alt={galleryItems[1].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute top-4 right-4 glass-panel px-3 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-wider text-white flex items-center gap-1 opacity-90 group-hover:bg-[#0084ff] transition-all">
                <Eye className="w-3 h-3" />
                <span>Ver</span>
              </div>

              <div className="absolute bottom-4 left-5 right-5">
                <h4 className="text-lg font-display font-bold text-white mb-0.5">
                  {galleryItems[1].title}
                </h4>
                <p className="text-[11px] text-slate-300">{galleryItems[1].desc}</p>
              </div>
            </div>

            {/* Foto 3: Fachada */}
            <div
              ref={photo3Ref}
              onClick={() => onOpenLightbox(2)}
              className="relative group rounded-3xl overflow-hidden border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.7)] cursor-pointer h-[230px] lg:h-[224px]"
            >
              <img
                src={galleryItems[2].src}
                alt={galleryItems[2].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute top-4 right-4 glass-panel px-3 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-wider text-white flex items-center gap-1 opacity-90 group-hover:bg-[#ff5e00] transition-all">
                <Eye className="w-3 h-3" />
                <span>Ver</span>
              </div>

              <div className="absolute bottom-4 left-5 right-5">
                <h4 className="text-lg font-display font-bold text-white mb-0.5">
                  {galleryItems[2].title}
                </h4>
                <p className="text-[11px] text-slate-300">{galleryItems[2].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
