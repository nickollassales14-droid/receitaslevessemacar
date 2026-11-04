// Edite aqui preços, nomes, descrições, links e depoimentos da página.

export const ofertas = [
  {
    id: "essencial",
    nome: "Pacote Essencial",
    preco: "R$ 14,90",
    precoAntigo: "", // opcional, ex: "R$ 97,00"
    itens: [
      "Coleção digital com 365 receitas",
      "Receitas organizadas por categoria",
      "Acesso digital à coleção",
      "Consulta pelo celular ou computador",
    ],
    botao: "QUERO O PACOTE ESSENCIAL",
    link: "https://pay.cakto.com.br/33wqmvw_1276577",
    destaque: false,
  },
  {
    id: "completo",
    nome: "Pacote Completo",
    preco: "R$ 24,90",
    precoAntigo: "",
    itens: [
      "Tudo do pacote essencial",
      "Lista de compras essenciais",
      "Cardápio de 30 dias",
      "Guia de substituições",
      "Todos os materiais complementares",
    ],
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
