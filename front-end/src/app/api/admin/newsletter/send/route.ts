import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetchWithTimeout(`${getApiBaseUrl()}/api/newsletter/send`, {
      method: "POST",
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
    if (!text.trim()) {
      return NextResponse.json(
        { message: res.ok ? "Sent" : "Empty response from server" },
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
    console.error("Error sending newsletter:", e);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}
