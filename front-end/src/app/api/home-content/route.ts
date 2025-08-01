import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

// GET /api/home-content
export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/home-content`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(
        `Home content API error: ${response.status} ${response.statusText}`
      );
      return NextResponse.json(
        { error: "Failed to fetch home content" },
        { status: response.status }
      );
    }

    const content = await response.json();
    return NextResponse.json(content);
  } catch (error) {
    console.error("Error fetching home content:", error);
    return NextResponse.json(
      { error: "Failed to fetch home content" },
      { status: 500 }
    );
  }
}

// POST /api/home-content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_BASE_URL}/api/home-content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create home content");
    }

    const content = await response.json();
    return NextResponse.json(content, { status: 201 });
  } catch (error) {
    console.error("Error creating home content:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create home content",
      },
      { status: 500 }
    );
  }
}

// PUT /api/home-content
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_BASE_URL}/api/home-content`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update home content");
    }

    const content = await response.json();
    return NextResponse.json(content);
  } catch (error) {
    console.error("Error updating home content:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update home content",
      },
      { status: 500 }
    );
  }
}
