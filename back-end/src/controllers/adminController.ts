import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAdminStats = async (req: Request, res: Response) => {
  try {
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

    res.json({
      totalUsers,
      totalCourses,
      totalProducts,
      totalTournaments,
      totalNews,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
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
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getRecentActivities = async (req: Request, res: Response) => {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    res.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ message: "Failed to fetch activities" });
  }
};
