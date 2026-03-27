import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Имэйл хаяг шаардлагатай" },
        { status: 400 }
      );
    }

    const backendUrl =
      getApiBaseUrl();
    const response = await fetch(`${backendUrl}/api/newsletter/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}
