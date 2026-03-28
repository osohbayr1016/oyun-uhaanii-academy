import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";

export async function GET() {
  try {
    const res = await fetchWithTimeout(`${getApiBaseUrl()}/api/products`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      timeoutMs: 30_000,
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("products upstream:", res.status, text.slice(0, 500));
      return NextResponse.json([]);
    }
    if (!text.trim()) {
      return NextResponse.json([]);
    }
    try {
      const data = JSON.parse(text) as unknown;
      return NextResponse.json(Array.isArray(data) ? data : []);
    } catch {
      return NextResponse.json([]);
    }
  } catch (e) {
    console.error("Error fetching products:", e);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const auth = request.headers.get("Authorization") ?? "";
    const response = await fetchWithTimeout(
      `${getApiBaseUrl()}/api/products`,
      {
        method: "POST",
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

    const text = await response.text();
    let parsed: unknown;
    if (text.trim()) {
      try {
        parsed = JSON.parse(text) as unknown;
      } catch {
        return NextResponse.json(
          { error: "Invalid response from API" },
          { status: 502 }
        );
      }
    } else {
      parsed = null;
    }

    if (!response.ok) {
      const msg =
        parsed &&
        typeof parsed === "object" &&
        parsed !== null &&
        "message" in parsed
          ? String((parsed as { message: unknown }).message)
          : "Failed to create product";
      return NextResponse.json({ error: msg }, { status: response.status });
    }

    return NextResponse.json(parsed ?? {}, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create product",
      },
      { status: 500 }
    );
  }
}
