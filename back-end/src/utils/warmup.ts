import { PrismaClient } from "@prisma/client";

/** Runs after the first response is ready (waitUntil) — verifies the DB connection is warm. */
export async function performBackendWarmup(
  prisma: PrismaClient
): Promise<void> {
  const start = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log(`[warmup] done in ${Date.now() - start}ms`);
  } catch (error) {
    console.error(`[warmup] failed after ${Date.now() - start}ms`, error);
  }
}
