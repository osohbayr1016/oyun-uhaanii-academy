import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { getApiBaseUrl } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const upstream = await fetchWithTimeout(`${getApiBaseUrl()}/api/uploads`, {
      method: "POST",
      headers: {
        Authorization: request.headers.get("Authorization") ?? "",
      },
      body: formData,
      timeoutMs: 120_000,
    });

    const text = await upstream.text();
    let parsed: unknown = null;
    if (text.trim()) {
      try {
        parsed = JSON.parse(text) as unknown;
      } catch {
        return NextResponse.json(
          { message: "Invalid response from upload API" },
          { status: 502 }
        );
      }
    }

    if (!upstream.ok) {
      const msg =
        parsed &&
        typeof parsed === "object" &&
        parsed !== null &&
        "message" in parsed &&
        typeof (parsed as { message: unknown }).message === "string"
          ? (parsed as { message: string }).message
          : "Upload failed";
      return NextResponse.json(
        parsed && typeof parsed === "object"
          ? (parsed as object)
          : { message: msg },
        { status: upstream.status }
      );
    }

    return NextResponse.json(parsed ?? {});
  } catch (e) {
    console.error("Upload proxy:", e);
    return NextResponse.json(
      {
        message:
          e instanceof Error ? e.message : "Failed to proxy upload request",
      },
      { status: 500 }
    );
  }
}
