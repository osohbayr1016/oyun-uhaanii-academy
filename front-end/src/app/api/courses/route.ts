import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env";
import { serverFetchJson } from "@/lib/serverFetchJson";

export async function GET() {
  try {
    const data = await serverFetchJson<unknown[]>("/api/courses", {
      cache: "no-store",
      timeoutMs: 25_000,
    });
    const list = Array.isArray(data) ? data : [];
    return NextResponse.json(list);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch courses",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendUrl =
      getApiBaseUrl();

    // Ensure levels is properly formatted as an array
    const courseData = {
      ...body,
      levels: Array.isArray(body.levels)
        ? body.levels
        : body.levels
        ? [body.levels]
        : [],
    };

    const response = await fetch(`${backendUrl}/api/courses`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message ||
        `Backend responded with status: ${response.status}`;
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create course",
      },
      { status: 500 }
    );
  }
}
