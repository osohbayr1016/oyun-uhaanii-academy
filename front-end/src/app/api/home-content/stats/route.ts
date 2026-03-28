import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env";

export async function GET() {
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/home-content/stats`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    console.error("home-content/stats proxy:", e);
    return NextResponse.json(
      { message: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
