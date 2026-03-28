import { getPrisma } from "./prisma";

let dbConnected = false;
let inflight: Promise<void> | null = null;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Cloudflare Worker cold start: Prisma + pg + Hyperdrive need a stable connection
 * before route handlers run. This gates all requests until $connect + SELECT 1 succeed,
 * with retries (single-flight for concurrent first requests on the same isolate).
 */
export async function ensureDatabaseReady(): Promise<void> {
  if (dbConnected) return;
  if (!inflight) {
    inflight = (async () => {
      const prisma = getPrisma();
      const maxAttempts = 8;
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          await prisma.$connect();
          await prisma.$queryRaw`SELECT 1`;
          dbConnected = true;
          return;
        } catch (e) {
          console.error(`[dbReady] connect attempt ${attempt}/${maxAttempts}`, e);
          if (attempt === maxAttempts) throw e;
          await sleep(200 * attempt);
        }
      }
    })().finally(() => {
      inflight = null;
    });
  }
  await inflight;
}
