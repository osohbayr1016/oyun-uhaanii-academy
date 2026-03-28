import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env";

const API_BASE_URL = getApiBaseUrl();

// GET /api/products
export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const auth = request.headers.get("Authorization") ?? "";
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(auth ? { Authorization: auth } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create product");
    }

    const product = await response.json();
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create product",
      },
      { status: 500 }
    );
  }
}
