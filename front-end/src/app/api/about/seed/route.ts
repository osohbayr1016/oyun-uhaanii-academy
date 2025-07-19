import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

    const response = await fetch(`${backendUrl}/api/about/seed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Backend responded with status: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error seeding about page content:", error);
    return NextResponse.json(
      {
        error: `Failed to seed about page content: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
