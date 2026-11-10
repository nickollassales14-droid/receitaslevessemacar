import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, type ReactNode } from 'react';
import {
  Smartphone, Monitor, Tablet, Printer, ShieldCheck, Download, Check, Leaf, Wheat, Milk,
  CandyOff, Coffee, BookOpen, Utensils, Croissant, Soup, CupSoda, Sandwich, IceCream,
  Gift, ShoppingBasket, CalendarDays, Repeat, Lock, Star,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ofertas, rodape } from '@/content/oferta';
import { PurchaseNotifications } from '@/components/purchase-notifications';
import { ReviewsSection } from '@/components/reviews-section';
import hero from '@/assets/hero.jpg';
import bolo from '@/assets/r-bolo.jpg';
import pao from '@/assets/r-pao.jpg';
import panqueca from '@/assets/r-panqueca.jpg';
import lasanha from '@/assets/r-lasanha.jpg';
import brigadeiro from '@/assets/r-brigadeiro.jpg';
import torta from '@/assets/r-torta.jpg';
import brownie from '@/assets/r-brownie.jpg';
import cookies from '@/assets/r-cookies.jpg';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: '365 Receitas Leves Sem Açúcar | Coleção digital' },
      { name: 'description', content: 'Coleção digital com 365 receitas deliciosas, com opções sem açúcar adicionado, sem glúten e sem lactose para variar sua rotina.' },
      { property: 'og:title', content: '365 Receitas Leves Sem Açúcar' },
      { property: 'og:description', content: 'Descubra um novo jeito de aproveitar cada receita: 365 inspirações para sua cozinha.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Index,
});

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

