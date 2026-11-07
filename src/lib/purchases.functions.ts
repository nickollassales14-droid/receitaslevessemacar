import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export const getPurchaseNotices = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return [];
  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
      headers.set("apikey", key);
      return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await client.rpc("recent_purchase_notifications");
  if (error) throw new Error("Não foi possível consultar as compras.");
  return z.array(z.object({
    id: z.string().min(1).max(150),
    buyer_key: z.string().regex(/^[a-f0-9]{64}$/),
    display_name: z.string().regex(/^[\p{L}]+ [\p{L}]\.$/u),
  })).max(30).parse(data ?? []);
});