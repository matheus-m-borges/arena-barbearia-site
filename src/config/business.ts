export interface BusinessConfig {
  name: string;
  tagline: string;
  concept: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappUrl: string;
  instagram: string;
  instagramUrl: string;
  address: string;
  city: string;
  state: string;
  cep: string;
  fullAddress: string;
  mapsUrl: string;
  bookingUrl: string; // Vazio = abre modal de agendamento em breve. Quando preenchido, direciona diretamente para o BarberHub.
  hours: { days: string; hours: string }[];
}

export const business: BusinessConfig = {
  name: "Arena Barbearia",
  tagline: "Mais que um corte. É uma Arena.",
  concept: "Estilo, atitude e bem-estar em um só lugar. Aqui você encontra muito mais que um corte. É experiência, amizade e um espaço feito pra você.",
  phone: "5598992347330",
  phoneDisplay: "(98) 99234-7330",
  whatsapp: "5598992347330",
  whatsappUrl: "https://wa.me/5598992347330?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20horários%20da%20Arena%20Barbearia.",
  instagram: "@arenabarbearia",
  instagramUrl: "https://instagram.com/arenabarbearia",
  address: "R. dos Acapus, 23 - Jardim Renascença",
  city: "São Luís",
  state: "MA",
  cep: "65075-020",
  fullAddress: "R. dos Acapus, 23 - Jardim Renascença, São Luís - MA, 65075-020",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=R.+dos+Acapus,+23+-+Jardim+Renascen%C3%A7a,+S%C3%A3o+Lu%C3%ADs+-+MA,+65075-020",
  bookingUrl: "", // Centralização de agendamento no BarberHub
  hours: [
    { days: "Segunda a Sexta", hours: "08h às 20h" },
    { days: "Sábado", hours: "08h às 18h" },
    { days: "Domingo", hours: "09h às 14h" },
  ],
};
