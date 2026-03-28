import { NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";

export async function GET() {
  try {
    const res = await fetchWithTimeout(
      `${getApiBaseUrl()}/api/home-content/stats`,
      {
        cache: "no-store",
        headers: { Accept: "application/json" },
        timeoutMs: 30_000,
      }
    );
    const text = await res.text();
    if (!res.ok) {
      console.error("home-content/stats upstream:", res.status, text.slice(0, 400));
      return NextResponse.json({});
    }
    if (!text.trim()) return NextResponse.json({});
    try {
      const data = JSON.parse(text) as unknown;
      return NextResponse.json(
        data && typeof data === "object" && !Array.isArray(data) ? data : {}
      );
    } catch {
      return NextResponse.json({});
    }
  } catch (e) {
    console.error("home-content/stats proxy:", e);
    return NextResponse.json({});
  }
}
