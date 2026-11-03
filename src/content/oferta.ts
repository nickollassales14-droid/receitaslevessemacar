// Edite aqui preços, nomes, descrições, links e depoimentos da página.

export const ofertas = [
  {
    id: "essencial",
    nome: "Pacote Essencial",
    preco: "R$ 00,00", // defina o preço
    precoAntigo: "", // opcional, ex: "R$ 97,00"
    itens: [
      "Livro digital com 365 receitas",
      "Receitas organizadas por categoria",
      "Acesso digital",
      "Consulta pelo celular ou computador",
    ],
    botao: "QUERO O PACOTE ESSENCIAL",
    link: "#ofertas", // troque pelo link do checkout quando existir
    destaque: false,
  },
  {
    id: "completo",
    nome: "Pacote Completo",
    preco: "R$ 00,00", // defina o preço
    precoAntigo: "",
    itens: [
      "Tudo do pacote essencial",
      "Lista de compras essenciais",
      "Cardápio de 30 dias",
      "Guia de substituições",
      "Todos os materiais complementares",
    ],
    botao: "QUERO O PACOTE COMPLETO",
    link: "#ofertas",
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
  produto: "365 Receitas",
  privacidade: "#",
  termos: "#",
  reembolso: "#",
  suporte: "#", // ex: "mailto:seu@email.com"
};
