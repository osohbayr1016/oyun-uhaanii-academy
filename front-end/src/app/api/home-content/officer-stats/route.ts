import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const auth = request.headers.get("Authorization") ?? "";
    const url = `${getApiBaseUrl()}/api/home-content/officer-stats`;
    const response = await fetchWithTimeout(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(auth ? { Authorization: auth } : {}),
      },
      body: JSON.stringify(body),
      timeoutMs: 30_000,
    });

    const text = await response.text();
    let data: { message?: string } = {};
    try {
      data = text ? (JSON.parse(text) as { message?: string }) : {};
    } catch {
      return NextResponse.json(
        { message: "Invalid response from API" },
        { status: 502 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating officer sector stats:", error);
    return NextResponse.json(
      { message: "Failed to update officer sector stats" },
      { status: 500 }
    );
  }
}
