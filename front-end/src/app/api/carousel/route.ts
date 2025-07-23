import { NextRequest, NextResponse } from "next/server";

// In-memory storage for demo (replace with DB or persistent storage in production)
let carouselImages: { id: string; imageUrl: string }[] = [];

export async function GET() {
  return NextResponse.json(carouselImages);
}

export async function POST(req: NextRequest) {
  const { imageUrl } = await req.json();
  if (!imageUrl || typeof imageUrl !== "string") {
    return NextResponse.json(
      { error: "imageUrl is required" },
      { status: 400 }
    );
  }
  const id = Math.random().toString(36).substr(2, 9);
  carouselImages.push({ id, imageUrl });
  return NextResponse.json({ id, imageUrl });
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  const idx = carouselImages.findIndex((img) => img.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
  carouselImages.splice(idx, 1);
  return NextResponse.json({ success: true });
}
