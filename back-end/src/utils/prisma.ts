import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

let prismaInstance: PrismaClient | null = null;

export function initPrisma(connectionString: string): PrismaClient {
  if (prismaInstance) return prismaInstance;
  const adapter = new PrismaPg({ connectionString });
  prismaInstance = new PrismaClient({ adapter });
  return prismaInstance;
}

export function getPrisma(): PrismaClient {
  if (!prismaInstance) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not set; call initPrisma first");
    }
    return initPrisma(url);
  }
  return prismaInstance;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_t, prop: keyof PrismaClient) {
    return getPrisma()[prop];
  },
}) as PrismaClient;
