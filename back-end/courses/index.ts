import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export default async function handler(req: Request, res: Response) {
  if (req.method === "POST") {
    const { title, description, image } = req.body;

    try {
      const course = await prisma.course.create({
        data: { title, description, image },
      });
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: "Failed to add course" });
    }
  } else if (req.method === "GET") {
    const courses = await prisma.course.findMany();
    res.status(200).json(courses);
  }
}
