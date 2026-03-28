import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env";
import { getBearerFromNextRequest } from "@/lib/serverBearerToken";

export async function GET(req: NextRequest) {
  const backendUrl = getApiBaseUrl();
  const token = getBearerFromNextRequest(req);

  const res = await fetch(`${backendUrl}/api/admin/activities`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: token } : {}),
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
