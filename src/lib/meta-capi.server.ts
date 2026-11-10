import { isIP } from "node:net";

type MetaEventName = "PageView" | "ViewContent" | "InitiateCheckout";
type MetaCustomData = { content_name: string; content_type: "product" };
type MetaEventInput = {
  eventName: MetaEventName;
  eventId: string;
  eventSourceUrl: string;
  customData?: MetaCustomData;
};

type MetaUserData = {
  client_ip_address?: string;
  client_user_agent?: string;
  fbp?: string;
  fbc?: string;
};

const PIXEL_ID = "2058751408177806";
const GRAPH_API_VERSION = "v27.0";

function readCookie(request: Request, name: string): string | undefined {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return undefined;

  for (const part of cookieHeader.split(";")) {
    const separator = part.indexOf("=");
    if (separator < 0 || part.slice(0, separator).trim() !== name) continue;
    const value = part.slice(separator + 1).trim();
    return value.length > 0 && value.length <= 500 ? value : undefined;
  }
  return undefined;
}

export async function sendMetaCapiEvent(request: Request, event: MetaEventInput): Promise<"sent" | "not_configured" | "failed"> {
  const accessToken = process.env["META_CAPI_ACCESS_TOKEN"]?.trim();
  if (!accessToken) return "not_configured";

  const userData: MetaUserData = {};
  const clientIp = request.headers.get("cf-connecting-ip")?.trim();
  if (clientIp && isIP(clientIp)) userData.client_ip_address = clientIp;

  const userAgent = request.headers.get("user-agent")?.slice(0, 500);
  if (userAgent) userData.client_user_agent = userAgent;

  const fbp = readCookie(request, "_fbp");
  const fbc = readCookie(request, "_fbc");
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const payload = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        event_source_url: event.eventSourceUrl,
        action_source: "website",
        user_data: userData,
        ...(event.customData ? { custom_data: event.customData } : {}),
      },
    ],
  };

  const endpoint = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events`);
  endpoint.searchParams.set("access_token", accessToken);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
