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

export async function GET() {
  try {
    const res = await fetchWithTimeout(`${getApiBaseUrl()}/api/club`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
      timeoutMs: 30_000,
    });
    const text = await res.text();
    if (!res.ok) {
      console.error("club upstream:", res.status, text.slice(0, 400));
      return NextResponse.json({});
    }
    const parsed = safeParseJson(text);
    return NextResponse.json(
      parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {}
    );
  } catch (e) {
    console.error("Error fetching club content:", e);
    return NextResponse.json({});
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetchWithTimeout(`${getApiBaseUrl()}/api/club`, {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
      body: JSON.stringify(body),
      timeoutMs: 30_000,
    });
    const text = await res.text();
    const parsed = safeParseJson(text);
    if (!res.ok) return NextResponse.json({ error: getMessage(parsed, "Failed to update club content") }, { status: res.status });
    return NextResponse.json(parsed ?? {});
  } catch (e) {
    console.error("Error updating club content:", e);
    return NextResponse.json({ error: "Failed to update club content" }, { status: 500 });
  }
}
