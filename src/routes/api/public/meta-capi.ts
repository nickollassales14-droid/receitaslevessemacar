import { createFileRoute } from "@tanstack/react-router";

type MetaEventName = "PageView" | "ViewContent" | "InitiateCheckout";
type MetaCustomData = { content_name: string; content_type: "product" };
type MetaEventInput = {
  eventName: MetaEventName;
  eventId: string;
  eventSourceUrl: string;
  customData?: MetaCustomData;
};

const EVENT_NAMES = new Set<MetaEventName>(["PageView", "ViewContent", "InitiateCheckout"]);
const MAX_BODY_SIZE = 8192;
const EVENT_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const CONTENT_NAME = "365 Receitas Leves Sem Açúcar";

async function readRequestBody(request: Request): Promise<string | Response> {
  const reader = request.body?.getReader();
  if (!reader) return new Response("Missing body", { status: 400 });

  const chunks: Uint8Array[] = [];
  let length = 0;
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_BODY_SIZE) {
      await reader.cancel();
      return new Response("Payload too large", { status: 413 });
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

function parseEvent(value: unknown, request: Request): MetaEventInput | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  const allowedKeys = new Set(["eventName", "eventId", "eventSourceUrl", "customData"]);
  if (Object.keys(input).some((key) => !allowedKeys.has(key))) return null;

  if (typeof input.eventName !== "string" || !EVENT_NAMES.has(input.eventName as MetaEventName)) return null;
  if (typeof input.eventId !== "string" || !EVENT_ID_PATTERN.test(input.eventId)) return null;
  if (typeof input.eventSourceUrl !== "string" || input.eventSourceUrl.length > 2048) return null;

  let sourceUrl: URL;
  let requestUrl: URL;
  try {
    sourceUrl = new URL(input.eventSourceUrl);
    requestUrl = new URL(request.url);
  } catch {
    return null;
  }
  if (sourceUrl.origin !== requestUrl.origin || !["http:", "https:"].includes(sourceUrl.protocol)) return null;

  let customData: MetaCustomData | undefined;
  if (input.customData !== undefined) {
    if (!input.customData || typeof input.customData !== "object" || Array.isArray(input.customData)) return null;
    const data = input.customData as Record<string, unknown>;
    if (
      Object.keys(data).length !== 2 ||
      data.content_name !== CONTENT_NAME ||
      data.content_type !== "product"
    ) return null;
    customData = { content_name: CONTENT_NAME, content_type: "product" };
  }

  if ((input.eventName === "PageView") !== (customData === undefined)) return null;

  return {
    eventName: input.eventName as MetaEventName,
    eventId: input.eventId,
    eventSourceUrl: `${sourceUrl.origin}${sourceUrl.pathname}`,
    ...(customData ? { customData } : {}),
  };
}

export const Route = createFileRoute("/api/public/meta-capi")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
          return new Response("Unsupported content type", { status: 415 });
        }

        const origin = request.headers.get("origin");
        let requestOrigin: string;
        try {
          requestOrigin = new URL(request.url).origin;
        } catch {
          return new Response("Invalid request", { status: 400 });
        }
        if (!origin || origin !== requestOrigin || request.headers.get("sec-fetch-site") === "cross-site") {
          return new Response("Forbidden", { status: 403 });
        }

        const body = await readRequestBody(request);
        if (body instanceof Response) return body;

        let parsed: unknown;
        try {
          parsed = JSON.parse(body);
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const event = parseEvent(parsed, request);
        if (!event) return new Response("Invalid event", { status: 400 });

        const { sendMetaCapiEvent } = await import("@/lib/meta-capi.server");
        const result = await sendMetaCapiEvent(request, event);
        if (result === "not_configured") return new Response("Integration not configured", { status: 503 });
        if (result !== "sent") return new Response("Event delivery failed", { status: 502 });
        return Response.json({ received: true });
      },
    },
  },
});
