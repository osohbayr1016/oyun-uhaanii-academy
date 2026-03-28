import { PrismaClient } from "@prisma/client";

/** Runs after the first response is ready (waitUntil) — primes DB + Prisma without blocking the request. */
export async function performBackendWarmup(
  prisma: PrismaClient
): Promise<void> {
  const start = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;

    await prisma.news
      .findMany({ take: 1, orderBy: { createdAt: "desc" } })
      .catch(() => undefined);
    await prisma.product
      .findMany({ take: 1, orderBy: { createdAt: "desc" } })
      .catch(() => undefined);
    await prisma.course
      .findMany({ take: 1, orderBy: { createdAt: "desc" } })
      .catch(() => undefined);
    await prisma.tournament
      .findMany({ take: 1, orderBy: { createdAt: "desc" } })
      .catch(() => undefined);
    await prisma.courseCategory.findMany({ take: 1 }).catch(() => undefined);
    await prisma.courseLevel.findMany({ take: 1 }).catch(() => undefined);

    console.log(`✅ Backend warm-up completed in ${Date.now() - start} ms`);
  } catch (error) {
    console.error(
      `⚠️ Backend warm-up failed after ${Date.now() - start} ms`,
      error
    );
  }
}
