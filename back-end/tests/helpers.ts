import type { PrismaClient } from "@prisma/client";
import { signUserToken } from "../src/utils/jwt";

export async function createAdminUserWithToken(
  prisma: PrismaClient,
  secret: string
): Promise<{ token: string }> {
  const admin = await prisma.user.create({
    data: {
      name: "Test Admin",
      email: `admin-${Date.now()}-${Math.random().toString(36).slice(2)}@test.com`,
      password: "password123",
      role: "admin",
    },
  });
  const token = await signUserToken(admin.id, secret);
  return { token };
}
