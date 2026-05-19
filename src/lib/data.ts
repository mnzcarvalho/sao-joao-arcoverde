// Seed data for São João de Arcoverde 2026.
// On first load this is cached to localStorage so the app works fully offline.

export type Polo = {
  id: string;
  nome: string;
  descricao: string;
  endereco: string;
  lat: number;
  lng: number;
  horario: string;
};

export type Show = {
  id: string;
  data: string; // ISO date
  hora: string;
  artista: string;
  polo: string;
  genero: string;
};

export type Lugar = {
  id: string;
  nome: string;
  tipo: "comida" | "hospedagem" | "turismo";
  descricao: string;
  endereco: string;
  contato?: string;
  preco?: string;
};

export const polos: Polo[] = [
  {
    id: "matriz",
    nome: "Polo Matriz",
    descricao: "O coração do São João de Arcoverde, em frente à Igreja Matriz. Grandes shows nacionais.",
    endereco: "Praça Cel. Antônio Japiassu, Centro",
    lat: -8.4186,
    lng: -37.0563,
    horario: "Diariamente, das 18h às 04h",
  },
  {
    id: "forrozao",
    nome: "Polo Forrozão",
    descricao: "Pé de serra, sanfona, zabumba e triângulo: o forró raiz acontece aqui.",
    endereco: "Av. Cel. Antônio Japiassu, s/n",
    lat: -8.4202,
    lng: -37.0578,
    horario: "Diariamente, das 19h às 03h",
  },
  {
    id: "raizes",
    nome: "Polo Raízes Culturais",
    descricao: "Quadrilhas, xaxado, maracatu e cultura popular pernambucana.",
    endereco: "Praça da Cultura",
    lat: -8.4170,
    lng: -37.0550,
    horario: "Diariamente, das 17h às 23h",
  },
  {
    id: "gastronomico",
    nome: "Polo Gastronômico",
    descricao: "Comidas típicas, cuscuz, canjica, pamonha, bolo de milho e caldos.",
    endereco: "Rua da Conceição, Centro",
    lat: -8.4195,
    lng: -37.0570,
    horario: "Diariamente, das 16h às 02h",
  },
  {
    id: "infantil",
    nome: "Polo Infantil",
    descricao: "Brinquedos, oficinas, contação de histórias e quadrilha mirim.",
    endereco: "Parque Municipal",
    lat: -8.4155,
    lng: -37.0540,
    horario: "Sábados e domingos, 15h às 21h",
  },
];

export const programacao: Show[] = [
  { id: "1", data: "2026-06-12", hora: "20:00", artista: "Elba Ramalho", polo: "matriz", genero: "Forró" },
  { id: "2", data: "2026-06-12", hora: "22:30", artista: "Alceu Valença", polo: "matriz", genero: "MPB Nordestina" },
  { id: "3", data: "2026-06-12", hora: "21:00", artista: "Trio Sanfona de Ouro", polo: "forrozao", genero: "Pé de Serra" },
  { id: "4", data: "2026-06-13", hora: "19:30", artista: "Quadrilha Junina Asa Branca", polo: "raizes", genero: "Quadrilha" },
  { id: "5", data: "2026-06-13", hora: "21:00", artista: "Geraldinho Lins", polo: "matriz", genero: "Forró" },
  { id: "6", data: "2026-06-13", hora: "23:00", artista: "Mastruz com Leite", polo: "matriz", genero: "Forró Eletrônico" },
  { id: "7", data: "2026-06-14", hora: "20:00", artista: "Santanna O Cantador", polo: "forrozao", genero: "Forró" },
  { id: "8", data: "2026-06-14", hora: "22:00", artista: "Flávio José", polo: "matriz", genero: "Forró Tradicional" },
  { id: "9", data: "2026-06-23", hora: "20:00", artista: "Dorgival Dantas", polo: "matriz", genero: "Forró" },
  { id: "10", data: "2026-06-23", hora: "22:30", artista: "Aviões do Forró", polo: "matriz", genero: "Forró Estilizado" },
  { id: "11", data: "2026-06-24", hora: "19:00", artista: "Banda Magníficos", polo: "matriz", genero: "Forró" },
  { id: "12", data: "2026-06-24", hora: "21:30", artista: "Wesley Safadão", polo: "matriz", genero: "Forró Eletrônico" },
  { id: "13", data: "2026-06-24", hora: "23:30", artista: "Solteirões do Forró", polo: "matriz", genero: "Forró" },
  { id: "14", data: "2026-06-29", hora: "20:00", artista: "Maciel Melo", polo: "forrozao", genero: "Forró Pé de Serra" },
  { id: "15", data: "2026-06-29", hora: "22:00", artista: "Cezzinha", polo: "matriz", genero: "Forró" },
];

