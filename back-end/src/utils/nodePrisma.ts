import dotenv from "dotenv";
import { getPrisma, initPrisma } from "./prisma";

let loaded = false;

/** Prisma + pg adapter for Node scripts (seed, CLI). Not used by the Worker. */
export function getPrismaForNode() {
  if (!loaded) {
    dotenv.config();
    loaded = true;
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is required for Node scripts");
    }
    initPrisma(url);
  }
  return getPrisma();
}
