import { createFileRoute } from "@tanstack/react-router";
import { InformativePage } from "@/components/informative-page";

export const Route = createFileRoute("/reembolso")({ component: Reembolso });

function Reembolso() {
  return (
    <InformativePage title="Política de reembolso" intro="A oferta da coleção informa 15 dias de garantia. Confira abaixo como localizar as condições e encaminhar uma solicitação.">
      <section>
        <h2 className="text-xl font-bold text-primary">Prazo informado na oferta</h2>
        <p className="mt-2">A garantia comercial anunciada para a coleção é de 15 dias. Verifique na confirmação do pedido como o prazo é contado e quais instruções se aplicam à sua compra. Os direitos previstos na legislação de consumo continuam aplicáveis.</p>
        <p className="mt-2">O Código de Defesa do Consumidor prevê prazo de arrependimento de 7 dias para contratações feitas fora do estabelecimento comercial. Consulte o <a className="font-semibold text-secondary underline underline-offset-4" href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm" target="_blank" rel="noopener noreferrer">artigo 49 do CDC</a> para o texto legal.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-primary">Como solicitar</h2>
        <ol className="mt-2 list-decimal space-y-2 pl-5">
          <li>Localize a mensagem de confirmação da compra e as condições da oferta adquirida.</li>
          <li>Use o canal de suporte indicado no checkout ou nessa confirmação para solicitar o reembolso.</li>
          <li>Inclua as informações do pedido solicitadas pela plataforma para localizar a compra; não envie dados de pagamento por canais públicos.</li>
        </ol>
        <p className="mt-3">O processamento do pedido e a confirmação do reembolso seguem o fluxo e os prazos informados pela plataforma de pagamento.</p>
      </section>
      <p className="text-xs text-muted-foreground">Esta página não substitui as condições específicas apresentadas no checkout nem limita direitos previstos em lei.</p>
    </InformativePage>
  );
}
