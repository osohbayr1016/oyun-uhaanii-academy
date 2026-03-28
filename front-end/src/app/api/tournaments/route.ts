import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";

export async function GET() {
  try {
    const res = await fetchWithTimeout(`${getApiBaseUrl()}/api/tournaments`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      timeoutMs: 30_000,
    });

    const text = await res.text();
    if (!res.ok) {
      console.error(
        "tournaments upstream:",
        res.status,
        text.slice(0, 500)
      );
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
    console.error("Error fetching tournaments:", e);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetchWithTimeout(
      `${getApiBaseUrl()}/api/tournaments`,
      {
        method: "POST",
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Tournament create failed:", response.status, errorText);
      throw new Error(
        `Backend responded with status: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating tournament:", error);
    return NextResponse.json(
      {
        error: `Failed to create tournament: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
