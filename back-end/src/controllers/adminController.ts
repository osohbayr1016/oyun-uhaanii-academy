import { getPrisma } from "../utils/prisma";
import type { AppCtx } from "../types/context";

export const getAdminStats = async (c: AppCtx) => {
  try {
    const prisma = getPrisma();
    const [
      totalUsers,
      totalCourses,
      totalProducts,
      totalTournaments,
      totalNews,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.product.count(),
      prisma.tournament.count(),
      prisma.news.count(),
    ]);

    return c.json({
      totalUsers,
      totalCourses,
      totalProducts,
      totalTournaments,
      totalNews,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return c.json({
      totalUsers: 0,
      totalCourses: 0,
      totalProducts: 0,
      totalTournaments: 0,
      totalNews: 0,
    });
  }
};

export const getAllUsers = async (c: AppCtx) => {
  try {
    const users = await getPrisma().user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return c.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return c.json([]);
  }
};

export const getRecentActivities = async (c: AppCtx) => {
  try {
    const activities = await getPrisma().activity.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    return c.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    return c.json([]);
  }
};
