import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function GET() {
  try {
    console.log("Testing backend connection...");
    console.log("API_BASE_URL:", API_BASE_URL);

    // Test basic connectivity
    const response = await fetch(`${API_BASE_URL}/`, {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    });

    return NextResponse.json({
      success: true,
      message: "Backend is accessible",
      apiUrl: API_BASE_URL,
      status: response.status,
      statusText: response.statusText,
    });
  } catch (error) {
    console.error("Backend test failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Backend is not accessible",
        apiUrl: API_BASE_URL,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
