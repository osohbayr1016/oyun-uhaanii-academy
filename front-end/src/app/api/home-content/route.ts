import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";

function safeJsonParse(text: string): unknown {
  if (!text.trim()) return undefined;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return undefined;
  }
}

function asHomeContentRecord(data: unknown): Record<string, string> {
  if (!data || typeof data !== "object" || Array.isArray(data)) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
    if (typeof v === "string") out[k] = v;
  }
  return out;
}

// GET /api/home-content
export async function GET() {
  try {
    const response = await fetchWithTimeout(
      `${getApiBaseUrl()}/api/home-content`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        timeoutMs: 25_000,
      }
    );

    const text = await response.text();
    if (!response.ok) {
      console.error(
        "Home content API upstream:",
        response.status,
        text.slice(0, 400)
      );
      return NextResponse.json({});
    }

    const parsed = safeJsonParse(text);
    return NextResponse.json(asHomeContentRecord(parsed));
  } catch (error) {
    console.error("Error fetching home content:", error);
    return NextResponse.json({});
  }
}

// POST /api/home-content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const auth = request.headers.get("Authorization") ?? "";
    const response = await fetchWithTimeout(
      `${getApiBaseUrl()}/api/home-content`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(auth ? { Authorization: auth } : {}),
        },
        body: JSON.stringify(body),
        timeoutMs: 30_000,
      }
    );

    const text = await response.text();
    const parsed = safeJsonParse(text);

    if (!response.ok) {
      const msg =
        parsed &&
        typeof parsed === "object" &&
        parsed !== null &&
        "message" in parsed
          ? String((parsed as { message: unknown }).message)
          : "Failed to create home content";
      return NextResponse.json({ error: msg }, { status: response.status });
    }

    return NextResponse.json(parsed ?? {}, { status: 201 });
  } catch (error) {
    console.error("Error creating home content:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create home content",
      },
      { status: 500 }
    );
  }
}

// PUT /api/home-content
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const auth = request.headers.get("Authorization") ?? "";
    const response = await fetchWithTimeout(
      `${getApiBaseUrl()}/api/home-content`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(auth ? { Authorization: auth } : {}),
        },
        body: JSON.stringify(body),
        timeoutMs: 30_000,
      }
    );

    const text = await response.text();
    const parsed = safeJsonParse(text);

    if (!response.ok) {
      const msg =
        parsed &&
        typeof parsed === "object" &&
        parsed !== null &&
        "message" in parsed
          ? String((parsed as { message: unknown }).message)
          : "Failed to update home content";
      return NextResponse.json({ error: msg }, { status: response.status });
    }

    return NextResponse.json(parsed ?? []);
  } catch (error) {
    console.error("Error updating home content:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update home content",
      },
      { status: 500 }
    );
  }
}
