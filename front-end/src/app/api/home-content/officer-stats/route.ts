import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";

const API_BASE_URL = getApiBaseUrl();

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const auth = request.headers.get("Authorization") ?? "";
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/api/home-content/officer-stats`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(auth ? { Authorization: auth } : {}),
        },
        body: JSON.stringify(body),
        timeoutMs: 15_000,
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return NextResponse.json(err, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating officer sector stats:", error);
    return NextResponse.json(
      { message: "Failed to update officer sector stats" },
      { status: 500 }
    );
  }
}
