import { PrismaClient } from "@prisma/client";

// Warm up sequence: establish DB connection and touch frequently-used queries sequentially
export async function performBackendWarmup(
  prisma: PrismaClient
): Promise<void> {
  const start = Date.now();
  try {
    // 1) Verify DB connectivity
    await prisma.$queryRaw`SELECT 1`;

    // 2) Sequentially warm common lightweight queries to prime Prisma engines and caches
    await prisma.news
      .findMany({ take: 1, orderBy: { createdAt: "desc" } })
      .catch(() => undefined);
    await prisma.product
      .findMany({ take: 1, orderBy: { createdAt: "desc" } })
      .catch(() => undefined);
    await prisma.course
      .findMany({ take: 1, orderBy: { createdAt: "desc" } })
      .catch(() => undefined);
    await prisma.courseCategory.findMany({ take: 1 }).catch(() => undefined);
    await prisma.courseLevel.findMany({ take: 1 }).catch(() => undefined);

    // 3) Any additional tables you want to touch can be added here

    const durationMs = Date.now() - start;
    console.log(`✅ Backend warm-up completed in ${durationMs} ms`);
  } catch (error) {
    const durationMs = Date.now() - start;
    console.error(`⚠️ Backend warm-up failed after ${durationMs} ms`, error);
  }
}
