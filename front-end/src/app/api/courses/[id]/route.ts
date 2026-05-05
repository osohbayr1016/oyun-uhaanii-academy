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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = request.headers.get("Authorization") ?? "";
    const res = await fetchWithTimeout(
      `${getApiBaseUrl()}/api/courses/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
          ...(auth ? { Authorization: auth } : {}),
        },
        timeoutMs: 30_000,
      }
    );
    const text = await res.text();
    const parsed = safeParseJson(text);
    if (res.status === 404) return NextResponse.json({ error: "Course not found" }, { status: 404 });
    if (!res.ok) {
      console.error("course[id] upstream:", res.status, text.slice(0, 400));
      return NextResponse.json({ error: getMessage(parsed, "Failed to fetch course") }, { status: res.status });
    }
    return NextResponse.json(parsed ?? {});
  } catch (e) {
    console.error("Error fetching course:", e);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const courseData = {
      ...body,
      levels: Array.isArray(body.levels) ? body.levels : body.levels ? [body.levels] : undefined,
    };
    const res = await fetchWithTimeout(
      `${getApiBaseUrl()}/api/courses/${encodeURIComponent(id)}`,
      {
        method: "PUT",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: request.headers.get("Authorization") || "",
        },
        body: JSON.stringify(courseData),
        timeoutMs: 30_000,
      }
    );
    const text = await res.text();
    const parsed = safeParseJson(text);
    if (!res.ok) return NextResponse.json({ error: getMessage(parsed, "Failed to update course") }, { status: res.status });
    return NextResponse.json(parsed ?? {});
  } catch (e) {
    console.error("Error updating course:", e);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const res = await fetchWithTimeout(
      `${getApiBaseUrl()}/api/courses/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
        cache: "no-store",
        headers: { Authorization: request.headers.get("Authorization") || "" },
        timeoutMs: 30_000,
      }
    );
    const text = await res.text();
    const parsed = safeParseJson(text);
    if (!res.ok) return NextResponse.json({ error: getMessage(parsed, "Failed to delete course") }, { status: res.status });
    return NextResponse.json(parsed ?? { message: "Course deleted successfully" });
  } catch (e) {
    console.error("Error deleting course:", e);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
