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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const res = await fetchWithTimeout(
      `${getApiBaseUrl()}/api/carousel/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
        cache: "no-store",
        headers: { Authorization: request.headers.get("Authorization") || "" },
        timeoutMs: 30_000,
      }
    );
    const text = await res.text();
    const parsed = safeParseJson(text);
    if (!res.ok) return NextResponse.json({ error: getMessage(parsed, "Failed to delete carousel image") }, { status: res.status });
    return NextResponse.json(parsed ?? { message: "Carousel image deleted successfully" });
  } catch (e) {
    console.error("Error deleting carousel image:", e);
    return NextResponse.json({ error: "Failed to delete carousel image" }, { status: 500 });
  }
}
