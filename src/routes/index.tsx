import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import {
  Smartphone, Monitor, Tablet, Printer, ShieldCheck, Download, Check, Leaf, Wheat, Milk,
  CandyOff, Coffee, BookOpen, Utensils, Croissant, Soup, CupSoda, Sandwich, IceCream,
  Gift, ShoppingBasket, CalendarDays, Repeat, Sparkles, Lock, Star,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ofertas, rodape } from "@/content/oferta";
import { PurchaseNotifications } from "@/components/purchase-notifications";
import { ReviewsSection } from "@/components/reviews-section";
import hero from "@/assets/hero.jpg";
import table from "@/assets/table.jpg";
import bolo from "@/assets/r-bolo.jpg";
import pao from "@/assets/r-pao.jpg";
import panqueca from "@/assets/r-panqueca.jpg";
import lasanha from "@/assets/r-lasanha.jpg";
import brigadeiro from "@/assets/r-brigadeiro.jpg";
import torta from "@/assets/r-torta.jpg";
import brownie from "@/assets/r-brownie.jpg";
import cookies from "@/assets/r-cookies.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "365 Receitas Leves Sem Açúcar | Coleção digital" },
      { name: "description", content: "Coleção digital com 365 receitas deliciosas, com opções sem açúcar adicionado, sem glúten e sem lactose para variar sua rotina." },
      { property: "og:title", content: "365 Receitas Leves Sem Açúcar" },
      { property: "og:description", content: "Descubra um novo jeito de aproveitar cada receita: 365 inspirações para sua cozinha." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

const Cta = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <a href="#ofertas" className={`btn-cta ${className}`}>{children}</a>
);

