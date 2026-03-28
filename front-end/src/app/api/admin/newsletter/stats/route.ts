import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";

const EMPTY_STATS = {
  totalSubscribers: 0,
  totalUnsubscribed: 0,
  thisWeekSubscribers: 0,
};

export async function GET(request: NextRequest) {
  try {
    const response = await fetchWithTimeout(
      `${getApiBaseUrl()}/api/newsletter/stats`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
          Authorization: request.headers.get("Authorization") || "",
        },
        timeoutMs: 30_000,
      }
    );

    const text = await response.text();
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

    if (!response.ok) {
      return NextResponse.json(
        { ...EMPTY_STATS, ...data },
        { status: response.status }
      );
    }

    return NextResponse.json({ ...EMPTY_STATS, ...data });
  } catch (error) {
    console.error("Error fetching newsletter stats:", error);
    return NextResponse.json(
      { message: "Серверийн алдаа", ...EMPTY_STATS },
      { status: 500 }
    );
  }
}
