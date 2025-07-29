import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

// GET /api/club - Get club content
export async function GET() {
  try {
    console.log("Fetching club content from:", `${API_BASE_URL}/api/club`);

    // First, try to check if the backend is accessible
    try {
      const healthCheck = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });
      console.log("Backend health check status:", healthCheck.status);
    } catch (healthError) {
      console.error("Backend health check failed:", healthError);
    }

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_BASE_URL}/api/club`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error response:", errorText);
      throw new Error(
        `Backend responded with status: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log("Club content fetched successfully");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching club content:", error);

    // Check if it's a timeout error
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        {
          success: false,
          message: "Backend request timed out",
          error: "Request timeout after 10 seconds",
          apiUrl: API_BASE_URL,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch club content",
        error: error instanceof Error ? error.message : "Unknown error",
        apiUrl: API_BASE_URL,
      },
      { status: 500 }
    );
  }
}

// PUT /api/club - Update club content
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");

    const response = await fetch(`${API_BASE_URL}/api/club`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Backend responded with status: ${response.status}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating club content:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update club content",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
