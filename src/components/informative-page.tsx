import type { ReactNode } from "react";

const paginas = [
  ["Privacidade", "/privacidade"],
  ["Termos de uso", "/termos"],
  ["Reembolso", "/reembolso"],
  ["Suporte", "/suporte"],
] as const;

export function InformativePage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:py-16">
      <article className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
        <a href="/" className="text-sm font-semibold text-secondary underline underline-offset-4 hover:text-primary">← Voltar para a página inicial</a>
        <p className="eyebrow mb-3 mt-8">365 Receitas Leves Sem Açúcar</p>
        <h1 className="text-3xl font-bold leading-tight text-primary sm:text-4xl">{title}</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">{intro}</p>
        <div className="prose-content mt-8 space-y-6 text-sm leading-relaxed sm:text-base">{children}</div>
        <nav aria-label="Informações e suporte" className="mt-10 flex flex-wrap gap-x-5 gap-y-3 border-t border-border pt-6 text-sm font-medium">
          {paginas.map(([label, href]) => <a key={href} href={href} className="text-secondary underline underline-offset-4 hover:text-primary">{label}</a>)}
        </nav>
      </article>
    </main>
  );
}