const Cta = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <a href='#ofertas' className={`inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}>{children}</a>
);

const Title = ({ eyebrow, children, sub }: { eyebrow?: string; children: ReactNode; sub?: string }) => (
  <Reveal className='mx-auto mb-8 max-w-2xl text-center md:mb-10'>
    {eyebrow && <p className='mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-secondary'>{eyebrow}</p>}
    <h2 className='text-2xl font-bold leading-tight text-primary sm:text-3xl md:text-4xl'>{children}</h2>
    {sub && <p className='mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base'>{sub}</p>}
  </Reveal>
);

const receitas = [
  { img: bolo, n: 'Bolo de cenoura' },
  { img: pao, n: 'Pão caseiro sem glúten' },
  { img: panqueca, n: 'Panqueca de banana' },
  { img: lasanha, n: 'Lasanha sem glúten' },
  { img: brigadeiro, n: 'Brigadeiro sem açúcar adicionado' },
  { img: torta, n: 'Torta salgada de frango' },
  { img: brownie, n: 'Brownie de chocolate' },
  { img: cookies, n: 'Cookies sem glúten' },
];

const categorias = [
  { i: Coffee, n: 'Café da manhã', q: 45 },
  { i: Croissant, n: 'Pães, bolos e massas', q: 55 },
  { i: Utensils, n: 'Almoços e jantares', q: 55 },
  { i: Sandwich, n: 'Lanches e salgados', q: 45 },
  { i: IceCream, n: 'Sobremesas', q: 55 },
  { i: Milk, n: 'Receitas sem lactose', q: 35 },
  { i: Soup, n: 'Molhos e acompanhamentos', q: 35 },
  { i: CupSoda, n: 'Bebidas e preparações extras', q: 40 },
];

const bonus = [
  { i: ShoppingBasket, n: 'Lista de Compras Essenciais', d: 'Uma lista organizada para ajudar você a reunir os ingredientes necessários.' },
  { i: CalendarDays, n: 'Cardápio de 30 Dias', d: 'Um planejamento para ajudar a organizar suas refeições e variar as preparações.' },
  { i: Repeat, n: 'Guia de Substituições', d: 'Alternativas de ingredientes para adaptar receitas e descobrir combinações.' },
];

const faq = [
  ['Como vou receber minha coleção?', 'Após a confirmação da compra, a coleção digital é disponibilizada pelo canal de entrega informado no checkout.'],
  ['Em quais aparelhos posso acessar?', 'Você pode consultar a coleção no celular, tablet ou computador. Também pode imprimir páginas para uso pessoal.'],
  ['Preciso ter experiência na cozinha?', 'Não. O passo a passo é prático e pensado também para quem está começando.'],
  ['Os ingredientes são fáceis de encontrar?', 'A proposta é priorizar ingredientes comuns. Algumas receitas podem usar itens específicos, como farinhas sem glúten.'],
  ['A coleção tem receitas doces e salgadas?', 'Sim. Há ideias para café da manhã, almoço, jantar, lanches, sobremesas, molhos e bebidas.'],
  ['Por quanto tempo terei acesso?', 'O acesso segue o formato e as condições apresentados no checkout. Depois de baixar o arquivo, você pode guardá-lo em seus dispositivos; a disponibilidade de um novo download depende do canal de entrega.'],
  ['Como funciona a garantia?', 'A oferta informa 15 dias de garantia. Consulte as condições e o canal para solicitar reembolso na política de reembolso ou no suporte indicado na confirmação da compra.'],
  ['A coleção é indicada para pessoas com doença celíaca?', 'As receitas são elaboradas sem ingredientes que contêm glúten, mas a coleção não substitui orientação profissional. Pessoas com doença celíaca, alergias ou condições de saúde devem conferir os rótulos, considerar o risco de contaminação cruzada e consultar um profissional.'],
  ['Sem açúcar significa sem açúcares naturais?', 'Não. “Sem açúcar” significa sem açúcar adicionado; ingredientes como frutas e leites vegetais podem conter açúcares naturais. “Sem glúten” e “sem lactose” referem-se aos ingredientes indicados.'],
];

function Index() {
  return (
    <main className='overflow-x-hidden'>
      <PurchaseNotifications />
      <div className='border-b border-border bg-card'>
        <div className='mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-primary sm:text-sm'>
          <Leaf className='h-4 w-4 shrink-0 text-secondary' aria-hidden='true' />
          <span>365 Receitas Leves Sem Açúcar</span>
        </div>
      </div>

      <section className='bg-background'>
        <div className='mx-auto grid max-w-6xl items-center gap-5 px-5 py-5 sm:py-8 md:grid-cols-2 md:gap-10 md:px-8 md:py-12'>
          <div className='text-center md:text-left'>
            <p className='mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-secondary'>Coleção digital</p>
            <h1 className='text-[1.75rem] font-bold leading-tight text-primary sm:text-4xl md:text-5xl'>365 ideias para variar sua rotina na cozinha</h1>
            <p className='mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base md:mx-0'>Receitas doces e salgadas com opções sem açúcar adicionado, sem glúten e sem lactose.</p>
            <div className='mx-auto mt-4 max-w-sm overflow-hidden rounded-xl md:mx-0 md:hidden'>
              <img src={hero} alt='Coleção 365 Receitas Leves Sem Açúcar' width={1280} height={1152} className='h-36 w-full object-cover object-center sm:h-48' />
            </div>
            <p className='mt-4 text-sm font-medium text-muted-foreground'>Opções a partir de <span className='font-bold text-primary'>R$ 14,90</span></p>
            <Cta className='mt-3 w-full sm:w-auto'>Ver opções da coleção <span aria-hidden='true'>↓</span></Cta>
            <div className='mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground md:justify-start sm:text-sm'>
              <span className='inline-flex items-center gap-1.5'><Download className='h-4 w-4 text-secondary' />Acesso digital</span>
              <span className='inline-flex items-center gap-1.5'><ShieldCheck className='h-4 w-4 text-secondary' />15 dias de garantia</span>
            </div>
          </div>
          <div className='hidden md:block'>
            <img src={hero} alt='Coleção 365 Receitas Leves Sem Açúcar' width={1280} height={1152} className='mx-auto max-h-[28rem] w-full rounded-2xl object-cover' />
          </div>
        </div>
      </section>

      <section className='px-5 pb-10 md:pb-14' aria-label='Destaques da coleção'>
        <div className='mx-auto grid max-w-5xl grid-cols-2 gap-3 border-y border-border py-4 text-center sm:grid-cols-4 sm:gap-5'>
          {[[CandyOff, 'Sem açúcar adicionado'], [Wheat, 'Opções sem glúten'], [Milk, 'Opções sem lactose'], [BookOpen, '365 receitas']].map(([I, label]) => {
            const Icon = I as typeof Leaf;
            return <div key={label as string} className='flex items-center justify-center gap-2 text-xs font-medium text-foreground sm:text-sm'><Icon className='h-4 w-4 shrink-0 text-secondary' />{label as string}</div>;
          })}
        </div>
      </section>

      <section id='galeria' className='scroll-mt-4 px-5 py-10 md:py-14'>
        <div className='mx-auto max-w-6xl'>
          <Title eyebrow='Uma prévia da coleção'>Algumas receitas que você encontra</Title>
          <div className='grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4'>
            {receitas.map((r) => <article key={r.n} className='overflow-hidden rounded-xl border border-border bg-card'>
              <img src={r.img} alt={r.n} loading='lazy' width={896} height={752} className='aspect-[6/5] w-full object-cover' />
              <h3 className='px-3 py-3 text-sm font-semibold leading-snug text-primary sm:px-4 sm:text-base'>{r.n}</h3>
            </article>)}
          </div>
          <div className='mt-7 text-center'><Cta className='w-full sm:w-auto'>Ver as opções de compra</Cta></div>
        </div>
      </section>

      <section className='bg-card px-5 py-10 md:py-14'>
        <div className='mx-auto max-w-5xl'>
          <Title eyebrow='Conteúdo da coleção' sub='Receitas doces e salgadas organizadas para diferentes momentos do dia.'>365 receitas em categorias</Title>
          <div className='divide-y divide-border border-y border-border'>
            {categorias.map(({ i: I, n, q }) => <div key={n} className='flex items-center justify-between gap-4 py-3.5'>
              <span className='flex items-center gap-3 text-sm font-medium text-foreground sm:text-base'><I className='h-5 w-5 shrink-0 text-secondary' />{n}</span>
              <span className='shrink-0 text-sm text-muted-foreground'>{q} receitas</span>
            </div>)}
          </div>
          <p className='mt-4 text-center text-sm font-semibold text-primary'>365 receitas no total</p>
        </div>
      </section>

      <section className='px-5 py-10 md:py-14'>
        <div className='mx-auto max-w-5xl'>
          <Title eyebrow='Materiais extras' sub='Incluídos no pacote completo, conforme a opção apresentada na oferta.'>O pacote completo também inclui</Title>
          <div className='grid gap-3 sm:grid-cols-3'>
            {bonus.map(({ i: I, n, d }) => <article key={n} className='flex gap-3 border-t border-border py-4 sm:block sm:border-t-0 sm:py-0'>
              <span className='grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted text-secondary sm:mb-3'><I className='h-5 w-5' /></span>
              <div><h3 className='text-sm font-semibold text-primary sm:text-base'>{n}</h3><p className='mt-1 text-sm leading-relaxed text-muted-foreground'>{d}</p></div>
            </article>)}
          </div>
        </div>
      </section>

      <section id='ofertas' className='scroll-mt-4 bg-card px-5 py-10 md:py-14'>
        <div className='mx-auto max-w-5xl'>
          <Title eyebrow='Escolha sua coleção' sub='Confira o conteúdo e o preço de cada opção antes de seguir para o checkout.'>Encontre a opção ideal para você</Title>
          <div className='grid items-stretch gap-4 md:grid-cols-2 md:gap-6'>
            {ofertas.map((o) => <article key={o.id} className={`relative flex flex-col rounded-2xl border bg-background p-5 sm:p-7 ${o.destaque ? 'border-offer-green ring-1 ring-offer-green' : 'border-border'}`}>
              {o.destaque && <span className='mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-offer-green-soft px-3 py-1.5 text-xs font-bold text-primary'><Star className='h-3.5 w-3.5 fill-current text-offer-green' aria-hidden='true' />Melhor custo-benefício</span>}
              <span className='text-xs font-semibold uppercase tracking-wider text-secondary'>{o.etiqueta}</span>
              <h3 className='mt-2 text-xl font-bold leading-tight text-primary sm:text-2xl'>{o.nome}</h3>
              <ul className='mt-5 flex-1 space-y-3 text-sm leading-relaxed text-foreground sm:text-base'>
                {o.itens.map((it) => <li key={it} className='flex items-start gap-2.5'><Check className='mt-0.5 h-4 w-4 shrink-0 text-secondary' />{it}</li>)}
                {o.bonus.map((it) => { const [tag, txt] = it.split(': '); return <li key={it} className='flex items-start gap-2.5'><Gift className='mt-0.5 h-4 w-4 shrink-0 text-secondary' /><span><span className='sr-only'>{tag}: </span>{txt}</span></li>; })}
              </ul>
              {o.nota && <p className='mt-5 rounded-lg bg-offer-green-soft px-3 py-2.5 text-sm font-medium leading-relaxed text-primary'>{o.nota}</p>}
              <div className='mt-6 text-center'>
                {o.precoAntigo && <p className='mb-1 text-sm text-muted-foreground line-through'>{o.precoAntigo}</p>}
                <p className='text-4xl font-bold tracking-tight text-primary sm:text-5xl'>{o.preco}</p>
                <Button asChild variant={o.destaque ? 'offerComplete' : 'offer'} className='mt-4 h-auto min-h-14 w-full whitespace-normal rounded-lg px-4 py-4 text-sm font-bold leading-snug sm:text-base'><a href={o.link} target='_blank' rel='noopener noreferrer'>{o.botao}</a></Button>
              </div>
            </article>)}
          </div>
          <ul className='mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm'>
            <li className='flex items-center gap-1.5'><Lock className='h-4 w-4' />Pagamento seguro no checkout</li>
            <li className='flex items-center gap-1.5'><Download className='h-4 w-4' />Acesso após aprovação do pagamento</li>
            <li className='flex items-center gap-1.5'><Smartphone className='h-4 w-4' />Formato digital</li>
          </ul>
        </div>
      </section>

      <ReviewsSection />

      <section className='px-5 py-10 md:py-14'>
        <div className='mx-auto grid max-w-4xl gap-8 sm:grid-cols-2'>
          <article className='flex items-start gap-4 border-t border-border pt-5'>
            <span className='grid h-12 w-12 shrink-0 place-items-center rounded-full bg-muted text-primary'><ShieldCheck className='h-6 w-6' /></span>
            <div><h2 className='font-bold text-primary'>15 dias de garantia</h2><p className='mt-2 text-sm leading-relaxed text-muted-foreground'>A oferta informa 15 dias de garantia. Consulte as condições para solicitar reembolso.</p><a href={rodape.reembolso} className='mt-2 inline-block text-sm font-semibold text-secondary underline underline-offset-4 hover:text-primary'>Ver política de reembolso</a></div>
          </article>
          <article className='flex items-start gap-4 border-t border-border pt-5'>
            <span className='grid h-12 w-12 shrink-0 place-items-center rounded-full bg-muted text-primary'><Download className='h-6 w-6' /></span>
            <div><h2 className='font-bold text-primary'>Recebimento digital</h2><p className='mt-2 text-sm leading-relaxed text-muted-foreground'>Após a confirmação da compra, a coleção é disponibilizada pelo canal indicado no checkout. Consulte o material no celular, tablet ou computador.</p><div className='mt-3 flex gap-3 text-muted-foreground' aria-label='Compatível com celular, computador, tablet e impressão'><Smartphone className='h-4 w-4' /><Monitor className='h-4 w-4' /><Tablet className='h-4 w-4' /><Printer className='h-4 w-4' /></div></div>
          </article>
        </div>
      </section>

      <section className='bg-card px-5 py-10 md:py-14'>
        <div className='mx-auto max-w-3xl'>
          <Title eyebrow='Dúvidas frequentes'>Perguntas e respostas</Title>
          <Accordion type='single' collapsible className='space-y-2'>
            {faq.map(([q, a], k) => <AccordionItem key={k} value={`f${k}`} className='rounded-xl border border-border bg-background px-4'>
              <AccordionTrigger className='py-4 text-left text-sm font-semibold text-primary hover:no-underline sm:text-base'>{q}</AccordionTrigger>
              <AccordionContent className='text-sm leading-relaxed text-muted-foreground'>{a}</AccordionContent>
            </AccordionItem>)}
          </Accordion>
          <div className='mt-7 text-center'><Cta className='w-full sm:w-auto'>Ver opções da coleção</Cta></div>
        </div>
      </section>

      <footer className='bg-background px-5 py-8 text-xs text-muted-foreground sm:text-sm'>
        <div className='mx-auto flex max-w-6xl flex-col items-center gap-4 text-center md:flex-row md:justify-between'>
          <p className='font-semibold text-primary'>{rodape.produto}</p>
          <nav aria-label='Informações' className='flex flex-wrap justify-center gap-x-4 gap-y-2'>
            <a href={rodape.privacidade} className='hover:text-primary'>Privacidade</a>
            <a href={rodape.termos} className='hover:text-primary'>Termos de uso</a>
            <a href={rodape.reembolso} className='hover:text-primary'>Reembolso</a>
            <a href={rodape.suporte} className='hover:text-primary'>Suporte</a>
          </nav>
          <p>© {new Date().getFullYear()} {rodape.produto}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
