import { createFileRoute } from "@tanstack/react-router";
import { InformativePage } from "@/components/informative-page";

export const Route = createFileRoute("/privacidade")({ component: Privacidade });

function Privacidade() {
  return (
    <InformativePage title="Política de privacidade" intro="Esta página explica, de forma objetiva, quais dados são usados pelos recursos disponíveis neste site e como eles participam da experiência da coleção.">
      <section>
        <h2 className="text-xl font-bold text-primary">Dados usados neste site</h2>
        <p className="mt-2">O site não oferece cadastro próprio. Para a função de curtidas nas avaliações, é gerada uma chave aleatória no navegador e armazenada no armazenamento local. A chave e o identificador da avaliação são usados para registrar e exibir curtidas, sem identificar você pelo nome.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-primary">Compras e entrega</h2>
        <p className="mt-2">A compra é concluída no checkout da Cakto, que processa os dados necessários ao pagamento e à entrega conforme os próprios termos e avisos de privacidade. Este site recebe apenas avisos de compras aprovadas e elegíveis para a notificação de compra; no site pode ser exibido um nome abreviado. Os registros técnicos das notificações ficam no servidor e usam uma chave pseudônima de comprador.</p>
        <p className="mt-2">Não informe dados de pagamento ou documentos em avaliações ou outros campos públicos. O site não solicita esses dados diretamente.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-primary">Serviços e armazenamento</h2>
        <p className="mt-2">A função de curtidas usa o serviço Supabase para guardar e consultar os registros correspondentes. O checkout e a entrega são realizados pela plataforma de pagamento indicada na oferta. Esses serviços podem tratar dados conforme suas próprias políticas.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-primary">Medição de eventos com a Meta</h2>
        <p className="mt-2">O site usa o Meta Pixel e a Conversions API para registrar PageView nas rotas, ViewContent na página da coleção e InitiateCheckout quando um link de oferta é acionado. O mesmo identificador de evento é enviado pelo navegador e pelo servidor para permitir a deduplicação desses registros. Para essa medição, podem ser enviados à Meta o endereço da página, o tipo de evento, o agente do navegador, cookies _fbp e _fbc quando disponíveis e, quando fornecido pela hospedagem, o endereço IP. O token de acesso da integração fica somente no servidor.</p>
      </section>
      <section>
        <h2 className="text-xl font-bold text-primary">Seus direitos e contato</h2>
        <p className="mt-2">Para dúvidas ou solicitações relacionadas aos dados usados na compra, utilize o canal de suporte indicado no checkout ou na confirmação da compra. Informações oficiais sobre os direitos de titulares estão disponíveis na <a className="font-semibold text-secondary underline underline-offset-4" href="https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares" target="_blank" rel="noopener noreferrer">página da ANPD</a>.</p>
      </section>
      <p className="text-xs text-muted-foreground">Esta política descreve os recursos atualmente presentes no site. Os dados tratados pelo checkout também estão sujeitos aos avisos apresentados pela plataforma no momento da compra.</p>
    </InformativePage>
  );
}
