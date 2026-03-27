import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendUrl =
      getApiBaseUrl();

    const response = await fetch(`${backendUrl}/api/newsletter/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error sending newsletter:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}
