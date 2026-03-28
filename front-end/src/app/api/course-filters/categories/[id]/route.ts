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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const res = await fetchWithTimeout(
      `${getApiBaseUrl()}/api/course-filters/categories/${encodeURIComponent(id)}`,
      {
        method: "PUT",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: request.headers.get("Authorization") || "",
        },
        body: JSON.stringify(body),
        timeoutMs: 30_000,
      }
    );
    const text = await res.text();
    const parsed = safeParseJson(text);
    if (!res.ok) return NextResponse.json({ error: getMessage(parsed, "Failed to update category") }, { status: res.status });
    return NextResponse.json(parsed ?? {});
  } catch (e) {
    console.error("Error updating category:", e);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const res = await fetchWithTimeout(
      `${getApiBaseUrl()}/api/course-filters/categories/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
        cache: "no-store",
        headers: { Authorization: request.headers.get("Authorization") || "" },
        timeoutMs: 30_000,
      }
    );
    const text = await res.text();
    const parsed = safeParseJson(text);
    if (!res.ok) return NextResponse.json({ error: getMessage(parsed, "Failed to delete category") }, { status: res.status });
    return NextResponse.json(parsed ?? { message: "Category deleted successfully" });
  } catch (e) {
    console.error("Error deleting category:", e);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
