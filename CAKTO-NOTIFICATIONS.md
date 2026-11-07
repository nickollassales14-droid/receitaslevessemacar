# Configuração de notificações Cakto

A página permanece silenciosa até receber compras reais aprovadas, recentes (últimas 24 horas) e correspondentes a nomes completos autorizados. Não há compras de demonstração.

## Configuração pelo proprietário da conta

1. Publique a versão atual da página.
2. Na Cakto, configure um webhook para o produto ou produtos dos dois pacotes. Os códigos dos links de checkout não devem ser usados como IDs de produto sem confirmação na Cakto.
3. URL de produção: `https://project--8538d687-aee6-4d44-8283-28ad0db5a2ce.lovable.app/api/public/cakto-webhook`.
4. Eventos: `purchase_approved`, `purchase_refused`, `refund`, `chargeback`, `refund_requested`. Inclua também os eventos de cancelamento disponibilizados no painel, se existentes.
5. Copie o segredo do webhook da Cakto para o campo seguro `CAKTO_WEBHOOK_SECRET` no Lovable. Não cole o segredo em mensagens.
6. A entrega precisa trazer `X-Cakto-Timestamp` e `X-Cakto-Signature` conforme o guia oficial. Assinaturas ausentes, inválidas ou mais antigas que cinco minutos são rejeitadas.
7. Um teste da Cakto comprova conectividade, não uma venda real. Para validar ponta a ponta, aguarde uma compra efetivamente aprovada de um comprador autorizado e confira a notificação na página.

## Privacidade e regras

- Nomes completos são comparados somente no servidor, com tolerância a acentos, maiúsculas e espaços. Não são publicados no navegador.
- Só os dois links já configurados são aceitos. Se `checkoutUrl` real tiver formato diferente, a entrega será ignorada até revisar a correspondência com dados reais da Cakto; não ampliar o filtro às cegas.
- Não armazenar e-mail, documento, telefone, nome completo ou corpo do webhook.
- Armazenar apenas identificação do pedido, nome abreviado, chave pseudônima de comprador, pacote e horários.
- Compras reembolsadas/contestadas/canceladas ficam inelegíveis; eventos fora de ordem não restauram uma compra retirada.
- Uma compra não aparece duas vezes na mesma visita; compradores consecutivos iguais são evitados. Se só houver uma compra elegível, ela aparece uma vez.
- A lista enviada termina em “André B”; essa entrada foi excluída até receber o nome completo e autorização correspondente.

Referência oficial: https://docs.cakto.com.br/conceitos/webhooks