import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env";
import { getBearerFromNextRequest } from "@/lib/serverBearerToken";

export async function GET(req: NextRequest) {
  try {
    const token = getBearerFromNextRequest(req);
    if (!token) {
      return NextResponse.json(
        { error: "No authorization token provided. Please log in again." },
        { status: 401 }
      );
    }
    const response = await fetch(`${getApiBaseUrl()}/api/admin/users`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
