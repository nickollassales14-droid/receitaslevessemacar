import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/cakto-webhook")({
  server: { handlers: { POST: async ({ request }) => {
    const secret = process.env["CAKTO_WEBHOOK_SECRET"];
    if (!secret) return new Response("Integration not configured", { status: 503 });
    if (!request.headers.get("content-type")?.includes("application/json")) return new Response("Unsupported content type", { status: 415 });
    const reader = request.body?.getReader();
    if (!reader) return new Response("Missing body", { status: 400 });
    const chunks: Uint8Array[] = [];
    let length = 0;
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 131072) { await reader.cancel(); return new Response("Payload too large", { status: 413 }); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    const body = new TextDecoder().decode(bytes);
    const { verifyCaktoSignature, webhookSchema, approvedNotice, isRevocation } = await import("@/lib/cakto-webhook.server");
    if (!verifyCaktoSignature(body, request.headers.get("x-cakto-timestamp"), request.headers.get("x-cakto-signature"), secret)) return new Response("Invalid signature", { status: 401 });
    let json: unknown;
    try { json = JSON.parse(body); } catch { return new Response("Invalid JSON", { status: 400 }); }
    const parsed = webhookSchema.safeParse(json);
    if (!parsed.success) return new Response("Invalid payload", { status: 400 });
    const { event, data } = parsed.data;
    const orders = Array.isArray(data) ? data : [data];
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    for (const order of orders) {
      if (isRevocation(event, order.status)) {
        // Tombstones prevent a delayed/replayed approval from restoring a revoked order.
        const { error } = await supabaseAdmin.from("cakto_purchase_notifications").upsert({
          order_id: order.id, buyer_key: "", display_name: "", offer_id: "", approved_at: null, revoked: true,
        }, { onConflict: "order_id" });
        if (error) return new Response("Could not record event", { status: 500 });
        continue;
      }
      const notice = approvedNotice(event, order, secret);
      if (!notice) continue;
      const { error } = await supabaseAdmin.from("cakto_purchase_notifications").upsert(notice, { onConflict: "order_id", ignoreDuplicates: true });
      if (error) return new Response("Could not record event", { status: 500 });
    }
    return Response.json({ received: true });
  } } },
});