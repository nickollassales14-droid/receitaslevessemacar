import { createFileRoute } from "@tanstack/react-router";
import { InformativePage } from "@/components/informative-page";

export const Route = createFileRoute("/termos")({ component: Termos });

function Termos() {
  return (
    <InformativePage title="Termos de uso" intro="Leia estas informações sobre a página e a coleção antes de concluir a compra. As condições comerciais específicas são apresentadas no checkout escolhido.">
      <section>
        <h2 className="text-xl font-bold text-primary">Conteúdo e acesso</h2>
        <p className="mt-2">A coleção 365 Receitas Leves Sem Açúcar é um produto digital. Depois da confirmação do pagamento, a entrega ocorre pelo canal informado no checkout. Formato do material, forma de acesso, disponibilidade de download e demais condições devem ser conferidos na oferta e na confirmação da compra.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-primary">Preços e contratação</h2>
        <p className="mt-2">A página apresenta as opções básica e completa. O preço, os itens incluídos e as condições válidas são os exibidos no checkout antes da confirmação do pedido. A compra só é concluída na plataforma de pagamento.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-primary">Informações sobre as receitas</h2>
        <p className="mt-2">As expressões “sem açúcar” e “sem açúcar adicionado” referem-se à ausência de açúcar adicionado; ingredientes podem conter açúcares naturais. A adequação dos ingredientes depende da receita e de seus rótulos. Pessoas com alergias, doença celíaca ou outras condições de saúde devem conferir ingredientes e possíveis riscos de contaminação cruzada e buscar orientação profissional. O conteúdo não substitui aconselhamento médico ou nutricional.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-primary">Dúvidas sobre o pedido</h2>
        <p className="mt-2">Para informações sobre pagamento, entrega, acesso ou condições da oferta, consulte primeiro os detalhes exibidos no checkout e a mensagem de confirmação. Se precisar de ajuda, use o canal de suporte indicado nesses mesmos canais.</p>
      </section>
    </InformativePage>
  );
}
