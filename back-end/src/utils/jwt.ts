import * as jose from "jose";

function getSecretKey(secret: string): Uint8Array {
  return new TextEncoder().encode(secret);
}

export async function signUserToken(
  userId: string,
  secret: string
): Promise<string> {
  return new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(getSecretKey(secret));
}

export async function verifyUserToken(
  token: string,
  secret: string
): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jose.jwtVerify(token, getSecretKey(secret), {
      algorithms: ["HS256"],
    });
    const userId = payload.userId;
    if (typeof userId !== "string") return null;
    return { userId };
  } catch {
    return null;
  }
}
