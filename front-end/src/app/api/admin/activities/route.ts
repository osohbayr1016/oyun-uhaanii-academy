import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
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
