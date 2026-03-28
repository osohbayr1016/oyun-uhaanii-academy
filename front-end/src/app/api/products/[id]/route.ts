import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env";
import { serverFetchJson } from "@/lib/serverFetchJson";

const API_BASE_URL = getApiBaseUrl();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await serverFetchJson<unknown>(
      `/api/products/${encodeURIComponent(id)}`,
      { cache: "no-store", timeoutMs: 12000 }
    );
    return NextResponse.json(product);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("Fetch failed 404")) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const auth = request.headers.get("Authorization") ?? "";
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(auth ? { Authorization: auth } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update product");
    }

    const product = await response.json();
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update product",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = request.headers.get("Authorization") ?? "";
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        ...(auth ? { Authorization: auth } : {}),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete product");
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete product",
      },
      { status: 500 }
    );
  }
}
