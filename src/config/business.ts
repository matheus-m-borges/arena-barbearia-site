export interface BusinessConfig {
  name: string;
  tagline: string;
  concept: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  instagram: string;
  instagramUrl: string;
  address: string;
  city: string;
  state: string;
  fullAddress: string;
  mapsUrl: string;
  bookingUrl: string; // Vazio = abre modal de agendamento em breve. Quando preenchido, direciona diretamente para o BarberHub.
  hours: { days: string; hours: string }[];
}

export const business: BusinessConfig = {
  name: "Arena Barbearia",
  tagline: "Mais que um corte. É uma Arena.",
  concept: "Estilo, atitude e bem-estar em um só lugar. Aqui você encontra muito mais que um corte. É experiência, amizade e um espaço feito pra você.",
  phone: "(73) 99999-9999",
  phoneDisplay: "(73) 99999-9999",
  whatsapp: "", // Deixado vazio conforme instrução para não inventar dados fictícios
  instagram: "@arenabarbearia",
  instagramUrl: "https://instagram.com/arenabarbearia",
  address: "R. (endereço não especificado)",
  city: "Ilhéus",
  state: "BA",
  fullAddress: "Arena Barbearia, R. (endereço não especificado) - Ilhéus, BA",
  mapsUrl: "https://maps.google.com/?q=Arena+Barbearia+Ilheus",
  bookingUrl: "", // Centralização de agendamento: abre modal com feedback premium
  hours: [
    { days: "Segunda a Sexta", hours: "08h às 20h" },
    { days: "Sábado", hours: "08h às 18h" },
    { days: "Domingo", hours: "09h às 14h" },
  ],
};
