import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env";
import { serverFetchJson } from "@/lib/serverFetchJson";

export async function GET() {
  try {
    const levels = await serverFetchJson<unknown[]>(
      "/api/course-filters/levels",
      { cache: "no-store", timeoutMs: 20_000 }
    );
    return NextResponse.json(Array.isArray(levels) ? levels : []);
  } catch (error) {
    console.error("Error fetching levels:", error);
    return NextResponse.json(
      { error: "Failed to fetch levels" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");

    const response = await fetch(
      `${getApiBaseUrl()}/api/course-filters/levels`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const level = await response.json();
    return NextResponse.json(level, { status: 201 });
  } catch (error) {
    console.error("Error creating level:", error);
    return NextResponse.json(
      { error: "Failed to create level" },
      { status: 500 }
    );
  }
}
