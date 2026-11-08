import { useEffect, useRef, useState, type ReactNode } from "react";
import { Heart, Leaf, MessageSquareQuote, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { depoimentos, type Depoimento } from "@/content/oferta";
import { nextLikeState } from "@/lib/review-likes";
import panqueca from "@/assets/r-panqueca.jpg";
import lasanha from "@/assets/r-lasanha.jpg";
import torta from "@/assets/r-torta.jpg";
import cookies from "@/assets/r-cookies.jpg";

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

const VISITOR_STORAGE_KEY = "rl-visitor-key";

function visitorKey(): string {
  let key = localStorage.getItem(VISITOR_STORAGE_KEY);
  if (!key) {
    key = crypto.randomUUID();
    localStorage.setItem(VISITOR_STORAGE_KEY, key);
  }
  return key;
}

function LikeButton({ reviewId }: { reviewId: string }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.from("review_likes").select("visitor_key").eq("review_id", reviewId);
      if (!active || !data) return;
      setCount(data.length);
      setLiked(data.some((row) => row.visitor_key === visitorKey()));
    })();
    return () => { active = false; };
  }, [reviewId]);

  const toggle = async () => {
    if (busy) return;
    setBusy(true);
    const prev = { liked, count };
    const next = nextLikeState(liked, count);
    setLiked(next.liked);
    setCount(next.count);
    const key = visitorKey();
    const { error } = next.liked
      ? await supabase.from("review_likes").insert({ review_id: reviewId, visitor_key: key })
      : await supabase.from("review_likes").delete().eq("review_id", reviewId).eq("visitor_key", key);
    if (error) {
      setLiked(prev.liked);
      setCount(prev.count);
    }
    setBusy(false);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      aria-label="Curtir esta avaliação"
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
        liked
          ? "border-accent/60 bg-accent/10 text-accent"
          : "border-border text-muted-foreground hover:border-accent/40 hover:text-accent"
      }`}
    >
      <Heart className={`h-3.5 w-3.5 transition-transform duration-200 ${liked ? "scale-110 fill-current" : ""}`} />
      Curtir{count > 0 ? ` · ${count}` : ""}
    </button>
  );
}

function ReviewCard({ d }: { d: Depoimento }) {
  const partes = d.nome.trim().split(/\s+/);
  const primeiroNome = partes[0];
  const iniciais = partes.map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <article className="card-soft flex h-full flex-col p-6">
      {d.fotoReceita && (
        <img src={d.fotoReceita} alt={`Receita preparada por ${primeiroNome}`} loading="lazy" className="mb-4 aspect-video w-full rounded-xl object-cover" />
      )}
      <div className="flex gap-0.5 text-accent" aria-label={`Nota ${d.nota} de 5`}>
        {Array.from({ length: 5 }).map((_, s) => (
          <Star key={s} className={`h-4 w-4 ${s < d.nota ? "fill-current" : "opacity-30"}`} />
        ))}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed">{d.comentario}</p>
      <div className="mt-5 flex items-center gap-3">
        {d.foto ? (
          <img src={d.foto} alt={primeiroNome} className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary/15 font-serif text-sm font-bold text-primary">{iniciais}</span>
        )}
        <div>
          <p className="font-semibold text-primary">{primeiroNome}</p>
          {d.data && <p className="text-xs text-muted-foreground">{d.data}</p>}
        </div>
      </div>
      <div className="mt-4 border-t border-border pt-4">
        <LikeButton reviewId={d.id} />
      </div>
    </article>
  );
}

const ENCONTRAR = [
  {
    img: panqueca,
    titulo: "Chega de repetir as mesmas receitas",
    texto: "365 ideias doces e salgadas para variar o cardápio.",
  },
  {
    img: lasanha,
    titulo: "Mais praticidade no dia a dia",
    texto: "Receitas com ingredientes, quantidades, preparo, tempo e rendimento.",
  },
  {
    img: torta,
    titulo: "Mais facilidade para se organizar",
    texto: "O pacote completo inclui um cardápio de 30 dias e uma lista de compras inteligente.",
  },
  {
    img: cookies,
    titulo: "Mais possibilidades na cozinha",
    texto: "Um guia de substituições para ajudar a adaptar preparações conforme os ingredientes disponíveis.",
  },
];

export function ReviewsSection() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="eyebrow mb-3">Avaliações</p>
          <h2 className="text-3xl font-bold leading-tight text-primary md:text-5xl">Uma nova forma de ter mais inspiração na cozinha</h2>
          <div className="mx-auto mt-5 flex items-center justify-center gap-2 text-secondary">
            <span className="h-px w-10 bg-secondary/50" />
            <Leaf className="h-4 w-4" />
            <span className="h-px w-10 bg-secondary/50" />
          </div>
          <p className="mt-5 text-muted-foreground md:text-lg">Conheça os benefícios de ter receitas e ferramentas práticas reunidas em um só lugar.</p>
        </Reveal>

        {depoimentos.length === 0 ? (
          <Reveal className="card-soft mx-auto max-w-xl p-10 text-center">
            <MessageSquareQuote className="mx-auto h-10 w-10 text-secondary" />
            <p className="mt-4 font-serif text-xl text-primary">Em breve, as experiências de quem já está cozinhando com a coleção.</p>
            <p className="mt-2 text-sm text-muted-foreground">Estamos reunindo depoimentos reais e autorizados de compradores.</p>
          </Reveal>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {depoimentos.map((d) => (
              <Reveal key={d.id}>
                <ReviewCard d={d} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="mx-auto mb-10 mt-20 max-w-3xl text-center">
          <p className="eyebrow mb-3">Na prática</p>
          <h3 className="text-2xl font-bold leading-tight text-primary md:text-4xl">O que você vai encontrar nessa coleção</h3>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ENCONTRAR.map((c) => (
            <Reveal key={c.titulo}>
              <div className="card-soft h-full overflow-hidden p-0">
                <img src={c.img} alt="" loading="lazy" className="aspect-video w-full object-cover" />
                <div className="p-5">
                  <h4 className="font-serif text-lg font-bold leading-snug text-primary">{c.titulo}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.texto}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
