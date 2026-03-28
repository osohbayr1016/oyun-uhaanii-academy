import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";
import { getBearerFromNextRequest } from "@/lib/serverBearerToken";

export async function GET(req: NextRequest) {
  try {
    const token = getBearerFromNextRequest(req);
    if (!token) {
      return NextResponse.json(
        { error: "No authorization token provided. Please log in again." },
        { status: 401 }
      );
    }
    const res = await fetchWithTimeout(`${getApiBaseUrl()}/api/admin/users`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
      timeoutMs: 30_000,
    });
    const text = await res.text();
    if (!res.ok) {
      console.error("admin/users upstream:", res.status, text.slice(0, 400));
      return NextResponse.json(
        { error: `Failed to fetch users: ${text.slice(0, 200)}` },
        { status: res.status }
      );
    }
    if (!text.trim()) return NextResponse.json([]);
    try {
      const data = JSON.parse(text) as unknown;
      return NextResponse.json(Array.isArray(data) ? data : []);
    } catch {
      return NextResponse.json([]);
    }
  } catch (e) {
    console.error("Error fetching users:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to fetch users" },
      { status: 500 }
    );
  }
}
