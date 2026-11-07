import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { approvedNotice, isRevocation, verifyCaktoSignature, webhookSchema } from "@/lib/cakto-webhook.server";
import { notificationDelay, NOTIFICATION_DURATION, notificationsAllowed, selectNotice } from "@/lib/purchase-notifications";

const now = Date.parse("2026-11-07T00:00:00Z");
const secret = "unit-test-only-secret";
const order = { id: "unit-test-order", status: "paid", paidAt: "2026-11-06T23:59:00Z", checkoutUrl: "https://pay.cakto.com.br/yyp4n7z_1276637", customer: { name: "Gabriel Silva de Oliveira" } };

describe("Regras das notificações", () => {
  it("sorteia atrasos entre 30 e 120 segundos, sem intervalo fixo", () => {
    expect(notificationDelay(() => 0)).toBe(30_000);
    expect(notificationDelay(() => 0.5)).toBe(75_000);
    expect(notificationDelay(() => 0.999999)).toBe(120_000);
  });
  it("mantém o tempo de exibição em cinco segundos", () => expect(NOTIFICATION_DURATION).toBe(5_000));
  it("não repete imediatamente o mesmo comprador", () => {
    const a = { id: "1", buyer_key: "a", display_name: "Gabriel O." };
    const b = { id: "2", buyer_key: "b", display_name: "Beatriz F." };
    expect(selectNotice([a, b], new Set(), "a")).toEqual(b);
    expect(selectNotice([a], new Set(), "a")).toBeUndefined();
  });
  it("não reapresenta a mesma compra nem inventa compras quando vazio", () => {
    expect(selectNotice([], new Set())).toBeUndefined();
    expect(selectNotice([{ id: "1", buyer_key: "a", display_name: "Gabriel O." }], new Set(["1"]))).toBeUndefined();
  });
  it("não exibe no checkout", () => {
    expect(notificationsAllowed("/")).toBe(true);
    expect(notificationsAllowed("/checkout")).toBe(false);
  });
  it("só aceita pagamento aprovado, não pendente, recusado ou cancelado", () => {
    expect(approvedNotice("purchase_approved", order, secret, now)).not.toBeNull();
    for (const status of ["pending", "refused", "canceled"]) expect(approvedNotice("purchase_approved", { ...order, status }, secret, now)).toBeNull();
    expect(approvedNotice("pix_created", order, secret, now)).toBeNull();
  });
  it("exige nome completo autorizado e retorna apenas primeiro nome e inicial", () => {
    expect(approvedNotice("purchase_approved", order, secret, now)?.display_name).toBe("Gabriel O.");
    expect(approvedNotice("purchase_approved", { ...order, customer: { name: "Gabriel Outro Nome" } }, secret, now)).toBeNull();
    expect(approvedNotice("purchase_approved", { ...order, customer: { name: "André B" } }, secret, now)).toBeNull();
  });
  it("exige checkout de um dos pacotes configurados", () => {
    expect(approvedNotice("purchase_approved", { ...order, checkoutUrl: "https://pay.cakto.com.br/33wqmvw_1276577?x=1" }, secret, now)).not.toBeNull();
    expect(approvedNotice("purchase_approved", { ...order, checkoutUrl: "https://pay.cakto.com.br/outro" }, secret, now)).toBeNull();
    expect(approvedNotice("purchase_approved", { ...order, checkoutUrl: "https://example.com/yyp4n7z_1276637" }, secret, now)).toBeNull();
  });
  it("exige confirmação recente, não data futura ou ausente", () => {
    for (const paidAt of [undefined, "2026-11-08T00:00:00Z", "2026-11-05T00:00:00Z"]) expect(approvedNotice("purchase_approved", { ...order, paidAt }, secret, now)).toBeNull();
  });
  it("valida assinatura e rejeita adulteração, ausência e replay antigo", () => {
    const body = JSON.stringify({ secret, event: "purchase_approved", data: order });
    const timestamp = String(now / 1000);
    const signature = "v1=" + createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
    expect(verifyCaktoSignature(body, timestamp, signature, secret, now)).toBe(true);
    expect(verifyCaktoSignature(body + " ", timestamp, signature, secret, now)).toBe(false);
    expect(verifyCaktoSignature(body, timestamp, signature, secret, now + 301_000)).toBe(false);
    expect(verifyCaktoSignature(body, timestamp, null, secret, now)).toBe(false);
  });
  it("aceita entregas V1 e V2 sem tratar testes como compras", () => {
    expect(webhookSchema.safeParse({ secret, event: "purchase_approved", data: order }).success).toBe(true);
    expect(webhookSchema.safeParse({ secret, event: "purchase_approved", data: [order] }).success).toBe(true);
    expect(approvedNotice("purchase_approved", { ...order, customer: { name: "John Doe" } }, secret, now)).toBeNull();
  });
  it("retira compras reembolsadas, canceladas ou contestadas", () => {
    expect(isRevocation("refund", "paid")).toBe(true);
    expect(isRevocation("chargeback", "MED")).toBe(true);
    expect(isRevocation("other", "canceled")).toBe(true);
    expect(isRevocation("purchase_approved", "paid")).toBe(false);
  });
});