export const gastronomia: Lugar[] = [
  { id: "g1", nome: "Restaurante Sabor do Sertão", tipo: "comida", descricao: "Carne de sol, queijo coalho, baião de dois.", endereco: "Rua Pernambuco, 120", contato: "(87) 3821-1234", preco: "$$" },
  { id: "g2", nome: "Cantinho da Canjica", tipo: "comida", descricao: "Comidas típicas juninas, canjica, pamonha, mungunzá.", endereco: "Praça Central, s/n", contato: "(87) 3821-5678", preco: "$" },
  { id: "g3", nome: "Forró & Buchada", tipo: "comida", descricao: "Buchada de bode, sarapatel, cozido nordestino.", endereco: "Av. Cel. Japiassu, 450", contato: "(87) 3821-9999", preco: "$$" },
  { id: "g4", nome: "Bar do Sanfoneiro", tipo: "comida", descricao: "Tira-gostos, petiscos e cerveja gelada com forró ao vivo.", endereco: "Rua da Matriz, 88", preco: "$$" },
];

export const hospedagem: Lugar[] = [
  { id: "h1", nome: "Hotel Arcoverde Palace", tipo: "hospedagem", descricao: "Hotel central com café da manhã regional.", endereco: "Av. Cel. Antônio Japiassu, 300", contato: "(87) 3821-2000", preco: "$$$" },
  { id: "h2", nome: "Pousada Pé de Serra", tipo: "hospedagem", descricao: "Acolhedora pousada familiar a 5 min do Polo Matriz.", endereco: "Rua das Flores, 45", contato: "(87) 99999-1111", preco: "$$" },
  { id: "h3", nome: "Pousada Luar do Sertão", tipo: "hospedagem", descricao: "Quartos confortáveis com ar-condicionado.", endereco: "Rua Nova, 210", contato: "(87) 99888-2222", preco: "$$" },
  { id: "h4", nome: "Camping São João", tipo: "hospedagem", descricao: "Área de camping próxima aos polos com banheiros e segurança.", endereco: "Saída para Sertânia, km 3", preco: "$" },
];

export const turismo: Lugar[] = [
  { id: "t1", nome: "Igreja Matriz Nossa Senhora do Livramento", tipo: "turismo", descricao: "Marco histórico e arquitetônico do município, sede da padroeira.", endereco: "Praça Cel. Antônio Japiassu" },
  { id: "t2", nome: "Serra das Princesas", tipo: "turismo", descricao: "Trilhas e vista panorâmica do sertão pernambucano.", endereco: "Zona Rural, 15 km do centro" },
  { id: "t3", nome: "Memorial do Forró", tipo: "turismo", descricao: "Acervo dedicado à história do forró e dos grandes nomes da música nordestina.", endereco: "Centro Cultural de Arcoverde" },
  { id: "t4", nome: "Açude Cachoeira", tipo: "turismo", descricao: "Reserva hídrica com área de lazer e mirante.", endereco: "Estrada do Açude, s/n" },
  { id: "t5", nome: "Feira Livre de Arcoverde", tipo: "turismo", descricao: "Tradicional feira de produtos regionais às quartas e sábados.", endereco: "Centro" },
];

export const sobreCidade = `Arcoverde é uma cidade do agreste pernambucano, conhecida como a "Capital do Forró Pé de Serra". Localizada na divisa entre o Agreste e o Sertão, é palco de uma das mais autênticas celebrações de São João do Brasil. Sua tradição musical deu origem ao movimento Samba de Coco Raízes de Arcoverde, reconhecido como patrimônio cultural.`;

export const sobreSaoJoao = `O São João de Arcoverde acontece todo mês de junho e celebra a cultura nordestina com forró pé de serra, quadrilhas juninas, comidas típicas e fogueiras. A festa reúne grandes nomes da música regional e nacional em diversos polos espalhados pela cidade, atraindo milhares de visitantes de todo o Brasil. Suas raízes remontam ao início do século XX, quando os primeiros sanfoneiros e trios começaram a animar as ruas durante o ciclo junino.`;
