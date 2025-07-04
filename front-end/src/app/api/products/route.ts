import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/products
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products failed:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST /api/products
// POST /api/products
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Ensure these property names exactly match your schema.prisma
    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
        currency: body.currency,
        imageUrl: body.imageUrl,
        description: body.description,
        category: body.category,
        stock: body.stock,
        materials: body.materials,
        dimensions: body.dimensions, // This should be a plain JS object, e.g., { width: "10cm", height: "5cm", depth: "2cm" }
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("POST /api/products failed:", error);
    return new NextResponse("Failed to create product", { status: 500 });
  }
}
