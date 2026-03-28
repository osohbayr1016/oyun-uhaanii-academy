import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env";

export async function GET(request: NextRequest) {
  try {
    const backendUrl =
      getApiBaseUrl();
    const response = await fetch(`${backendUrl}/api/tournaments`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
      getApiBaseUrl();

    const response = await fetch(`${backendUrl}/api/tournaments`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Tournament create failed:", response.status, errorText);
      throw new Error(
        `Backend responded with status: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating tournament:", error);
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
