import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";

const API_BASE_URL = getApiBaseUrl();

export async function GET() {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/carousel`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      timeoutMs: 6000,
    });

    if (!response.ok) {
      console.error(
        `Carousel API error: ${response.status} ${response.statusText}`
      );
      return NextResponse.json(
        { error: "Failed to fetch carousel images" },
        { status: response.status }
      );
    }

    const images = await response.json();
    return NextResponse.json(images);
  } catch (error) {
    console.error("Carousel API fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch carousel images" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const auth = request.headers.get("Authorization") ?? "";
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/carousel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(auth ? { Authorization: auth } : {}),
      },
      body: JSON.stringify(body),
      timeoutMs: 8000,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add carousel image" },
      { status: 500 }
    );
  }
}
