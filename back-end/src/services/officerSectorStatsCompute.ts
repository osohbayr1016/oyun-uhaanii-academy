import { getPrisma } from "../utils/prisma";

export async function yearsOperating(): Promise<number> {
  const prisma = getPrisma();
  const [course, user] = await Promise.all([
    prisma.course.findFirst({
      orderBy: { createdAt: "asc" },
      select: { createdAt: true },
    }),
    prisma.user.findFirst({
      orderBy: { createdAt: "asc" },
      select: { createdAt: true },
    }),
  ]);
  const dates = [course?.createdAt, user?.createdAt].filter(Boolean) as Date[];
  if (dates.length === 0) return 0;
  const minYear = Math.min(...dates.map((d) => d.getFullYear()));
  return Math.max(0, new Date().getFullYear() - minYear);
}

export type StatFields = {
  courses: number;
  tournaments: number;
  enrollments: number;
  teachers: number;
  products: number;
  years: number;
};

export async function computeAggregates(): Promise<StatFields> {
  const prisma = getPrisma();
  const [courses, tournaments, enrollments, teachers, products, years] =
    await Promise.all([
      prisma.course.count(),
      prisma.tournament.count(),
      prisma.enrollment.count(),
      prisma.user.count({
        where: {
          OR: [
            { role: { equals: "instructor", mode: "insensitive" } },
            { role: { equals: "admin", mode: "insensitive" } },
          ],
        },
      }),
      prisma.product.count(),
      yearsOperating(),
    ]);
  return {
    courses,
    tournaments,
    enrollments,
    teachers,
    products,
    years,
  };
}
