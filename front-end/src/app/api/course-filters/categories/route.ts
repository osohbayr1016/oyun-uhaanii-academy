import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env";
import { serverFetchJson } from "@/lib/serverFetchJson";

export async function GET() {
  try {
    const categories = await serverFetchJson<unknown[]>(
      "/api/course-filters/categories",
      { cache: "no-store", timeoutMs: 20_000 }
    );
    return NextResponse.json(Array.isArray(categories) ? categories : []);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");

    const response = await fetch(
      `${getApiBaseUrl()}/api/course-filters/categories`,
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

    const category = await response.json();
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
