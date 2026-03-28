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
      return NextResponse.json(
        { ...EMPTY_STATS, ...data },
        { status: res.status }
      );
    }

    return NextResponse.json({ ...EMPTY_STATS, ...data });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Failed to fetch stats",
        ...EMPTY_STATS,
      },
      { status: 500 }
    );
  }
}
