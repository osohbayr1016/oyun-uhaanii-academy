import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env";

export async function GET(req: NextRequest) {
  const backendUrl = getApiBaseUrl();
  let token = req.headers.get("authorization") || "";
  if (token && !/^bearer /i.test(token)) {
    token = `Bearer ${token}`;
  }
  try {
    const res = await fetch(`${backendUrl}/api/admin/stats`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        `Backend responded with status: ${res.status} - ${errorText}`
      );
      return NextResponse.json(
        { error: `Failed to fetch stats: ${errorText}` },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch stats",
      },
      { status: 500 }
    );
  }
}
