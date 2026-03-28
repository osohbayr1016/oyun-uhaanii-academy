import type { NextRequest } from "next/server";

/** Authorization header or `token` cookie (for BFF routes). */
export function getBearerFromNextRequest(req: NextRequest): string {
  let token = req.headers.get("authorization") || "";
  if (!token && req.cookies.has("token")) {
    const v = req.cookies.get("token")?.value;
    if (v) token = `Bearer ${v}`;
  }
  if (token && !/^bearer /i.test(token)) {
    token = `Bearer ${token}`;
  }
  return token;
}
