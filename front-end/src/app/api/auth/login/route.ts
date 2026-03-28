import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env";

const LOGIN_TIMEOUT_MS = 25_000;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), LOGIN_TIMEOUT_MS);

    const response = await fetch(
      `${getApiBaseUrl()}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        cache: "no-store",
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);

    const text = await response.text();
    let data: {
      message?: string;
      code?: string;
      token?: string;
      user?: unknown;
    } = {};
    try {
      data = text ? (JSON.parse(text) as typeof data) : {};
    } catch {
      return NextResponse.json(
        {
          error:
            "Authentication server returned an invalid response. Please try again.",
        },
        { status: 502 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.message || "Login failed",
          code: data.code,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Login API error:", error);
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Login request timed out. Please try again." },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
