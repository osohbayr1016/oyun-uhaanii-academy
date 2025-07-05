import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    const response = await fetch(`${backendUrl}/api/tournaments`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    return NextResponse.json(
      { error: "Failed to fetch tournaments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

    console.log("Frontend API: Sending tournament to backend:", body);
    console.log("Backend URL:", backendUrl);

    const response = await fetch(`${backendUrl}/api/tournaments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
      body: JSON.stringify(body),
    });

    console.log("Frontend API: Backend response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Frontend API: Backend error response:", errorText);
      throw new Error(
        `Backend responded with status: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log("Frontend API: Backend success response:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Frontend API: Error creating tournament:", error);
    return NextResponse.json(
      {
        error: `Failed to create tournament: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
