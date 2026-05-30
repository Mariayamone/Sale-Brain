import { supabase } from "../utils/supabase";

/** Omnichannel_backend base URL (Messenger OAuth + webhooks). */
const OMNICHANNEL_URL =
  (import.meta.env.VITE_OMNICHANNEL_URL as string | undefined)?.replace(/\/$/, "") ||
  "http://localhost:8000";

async function invokeOmnichannel<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${OMNICHANNEL_URL}${path}`, {
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...(init?.headers || {}),
    },
  });

  let payload: unknown;
  try {
    payload = await res.json();
  } catch {
    payload = {};
  }

  if (!res.ok) {
    const err =
      typeof payload === "object" &&
      payload !== null &&
      "error" in payload &&
      typeof (payload as { error: unknown }).error === "string"
        ? (payload as { error: string }).error
        : `Omnichannel request failed (${res.status})`;
    throw new Error(err);
  }

  if (
    typeof payload === "object" &&
    payload !== null &&
    "error" in payload &&
    (payload as { error?: string }).error
  ) {
    throw new Error((payload as { error: string }).error);
  }

  return payload as T;
}

/** Messenger routes talk to Omnichannel_backend directly (no Supabase deploy needed). */
async function invokeMessengerAction<T>(
  action: string,
  body: Record<string, unknown> = {}
): Promise<T> {
  switch (action) {
    case "messenger/status":
      return invokeOmnichannel<T>("/messenger/status");
    case "messenger/auth-url": {
      const redirectUri = body.redirect_uri ?? body.redirectUri;
      const qs = redirectUri
        ? `?redirect_uri=${encodeURIComponent(String(redirectUri))}`
        : "";
      return invokeOmnichannel<T>(`/messenger/auth-url${qs}`);
    }
    case "messenger/oauth/complete":
      return invokeOmnichannel<T>("/messenger/oauth/complete", {
        method: "POST",
        body: JSON.stringify({
          code: body.code,
          state: body.state,
          redirect_uri: body.redirect_uri ?? body.redirectUri,
        }),
      });
    case "messenger/connect-page":
      return invokeOmnichannel<T>("/messenger/connect-page", {
        method: "POST",
        body: JSON.stringify({
          page_id: body.pageId ?? body.page_id,
        }),
      });
    case "messenger/disconnect":
      return invokeOmnichannel<T>("/messenger/disconnect", { method: "POST" });
    default:
      throw new Error(`Unknown messenger action: ${action}`);
  }
}

export async function invokeApi<T = unknown>(
  action: string,
  body: Record<string, unknown> = {},
  query?: Record<string, string>
): Promise<T> {
  if (action.startsWith("messenger/")) {
    return invokeMessengerAction<T>(action, body);
  }

  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;
  if (!token) throw new Error("Not authenticated");

  const { data, error } = await supabase.functions.invoke("api", {
    body: { action, ...body, ...query },
    headers: { Authorization: `Bearer ${token}` },
  });

  if (error) throw error;

  if (
    data &&
    typeof data === "object" &&
    "error" in data &&
    typeof (data as { error: unknown }).error === "string"
  ) {
    throw new Error((data as { error: string }).error);
  }

  return data as T;
}

export { OMNICHANNEL_URL };
