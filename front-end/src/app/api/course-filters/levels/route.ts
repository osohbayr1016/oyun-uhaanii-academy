import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/course-filters/levels`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch levels");
    }

    const levels = await response.json();
    return NextResponse.json(levels);
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/course-filters/levels`,
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
