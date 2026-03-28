import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";

function safeParseJson(text: string): unknown {
  if (!text.trim()) return undefined;
  try { return JSON.parse(text) as unknown; } catch { return undefined; }
}

function getMessage(parsed: unknown, fallback: string): string {
  if (parsed && typeof parsed === "object" && parsed !== null && "message" in parsed) {
    const m = (parsed as { message: unknown }).message;
    if (typeof m === "string") return m;
  }
  return fallback;
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const auth = request.headers.get("Authorization") ?? "";
    const res = await fetchWithTimeout(
      `${getApiBaseUrl()}/api/home-content/officer-stats`,
      {
        method: "PUT",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(auth ? { Authorization: auth } : {}),
        },
        body: JSON.stringify(body),
        timeoutMs: 30_000,
      }
    );
    const text = await res.text();
    const parsed = safeParseJson(text);

    if (!res.ok) {
      console.error("officer-stats PUT upstream:", res.status, text.slice(0, 500));
      return NextResponse.json(
        { message: getMessage(parsed, "Failed to update officer sector stats") },
        { status: res.status }
      );
    }
    return NextResponse.json(parsed ?? {});
  } catch (e) {
    console.error("Error updating officer sector stats:", e);
    return NextResponse.json(
      { message: "Failed to update officer sector stats" },
      { status: 500 }
    );
  }
}
