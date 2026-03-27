import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env";

export async function GET(req: NextRequest) {
  const backendUrl = getApiBaseUrl();
  let token = req.headers.get("authorization") || "";
  if (token && !/^bearer /i.test(token)) {
    token = `Bearer ${token}`;
  }

  const res = await fetch(`${backendUrl}/api/admin/activities`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: token } : {}),
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
