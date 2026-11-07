import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";

// Full names remain server-only. The truncated “André B” is intentionally excluded.
const authorizedNames = [
  "Gabriel Silva de Oliveira", "Beatriz Santos Ferreira", "Rafael Souza Costa", "Mariana Almeida Ribeiro",
  "Lucas Pereira Lima", "Gabriela Rodrigues Martins", "Matheus Gomes Barbosa", "Larissa Carvalho Araujo",
  "Gustavo Mendes Rocha", "Amanda Cardoso Campos", "Felipe Moreira Pinto", "Jessica Teixeira Correia",
  "Vinicius Cavalcante Dias", "Camila Vieira Castro", "Leonardo Nunes Mendes", "Natália Azevedo Montez",
  "Bruno Farias Rezende", "Juliana Duarte Pacheco", "Rodrigo Machado Nogueira", "Fernanda Moraes Sales",
  "Eduardo Borges Freitas", "Bianca Vasconcelos Ramos", "Diego Lopes Batista", "Letícia Fogaça Magalhães",
  "Leonardo Camargo Bezerra", "Luana Guimarães Marinho", "Henrique Antunes Peixoto", "Patrícia Cerqueira Lacerda",
  "Samuel Medeiros Viana", "Carolina Pires Queiroz", "Daniel Furtado Silveira", "Isadora Lemos Guedes",
];
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR");
const orderSchema = z.object({
  id: z.string().min(1).max(150),
  status: z.string().min(1).max(60),
  checkoutUrl: z.string().url().max(2000).optional(),
  paidAt: z.string().datetime({ offset: true }).nullable().optional(),
  customer: z.object({ name: z.string().min(1).max(200) }).optional(),
});
export const webhookSchema = z.object({
  secret: z.string().min(1).max(500),
  event: z.string().min(1).max(100),
  data: z.union([orderSchema, z.array(orderSchema).min(1).max(50)]),
});

export function verifyCaktoSignature(body: string, timestamp: string | null, signature: string | null, secret: string, now = Date.now()) {
  if (!timestamp || !/^\d{10}$/.test(timestamp) || !signature || !/^v1=[a-f0-9]{64}$/.test(signature)) return false;
  if (Math.abs(now / 1000 - Number(timestamp)) > 300) return false;
  const expected = createHmac("sha256", secret).update(`${timestamp}.${body}`).digest();
  return timingSafeEqual(expected, Buffer.from(signature.slice(3), "hex"));
}

export function approvedNotice(event: string, order: z.infer<typeof orderSchema>, secret: string, now = Date.now()) {
  if (event !== "purchase_approved" || order.status !== "paid" || !order.paidAt || !order.customer || !order.checkoutUrl) return null;
  const approvedAt = Date.parse(order.paidAt);
  if (!Number.isFinite(approvedAt) || approvedAt > now || approvedAt <= now - 86_400_000) return null;
  const checkout = new URL(order.checkoutUrl);
  if (checkout.protocol !== "https:" || checkout.hostname !== "pay.cakto.com.br") return null;
  const offerId = checkout.pathname.replace(/\/$/, "").slice(1);
  if (!["33wqmvw_1276577", "yyp4n7z_1276637"].includes(offerId)) return null;
  const name = authorizedNames.find((name) => normalize(name) === normalize(order.customer?.name ?? ""));
  if (!name) return null;
  const parts = name.split(" ");
  const first = parts[0];
  const last = parts.at(-1);
  if (!first || !last) return null;
  return {
    order_id: order.id,
    buyer_key: createHmac("sha256", secret).update(normalize(name)).digest("hex"),
    display_name: `${first} ${last[0]}.`,
    offer_id: offerId,
    approved_at: order.paidAt,
    revoked: false,
  };
}

export function isRevocation(event: string, status: string) {
  return ["refund", "chargeback", "purchase_refused"].includes(event) || ["refunded", "chargedback", "canceled", "refused", "MED", "refund_requested"].includes(status);
}