import { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BookingModal } from './components/layout/BookingModal';
import { Lightbox } from './components/layout/Lightbox';
import { Hero } from './sections/Hero';
import { Experience } from './sections/Experience';
import { Services } from './sections/Services';
import { Gallery } from './sections/Gallery';
import { FamilySpace } from './sections/FamilySpace';
import { Team } from './sections/Team';
import { Location } from './sections/Location';
import { FinalCTA } from './sections/FinalCTA';
import { business } from './config/business';

export function App() {
  const { scrollTo } = useLenis();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryImages = [
    {
      src: '/assets/arena/ambiente/foto-01-sinuca.jpg',
      title: 'Mesa de Sinuca & Espaço de Convivência',
      desc: 'Mesa oficial de feltro vermelho personalizada da Arena Barbearia com sofás Chesterfield.',
    },
    {
      src: '/assets/arena/ambiente/foto-02-interior.jpg',
      title: 'Estrutura Completa & Área Infantil',
      desc: 'Bancadas de atendimento profissional com espelhos e cadeira infantil estilizada em carrinho amarelo.',
    },
    {
      src: '/assets/arena/ambiente/foto-03-fachada.jpg',
      title: 'Fachada Oficial da Arena Barbearia',
      desc: 'Entrada com logotipo no vidro, paisagismo tropical e arquitetura contemporânea.',
    },
  ];

  const handleOpenBooking = () => {
    // Se houver URL de agendamento externa configurada (futuro BarberHub), redireciona
    if (business.bookingUrl && business.bookingUrl.trim() !== '') {
      window.open(business.bookingUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Abre modal de agendamento em breve
      setBookingModalOpen(true);
    }
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#05080c] text-slate-100 flex flex-col selection:bg-[#ff5e00] selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} onNavigate={scrollTo} />

      {/* Main Landing Sections */}
      <main className="flex-grow">
        <Hero onOpenBooking={handleOpenBooking} />
        <Experience />
        <Services onOpenBooking={handleOpenBooking} />
        <Gallery onOpenLightbox={handleOpenLightbox} />
        <FamilySpace />
        <Team onOpenBooking={handleOpenBooking} />
        <Location />
        <FinalCTA onOpenBooking={handleOpenBooking} />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollTo} onOpenBooking={handleOpenBooking} />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        images={galleryImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % galleryImages.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
      />

      {/* Botão de Agendamento Fixo no Rodapé (Mobile Only) */}
      <div className="lg:hidden fixed bottom-4 inset-x-4 z-30">
        <button
          onClick={handleOpenBooking}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#ff5e00] to-[#ff7728] text-white font-display font-bold uppercase tracking-wider text-xs shadow-[0_10px_25px_rgba(255,94,0,0.5)] border border-[#ff8438]/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform"
        >
          <span>Agendar Horário</span>
        </button>
      </div>
    </div>
  );
}

export default App;
