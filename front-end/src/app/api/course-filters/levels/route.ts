import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";

export async function GET() {
  try {
    const res = await fetchWithTimeout(
      `${getApiBaseUrl()}/api/course-filters/levels`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        timeoutMs: 30_000,
      }
    );

    const text = await res.text();
    if (!res.ok) {
      console.error("levels upstream:", res.status, text.slice(0, 500));
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
    console.error("Error fetching levels:", e);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");
    const response = await fetchWithTimeout(
      `${getApiBaseUrl()}/api/course-filters/levels`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: token } : {}),
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
      return NextResponse.json(
        parsed && typeof parsed === "object" && parsed !== null
          ? parsed
          : { error: "Failed to create level" },
        { status: response.status }
      );
    }

    return NextResponse.json(parsed ?? {}, { status: 201 });
  } catch (error) {
    console.error("Error creating level:", error);
    return NextResponse.json(
      { error: "Failed to create level" },
      { status: 500 }
    );
  }
}