const Title = ({ eyebrow, children, sub }: { eyebrow?: string; children: ReactNode; sub?: string }) => (
  <Reveal className="mx-auto mb-12 max-w-3xl text-center">
    {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
    <h2 className="text-3xl font-bold leading-tight text-primary md:text-5xl">{children}</h2>
    <div className="mx-auto mt-5 flex items-center justify-center gap-2 text-secondary"><span className="h-px w-10 bg-secondary/50" /><Leaf className="h-4 w-4" /><span className="h-px w-10 bg-secondary/50" /></div>
    {sub && <p className="mt-5 text-muted-foreground md:text-lg">{sub}</p>}
  </Reveal>
);

const beneficios = [
  { i: Utensils, t: "Inspiração para cada refeição", d: "Encontre ideias para o café da manhã, almoço, jantar e aqueles momentos entre uma refeição e outra." },
  { i: CandyOff, t: "Receitas sem açúcar adicionado", d: "Explore preparações saborosas feitas sem adição de açúcar, com ingredientes que já podem fazer parte da sua cozinha." },
  { i: Wheat, t: "Alternativas sem glúten", d: "Descubra opções variadas para preparar pães, bolos e pratos sem ingredientes com glúten." },
  { i: Milk, t: "Opções sem lactose", d: "Tenha novas ideias para adaptar sua rotina com preparações sem ingredientes com lactose." },
  { i: BookOpen, t: "Doces e salgados para escolher", d: "Alterne entre sobremesas, lanches e receitas para as refeições, tudo reunido em uma só coleção." },
  { i: Sparkles, t: "Tudo organizado para facilitar", d: "Consulte receitas separadas por categorias e encontre com mais facilidade uma ideia para preparar." },
];

const receitas = [
  { img: bolo, n: "Bolo de cenoura com cobertura", d: "Aquele bolo fofinho da tarde, com cobertura brilhante de chocolate." },
  { img: pao, n: "Pão caseiro sem glúten", d: "Cheirinho de pão saindo do forno, com casca crocante e miolo macio." },
  { img: panqueca, n: "Panqueca de banana", d: "Um café da manhã gostoso e rápido, com frutas frescas por cima." },
  { img: lasanha, n: "Lasanha sem glúten", d: "Camadas generosas de legumes e molho caseiro para o almoço de domingo." },
  { img: brigadeiro, n: "Brigadeiro sem açúcar adicionado", d: "O docinho mais querido, em uma versão sem açúcar adicionado." },
  { img: torta, n: "Torta salgada de frango", d: "Massa dourada e recheio cremoso para reunir a família." },
  { img: brownie, n: "Brownie de chocolate", d: "Casquinha craquelada por fora e aquele centro úmido por dentro." },
  { img: cookies, n: "Cookies sem glúten", d: "Crocantes, com aveia e gotas de chocolate, para acompanhar o café." },
];

const categorias = [
  { i: Coffee, n: "Café da manhã", q: 45 },
  { i: Croissant, n: "Pães, bolos e massas", q: 55 },
  { i: Utensils, n: "Almoços e jantares", q: 55 },
  { i: Sandwich, n: "Lanches e salgados", q: 45 },
  { i: IceCream, n: "Sobremesas", q: 55 },
  { i: Milk, n: "Receitas sem lactose", q: 35 },
  { i: Soup, n: "Molhos e acompanhamentos", q: 35 },
  { i: CupSoda, n: "Bebidas e preparações extras", q: 40 },
];

const publico = [
  "Para quem deseja variar as refeições.",
  "Para quem procura alternativas sem glúten.",
  "Para quem procura preparações sem lactose.",
  "Para quem deseja reduzir o consumo de açúcar adicionado.",
  "Para quem está cansado de preparar sempre as mesmas receitas.",
  "Para quem deseja encontrar opções práticas para toda a família.",
  "Para quem gosta de cozinhar, mesmo sem muita experiência.",
];

const bonus = [
  { i: ShoppingBasket, n: "Lista de Compras Essenciais", d: "Uma lista organizada para facilitar suas compras e ajudar você a manter os ingredientes necessários sempre à mão.", c: "bg-secondary" },
  { i: CalendarDays, n: "Cardápio de 30 Dias", d: "Um planejamento de refeições para ajudar você a organizar seu mês e variar suas preparações.", c: "bg-navy" },
  { i: Repeat, n: "Guia de Substituições", d: "Conheça alternativas de ingredientes para adaptar suas receitas e descobrir novas combinações.", c: "bg-accent" },
];

const faq = [
  ["Como vou receber minha coleção?", "Após a confirmação da compra, o 365 Receitas Leves Sem Açúcar é disponibilizado digitalmente pelo canal de entrega informado no momento da compra."],
  ["Em quais aparelhos posso acessar?", "A coleção é digital e pode ser consultada no celular, tablet ou computador, quando e onde você quiser."],
  ["Preciso ter experiência na cozinha?", "Não. O passo a passo é prático e pensado também para quem está começando na cozinha."],
  ["Os ingredientes são fáceis de encontrar?", "A proposta é priorizar ingredientes comuns. Algumas receitas podem usar itens específicos, como farinhas sem glúten, encontrados em mercados e lojas de produtos naturais."],
  ["A coleção tem receitas doces e salgadas?", "Sim. São 365 receitas com opções para café da manhã, almoço, jantar, lanches, sobremesas, molhos e bebidas."],
  ["Posso imprimir as receitas?", "Sim, você pode imprimir as páginas que desejar para uso pessoal."],
  ["Por quanto tempo terei acesso?", "A oferta dá acesso à coleção digital conforme o formato e as condições exibidos no checkout. Depois de baixar o arquivo, você pode guardá-lo em seus dispositivos; a disponibilidade de um novo download depende do canal de entrega."],
  ["Como funciona a garantia?", "A oferta informa 15 dias de garantia. Para consultar as condições e solicitar o reembolso dentro do prazo, acesse a política de reembolso ou o canal de suporte indicado na confirmação da compra."],
  ["A coleção é indicada para pessoas com doença celíaca?", "As receitas sem glúten são elaboradas sem ingredientes que contêm glúten, mas a coleção não substitui orientação profissional. Pessoas com doença celíaca, alergias ou condições de saúde devem verificar rótulos (risco de contaminação cruzada) e consultar um médico ou nutricionista."],
  ["Sem açúcar significa sem açúcares naturais?", "Não. \"Sem açúcar\" significa sem açúcar adicionado. Ingredientes como frutas e leites vegetais podem conter açúcares naturais. \"Sem glúten\" e \"sem lactose\" referem-se à ausência desses componentes nos ingredientes indicados."],
];

function Index() {
  return (
    <main className="overflow-x-hidden">
      <PurchaseNotifications />
      {/* Barra de benefícios */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2.5 text-xs font-medium sm:text-sm">
          {[[CandyOff, "Sem açúcar adicionado"], [Wheat, "Sem glúten"], [Milk, "Sem lactose"], [Download, "Acesso digital"]].map(([I, t], k) => {
            const Icon = I as typeof Leaf;
            return (
              <span key={k} className="flex items-center gap-2">
                {k > 0 && <span className="hidden h-4 w-px bg-primary-foreground/30 sm:block" />}
                <Icon className="h-4 w-4 text-accent" />{t as string}
              </span>
            );
          })}
        </div>
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:py-20 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <p className="eyebrow mb-4">365 Receitas Leves Sem Açúcar</p>
            <h1 className="text-4xl font-bold leading-[1.08] text-primary sm:text-5xl xl:text-6xl">
              365 Receitas Deliciosas Para Transformar Sua Rotina na Cozinha!
            </h1>
            <div className="mt-8 lg:hidden">
              <img src={hero} alt="Coleção 365 Receitas Leves Sem Açúcar com smartphone, chef sorrindo e pratos saudáveis" width={1280} height={1152} className="w-full rounded-3xl shadow-lift" />
            </div>
            <p className="mt-6 text-lg text-foreground md:text-xl">Descubra bolos, pães, sobremesas, lanches e refeições em versões sem açúcar adicionado, sem glúten e sem lactose.</p>
            <div className="mt-7 inline-flex flex-col items-center rounded-2xl border border-offer-green/20 bg-offer-green-soft px-6 py-4 shadow-soft sm:px-8 lg:items-start">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary/75">Invista na sua coleção</span>
              <p className="mt-1 font-sans text-3xl font-black tracking-tight text-offer-green sm:text-4xl">A partir de R$ 14,90</p>
              <a href="#ofertas" className="mt-2 inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border border-offer-green/30 px-4 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-offer-green/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Ver opções da coleção <span aria-hidden="true">↓</span></a>
            </div>
            <p className="mt-4 text-sm font-medium text-muted-foreground sm:text-base">Acesso digital <span className="mx-2 text-secondary">•</span> Receitas doces e salgadas <span className="mx-2 text-secondary">•</span> 15 dias de garantia</p>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-muted" />
            <img src={hero} alt="Coleção 365 Receitas Leves Sem Açúcar com smartphone, chef sorrindo e pratos saudáveis" width={1280} height={1152} className="w-full rounded-[2rem] shadow-lift" />
            <div className="absolute -left-6 top-10 grid h-24 w-24 rotate-[-10deg] place-items-center rounded-full bg-accent text-center text-xs font-bold leading-tight text-accent-foreground shadow-lift">365<br />RECEITAS</div>
            <div className="absolute -bottom-5 -right-4 flex items-center gap-2 rounded-full bg-card px-5 py-3 text-sm font-semibold text-primary shadow-lift"><Leaf className="h-4 w-4 text-secondary" />Doces & salgadas</div>
          </div>
        </div>
      </section>

      {/* Convite para explorar */}
      <section className="px-5 pb-12 md:pb-16" aria-label="Explore a coleção">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <div className="flex flex-col items-center gap-5 px-6 py-8 text-center sm:px-10 sm:py-10 md:flex-row md:justify-between md:gap-8 md:text-left">
            <div className="max-w-2xl">
              <p className="eyebrow mb-2">Explore nossa coleção!</p>
              <p className="text-lg font-semibold leading-relaxed text-primary sm:text-xl">Continue descendo a página e descubra as receitas, os materiais extras e tudo o que preparamos para você.</p>
            </div>
            <a href="#galeria" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              Continue explorando <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Title eyebrow="Mais possibilidades na sua cozinha" sub="São 365 ideias para inspirar sua rotina, descobrir novos sabores e encontrar opções para diferentes momentos do dia.">Variedade para cozinhar com mais leveza e criatividade</Title>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {beneficios.map(({ i: I, t, d }, k) => (
              <Reveal key={k}>
                <div className="card-soft flex h-full flex-col items-start gap-4 p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-muted text-secondary"><I className="h-6 w-6" /></span>
                  <div><h3 className="font-semibold text-primary">{t}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section id="galeria" className="scroll-mt-6 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <Title eyebrow="Uma prévia da coleção" sub="Explore algumas das delícias que fazem parte da nossa coleção.">Qual delas você vai preparar primeiro?</Title>
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {receitas.map((r) => (
              <Reveal key={r.n}>
                <article className="card-soft group h-full overflow-hidden">
                  <div className="overflow-hidden"><img src={r.img} alt={r.n} loading="lazy" width={896} height={752} className="aspect-[6/5] w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                  <div className="p-4 md:p-5">
                    <h3 className="text-base font-semibold leading-snug text-primary md:text-lg">{r.n}</h3>
                    <p className="mt-1 text-xs text-muted-foreground md:text-sm">{r.d}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center"><Cta>QUERO MINHAS 365 RECEITAS!</Cta></div>
        </div>
      </section>

      {/* Categorias */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Title eyebrow="O que tem na coleção" sub="Da primeira refeição do dia até aquela sobremesa especial, encontre inspirações para diferentes ocasiões.">365 ideias para inspirar seus momentos na cozinha</Title>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categorias.map(({ i: I, n, q }) => (
              <Reveal key={n}>
                <div className="card-soft flex h-full flex-col items-center p-5 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-muted text-secondary"><I className="h-6 w-6" /></span>
                  <p className="mt-3 font-serif text-3xl font-bold text-accent">{q}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">receitas</p>
                  <p className="mt-2 text-sm font-medium text-foreground">{n}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mx-auto mt-8 flex max-w-md items-center justify-center gap-4 rounded-full bg-primary px-8 py-4 text-primary-foreground shadow-lift">
            <span className="font-serif text-4xl font-bold">365</span><span className="text-sm uppercase tracking-widest">receitas no total</span>
          </Reveal>
        </div>
      </section>

      {/* Público */}
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
          <Reveal><img src={table} alt="Mesa com diferentes preparações saudáveis" loading="lazy" width={1024} height={1152} className="w-full rounded-[2rem] shadow-lift" /></Reveal>
          <Reveal>
            <p className="eyebrow mb-3">Para quem é</p>
            <h2 className="text-3xl font-bold leading-tight text-primary md:text-4xl">Encontre novas possibilidades para sua cozinha</h2>
            <p className="mt-4 text-muted-foreground">Se você gosta de experimentar receitas diferentes, procura alternativas para determinados ingredientes ou simplesmente deseja variar seu cardápio, esta coleção foi pensada para trazer mais inspiração ao seu dia a dia.</p>
            <ul className="mt-8 space-y-4">
              {publico.map((p) => (
                <li key={p} className="flex items-start gap-3"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground"><Check className="h-3.5 w-3.5" /></span><span>{p}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Bônus */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Title eyebrow="Materiais extras" sub="Além das receitas, você terá recursos complementares para organizar suas refeições e aproveitar ainda mais sua experiência.">E sua coleção vem acompanhada de materiais extras!</Title>
          <div className="grid gap-8 md:grid-cols-3">
            {bonus.map(({ i: I, n, d, c }, k) => (
              <Reveal key={n}>
                <div className="card-soft relative h-full p-6 pt-8 text-center">
                  <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent px-4 py-1 text-xs font-bold text-accent-foreground"><Gift className="h-3.5 w-3.5" />BÔNUS {k + 1}</span>
                  <div className="mx-auto mb-6 h-48 w-36 [perspective:600px]">
                    <div className={`${c} relative flex h-full w-full flex-col items-center justify-center gap-3 rounded-r-lg rounded-l-sm p-4 text-primary-foreground shadow-lift [transform:rotateY(-14deg)]`}>
                      <span className="absolute inset-y-0 left-0 w-2 bg-foreground/15" />
                      <I className="h-9 w-9" />
                      <span className="font-serif text-sm font-semibold leading-tight">{n}</span>
                      <span className="text-[10px] uppercase tracking-widest opacity-80">365 Receitas Leves</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary">{n}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ofertas */}
      <section id="ofertas" className="scroll-mt-4 bg-primary py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">Oferta</span>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">Escolha a experiência ideal para você</h2>
            <p className="mt-3 opacity-90">Tenha mais inspiração e praticidade para descobrir novas receitas todos os dias.</p>
          </div>
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-8">
            {ofertas.map((o) => (
              <Reveal key={o.id}>
                <article className={`relative flex flex-col rounded-3xl bg-cream px-6 pb-7 pt-8 text-card-foreground sm:px-8 md:pb-8 md:pt-9 ${o.destaque ? "shadow-offer-featured ring-2 ring-offer-green" : "border border-border shadow-soft"}`}>
                  {o.destaque && <span className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-offer-green px-4 py-2 text-xs font-bold text-offer-green-foreground shadow-soft"><Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />MELHOR CUSTO-BENEFÍCIO</span>}
                  <span className="self-start text-xs font-bold text-secondary">{o.etiqueta}</span>
                  <h3 className="mt-3 font-serif text-2xl font-bold leading-tight text-primary md:text-3xl">{o.nome}</h3>
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed sm:text-base">
                    {o.itens.map((it) => <li key={it} className="flex items-start gap-3"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary/15"><Check className="h-4 w-4 text-secondary" /></span>{it}</li>)}
                    {o.bonus.map((it) => {
                      const [tag, txt] = it.split(": ");
                      return <li key={it} className="flex items-start gap-3"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-offer-green/10"><Gift className="h-4 w-4 text-offer-green" /></span><span><span className="sr-only">{tag}: </span>{txt}</span></li>;
                    })}
                  </ul>
                  <div className="pt-6 text-center">
                    {o.nota && (
                      <>
                        <div className="mb-4 rounded-lg border border-offer-green/25 bg-offer-green-soft px-3 py-3">
                          <p className="flex items-center justify-center gap-2 text-sm font-bold text-primary"><Gift className="h-4 w-4 shrink-0 text-offer-green" aria-hidden="true" />4 MATERIAIS DIGITAIS</p>
                          <p className="mt-1 text-xs leading-relaxed text-foreground sm:text-sm">365 receitas + 3 materiais complementares</p>
                        </div>
                        <p className="mx-auto mb-4 max-w-xs text-sm font-semibold leading-relaxed text-primary">{o.nota}</p>
                      </>
                    )}
                    {o.precoAntigo && <p className="mb-1 text-sm font-semibold leading-none text-red-600 line-through decoration-red-600 decoration-2 sm:text-base">{o.precoAntigo}</p>}
                    <p className={`font-sans font-black tracking-[-0.05em] [-webkit-text-stroke:0.7px_currentColor] text-offer-green underline decoration-offer-green decoration-[3px] underline-offset-[6px] ${o.destaque ? "text-[3.5rem] leading-none md:text-[4.25rem]" : "text-5xl md:text-6xl"}`}>{o.preco}</p>
                    <Button asChild variant={o.destaque ? "offerComplete" : "offer"} className="mt-5 h-auto min-h-14 w-full whitespace-normal rounded-lg px-3 py-4 text-sm font-bold leading-snug transition-all duration-200 sm:text-base"><a href={o.link} target="_blank" rel="noopener noreferrer">{o.botao}</a></Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <ul className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-3 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/5 px-5 py-4 text-sm opacity-90 sm:flex-row sm:flex-wrap sm:gap-x-8">
            <li className="flex items-center gap-2"><Lock className="h-4 w-4 shrink-0" />Pagamento seguro</li>
            <li className="flex items-center gap-2"><Download className="h-4 w-4 shrink-0" />Acesso digital após aprovação do pagamento</li>
            <li className="flex items-center gap-2"><Smartphone className="h-4 w-4 shrink-0" />Compatível com celular e computador</li>
          </ul>
        </div>
      </section>

      {/* Avaliações */}
      <ReviewsSection />

      {/* Garantia */}
      <section className="py-20">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-8 rounded-[2rem] border border-border bg-card px-6 py-12 text-center shadow-soft md:flex-row md:px-12 md:text-left">
          <div className="relative grid h-40 w-40 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift ring-8 ring-muted">
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-primary-foreground/40" />
            <div className="text-center"><ShieldCheck className="mx-auto h-7 w-7 text-accent" /><p className="font-serif text-4xl font-bold leading-none">15</p><p className="text-xs font-semibold tracking-widest">DIAS DE<br />GARANTIA</p></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary md:text-3xl">Sua compra com mais tranquilidade</h2>
            <p className="mt-3 text-muted-foreground">A oferta informa um prazo de 15 dias de garantia. Consulte as condições e o canal para solicitar na política de reembolso.</p>
            <a href={rodape.reembolso} className="mt-4 inline-block text-sm font-semibold text-secondary underline underline-offset-4">Ver política de reembolso</a>
          </div>
        </Reveal>
      </section>

      {/* Entrega */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Title eyebrow="Entrega digital" sub="Consulte suas receitas quando quiser, diretamente pelo celular, tablet ou computador. Tenha suas inspirações culinárias disponíveis em formato digital.">Sua coleção sempre à mão</Title>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[[Smartphone, "Celular", "Consulte suas receitas pelo smartphone."], [Monitor, "Computador", "Visualize o material em uma tela maior."], [Tablet, "Tablet", "Tenha uma experiência confortável de leitura."], [Printer, "Impressão", "Imprima as páginas que desejar."]].map(([I, n, d]) => {
              const Icon = I as typeof Leaf;
              return (
                <Reveal key={n as string}><div className="card-soft h-full p-6 text-center"><Icon className="mx-auto h-8 w-8 text-secondary" /><h3 className="mt-3 text-lg font-bold text-primary">{n as string}</h3><p className="mt-1 text-sm text-muted-foreground">{d as string}</p></div></Reveal>
              );
            })}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">A coleção é disponibilizada digitalmente após a confirmação da compra, pelo canal de entrega informado no momento da compra.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-5">
          <Title eyebrow="Dúvidas">Perguntas frequentes</Title>
          <Accordion type="single" collapsible className="space-y-3">
            {faq.map(([q, a], k) => (
              <AccordionItem key={k} value={`f${k}`} className="rounded-2xl border border-border bg-card px-5 shadow-soft">
                <AccordionTrigger className="text-left font-semibold text-primary hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <div className="mx-auto mb-10 flex max-w-lg justify-center -space-x-4">
            {[bolo, panqueca, lasanha, brownie, pao].map((s, k) => <img key={k} src={s} alt="" loading="lazy" className="h-20 w-20 rounded-full border-4 border-primary object-cover md:h-24 md:w-24" />)}
          </div>
          <Reveal>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">365 novas inspirações para sua cozinha!</h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">Descubra receitas, experimente combinações e encontre novas maneiras de preparar seus pratos favoritos.</p>
            <Cta className="mt-8 w-full text-base sm:w-auto sm:px-10 sm:text-lg">QUERO MINHA COLEÇÃO!</Cta>
          </Reveal>
        </div>
      </section>

      <footer className="bg-background py-10 text-sm text-muted-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 md:flex-row md:justify-between">
          <p className="font-serif text-lg text-primary">{rodape.produto}</p>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <a href={rodape.privacidade} className="hover:text-primary">Política de privacidade</a>
            <a href={rodape.termos} className="hover:text-primary">Termos de uso</a>
            <a href={rodape.reembolso} className="hover:text-primary">Política de reembolso</a>
            <a href={rodape.suporte} className="hover:text-primary">Suporte</a>
          </nav>
          <p>© {new Date().getFullYear()} {rodape.produto}. Todos os direitos reservados.</p>
        </div>
      </footer>

    </main>
  );
}
