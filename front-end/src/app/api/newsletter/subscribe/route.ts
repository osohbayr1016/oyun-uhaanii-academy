import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Имэйл хаяг шаардлагатай" },
        { status: 400 }
      );
    }

    const res = await fetchWithTimeout(`${getApiBaseUrl()}/api/newsletter/subscribe`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
      timeoutMs: 30_000,
    });

    const text = await res.text();
    if (!text.trim()) {
      return NextResponse.json(
        { message: res.ok ? "Амжилттай" : "Empty response from server" },
        { status: res.status }
      );
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(text) as unknown;
    } catch {
      return NextResponse.json({ message: "Invalid response from API" }, { status: 502 });
    }
    return NextResponse.json(parsed, { status: res.status });
  } catch (e) {
    console.error("Newsletter subscription error:", e);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}
