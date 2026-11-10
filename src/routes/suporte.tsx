import { createFileRoute } from "@tanstack/react-router";
import { InformativePage } from "@/components/informative-page";

export const Route = createFileRoute("/suporte")({ component: Suporte });

function Suporte() {
  return (
    <InformativePage title="Suporte" intro="Precisa de ajuda com a coleção ou com seu pedido? Use o canal indicado pela plataforma no checkout ou na mensagem de confirmação da compra.">
      <section>
        <h2 className="text-xl font-bold text-primary">Sobre pagamento, entrega e acesso</h2>
        <p className="mt-2">Consulte a confirmação enviada após a compra: ela informa o canal de entrega e as orientações para acessar o material. Para o status do pagamento ou dificuldades no checkout, procure também o suporte da plataforma de pagamento indicada no pedido.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-primary">Para agilizar o atendimento</h2>
        <p className="mt-2">Informe o número do pedido e descreva sua dúvida no canal de suporte da compra. Envie dados pessoais ou comprovantes somente pelo canal seguro indicado pela plataforma; não publique essas informações em avaliações ou comentários.</p>
      </section>
      <p className="text-sm text-muted-foreground">O projeto não disponibiliza um endereço de e-mail ou telefone de suporte nos dados desta página. Por isso, as instruções de contato ficam vinculadas ao canal informado no checkout e na confirmação da compra.</p>
    </InformativePage>
  );
}
