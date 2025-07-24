import { PrismaClient } from "@prisma/client";

// If you add new models to schema.prisma, run: npx prisma generate
export const prisma = new PrismaClient();
