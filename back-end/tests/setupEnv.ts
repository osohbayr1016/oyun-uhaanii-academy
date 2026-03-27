import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

process.env.NODE_ENV = "test";
process.env.DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://test:test@localhost:5432/test_db";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret-key";

import { initPrisma } from "../src/utils/prisma";

initPrisma(process.env.DATABASE_URL);
