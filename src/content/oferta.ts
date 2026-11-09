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
    botao: "QUERO AS 365 RECEITAS!",
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
    nota: "Por apenas R$ 10,00 a mais, leve também os 3 materiais extras!",
    botao: "SIM! QUERO O PACOTE COMPLETO!",
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
  {
    id: "andressa-r",
    nome: "Andressa R.",
    comentario:
      "Minha filha não pode consumir lactose e eu nunca sabia o que preparar para ela. Hoje consigo fazer desde bolos e tortas até sobremesas cremosas que ela adora!",
    fotoReceita: "/__l5e/assets-v1/9bbc21a0-ea76-4d15-ace7-0024574f3cab/image-2-andressa.png",
  },
  {
    id: "rosilene-d",
    nome: "Rosilene D.",
    comentario:
      "As receitas são super fáceis de acompanhar e levam ingredientes simples, que encontro em qualquer mercado. Já fiz a torta salgada várias vezes e todo mundo aqui em casa adorou!",
    fotoReceita: "/__l5e/assets-v1/88d8048a-8e6d-4b11-a79b-4b1d28523442/image-3-rosilene.png",
  },
  {
    id: "renata-b",
    nome: "Renata B.",
    comentario:
      "Gostei muito das receitas! São fáceis de fazer e usam ingredientes que a gente encontra sem dificuldade. Já fiz a torta salgada aqui em casa e todo mundo gostou. Com certeza vou fazer outras vezes!",
    fotoReceita: "/__l5e/assets-v1/e9801b28-413c-4593-bde1-aae277c9156b/image-4-renata.png",
  },
  {
    id: "ana-m",
    nome: "Ana M.",
    comentario:
      "Sempre achei que bolo sem açúcar não teria o mesmo gosto, mas me surpreendi com o de cenoura! Ficou bem fofinho e gostoso. Até o pessoal aqui de casa comeu e adorou!",
    fotoReceita: "/__l5e/assets-v1/9ee9960f-825c-4983-aeac-4a5d5272d8ca/image-5-ana.png",
  },
];

export const rodape = {
  produto: "365 Receitas Leves Sem Açúcar",
  privacidade: "#",
  termos: "#",
  reembolso: "#",
  suporte: "#", // ex: "mailto:seu@email.com"
};
