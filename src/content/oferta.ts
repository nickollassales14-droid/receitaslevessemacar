// Edite aqui preços, nomes, descrições, links e depoimentos da página.

export const ofertas = [
  {
    id: "essencial",
    etiqueta: "VERSÃO BÁSICA",
    nome: "365 Receitas Leves Sem Açúcar",
    preco: "R$ 14,90",
    precoAntigo: "",
    itens: [
      "365 Receitas Leves Sem Açúcar",
      "Receitas organizadas por categoria",
      "Acesso digital à coleção",
    ],
    bonus: [] as string[],
    nota: "",
    botao: "QUERO MINHAS 365 RECEITAS",
    link: "https://pay.cakto.com.br/33wqmvw_1276577",
    destaque: false,
  },
  {
    id: "completo",
    etiqueta: "PACOTE COMPLETO",
    nome: "365 Receitas + 3 Bônus",
    preco: "R$ 24,90",
    precoAntigo: "",
    itens: ["Tudo da versão básica"],
    bonus: [
      "BÔNUS 1: Cardápio de 30 Dias",
      "BÔNUS 2: Lista de Compras Inteligente",
      "BÔNUS 3: Guia de Substituições",
    ],
    nota: "Por apenas R$ 10 a mais, leve os 3 materiais bônus!",
    botao: "QUERO O PACOTE COMPLETO",
    link: "https://pay.cakto.com.br/yyp4n7z_1276637",
    destaque: true,
  },
];

export type Depoimento = {
  nome: string;
  nota: number;
  comentario: string;
  foto?: string; // somente com autorização
  fotoReceita?: string;
};

// Adicione aqui apenas avaliações reais e autorizadas.
export const depoimentos: Depoimento[] = [];

export const rodape = {
  produto: "365 Receitas Leves Sem Açúcar",
  privacidade: "#",
  termos: "#",
  reembolso: "#",
  suporte: "#", // ex: "mailto:seu@email.com"
};
