import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";
import { getBearerFromNextRequest } from "@/lib/serverBearerToken";

const EMPTY_STATS = {
  totalUsers: 0,
  totalCourses: 0,
  totalProducts: 0,
  totalTournaments: 0,
  totalNews: 0,
};

function readMessage(data: Record<string, unknown>): string | undefined {
  const m = data.message;
  return typeof m === "string" && m.trim() ? m : undefined;
}

export async function GET(req: NextRequest) {
  const token = getBearerFromNextRequest(req);
  try {
    const res = await fetchWithTimeout(`${getApiBaseUrl()}/api/admin/stats`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
      timeoutMs: 30_000,
    });

    const text = await res.text();
    let data: Record<string, unknown> = {};
    if (text.trim()) {
      try {
        data = JSON.parse(text) as Record<string, unknown>;
      } catch {
        return NextResponse.json(
          { message: "Серверийн хариу буруу байна", ...EMPTY_STATS },
          { status: 502 }
        );
      }
    }

    if (!res.ok) {
      const msg = readMessage(data) ?? "Серверийн алдаа";
      if (res.status === 401 || res.status === 403) {
        return NextResponse.json({ message: msg }, { status: res.status });
      }
      if (res.status >= 400 && res.status < 500) {
        return NextResponse.json({ message: msg }, { status: res.status });
      }
      console.error("admin stats upstream:", res.status, text.slice(0, 400));
      return NextResponse.json({ ...EMPTY_STATS });
    }

    return NextResponse.json({ ...EMPTY_STATS, ...data });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ ...EMPTY_STATS });
  }
}
