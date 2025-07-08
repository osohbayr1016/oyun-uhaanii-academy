import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function GET(req: NextRequest) {
  try {
    // Try to get the token from the request headers (SSR) or from cookies (browser)
    let token = req.headers.get("authorization") || "";
    // If not present, try to get from cookies (for browser requests)
    if (!token && req.cookies.has("token")) {
      token = `Bearer ${req.cookies.get("token")?.value}`;
    }
    // If not present, return a clear error
    if (!token) {
      return NextResponse.json(
        { error: "No authorization token provided. Please log in again." },
        { status: 401 }
      );
    }
    if (token && !/^bearer /i.test(token)) {
      token = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Backend responded with status: ${response.status} - ${errorText}`
      );
      return NextResponse.json(
        { error: `Failed to fetch users: ${errorText}` },
        { status: response.status }
      );
    }
    let users = await response.json();
    // Remove the filter, return all users
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch users",
      },
      { status: 500 }
    );
  }
}
