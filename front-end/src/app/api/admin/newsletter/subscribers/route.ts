import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";

export async function GET(request: NextRequest) {
  try {
    const response = await fetchWithTimeout(
      `${getApiBaseUrl()}/api/newsletter/subscribers`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
          Authorization: request.headers.get("Authorization") || "",
        },
        timeoutMs: 30_000,
      }
    );

    const text = await response.text();
    let data: unknown;
    if (text.trim()) {
      try {
        data = JSON.parse(text) as unknown;
      } catch {
        return NextResponse.json(
          { message: "Серверийн хариу буруу байна" },
          { status: 502 }
        );
      }
    } else {
      data = response.ok ? [] : {};
    }

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}
