import dotenv from "dotenv";
dotenv.config();

import { initPrisma } from "./utils/prisma";
import { createApp } from "./hono/createApp";

if (process.env.DATABASE_URL) {
  initPrisma(process.env.DATABASE_URL);
}

export const app = createApp();
export { createApp };
export { getPrisma, prisma } from "./utils/prisma";
