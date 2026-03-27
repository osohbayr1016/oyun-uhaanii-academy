import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env";

export async function GET(request: NextRequest) {
  try {
    const backendUrl =
      getApiBaseUrl();
    const response = await fetch(`${backendUrl}/api/newsletter/stats`, {
      headers: {
        Authorization: request.headers.get("Authorization") || "",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching newsletter stats:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}
