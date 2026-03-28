import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";
import { getBearerFromNextRequest } from "@/lib/serverBearerToken";

export async function GET(req: NextRequest) {
  try {
    const token = getBearerFromNextRequest(req);
    const res = await fetchWithTimeout(`${getApiBaseUrl()}/api/admin/activities`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: token } : {}),
      },
      timeoutMs: 30_000,
    });
    const text = await res.text();
    if (!text.trim()) return NextResponse.json([], { status: res.status });
    try {
      const data = JSON.parse(text) as unknown;
      return NextResponse.json(data, { status: res.status });
    } catch {
      return NextResponse.json([], { status: 502 });
    }
  } catch (e) {
    console.error("Error fetching activities:", e);
    return NextResponse.json([], { status: 500 });
  }
}
