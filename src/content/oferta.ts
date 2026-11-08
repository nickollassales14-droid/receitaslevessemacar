// Edite aqui preços, nomes, descrições, links e depoimentos da página.

export const ofertas = [
  {
    id: "essencial",
    etiqueta: "VERSÃO BÁSICA",
    nome: "365 Receitas Leves Sem Açúcar",
    preco: "R$ 14,90",
    precoAntigo: "",
    itens: [
      "365 receitas leves sem açúcar adicionado",
      "Receitas doces e salgadas",
      "Conteúdo organizado por categorias",
      "Acesso digital ao e-book",
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
    nota: "VOCÊ RECEBE 3 BÔNUS EXCLUSIVOS",
    botao: "QUERO O PACOTE COMPLETO",
    link: "https://pay.cakto.com.br/yyp4n7z_1276637",
    destaque: true,
  },
];

export type Depoimento = {
  id: string; // identificador estável, usado nas curtidas
  nome: string;
  nota?: number; // estrelas só aparecem quando a avaliação real informou nota
  comentario: string;
  data?: string; // data da avaliação
  foto?: string; // somente com autorização
  fotoReceita?: string;
};

// Adicione aqui apenas avaliações reais e autorizadas.
export const depoimentos: Depoimento[] = [
  {
    id: "juliana-s",
    nome: "Juliana S.",
    comentario:
      "Comprei por causa das sobremesas e já fiz brownie, brigadeiro e panqueca. Tudo simples e gostoso. Agora tenho opção quando bate vontade de doce.",
    fotoReceita: "/__l5e/assets-v1/53093fff-f723-41f7-92d5-9277244359b5/depoimento-juliana-brownie.png",
  },
];

export const rodape = {
  produto: "365 Receitas Leves Sem Açúcar",
  privacidade: "#",
  termos: "#",
  reembolso: "#",
  suporte: "#", // ex: "mailto:seu@email.com"
};
