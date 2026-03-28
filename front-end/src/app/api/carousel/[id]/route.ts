import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env";

const API_BASE_URL = getApiBaseUrl();

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = request.headers.get("Authorization") ?? "";
    const response = await fetch(`${API_BASE_URL}/api/carousel/${id}`, {
      method: "DELETE",
      headers: {
        ...(auth ? { Authorization: auth } : {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to delete carousel image" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error deleting carousel image:", error);
    return NextResponse.json(
      { error: "Failed to delete carousel image" },
      { status: 500 }
    );
  }
}
