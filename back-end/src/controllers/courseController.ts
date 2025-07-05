import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

// Get all courses
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        enrollments: {
          select: {
            id: true,
            status: true,
          },
        },
        reviews: {
          select: {
            id: true,
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform data to include student count and average rating
    const transformedCourses = courses.map((course) => ({
      ...course,
      studentCount: course.enrollments.length,
      averageRating:
        course.reviews.length > 0
          ? course.reviews.reduce((acc, review) => acc + review.rating, 0) /
            course.reviews.length
          : 0,
    }));

    res.json(transformedCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single course by ID
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        lessons: {
          orderBy: {
            order: "asc",
          },
        },
        materials: true,
      },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new course
export const createCourse = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      content,
      imageUrl,
      price,
      currency = "MNT",
      duration,
      level,
      category,
      instructor,
      maxStudents,
      startDate,
      endDate,
    } = req.body;

    const course = await prisma.course.create({
      data: {
        title,
        description,
        content,
        imageUrl,
        price: parseFloat(price),
        currency,
        duration: parseInt(duration),
        level,
        category,
        instructor,
        maxStudents: maxStudents ? parseInt(maxStudents) : null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update course
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      content,
      imageUrl,
      price,
      currency,
      duration,
      level,
      category,
      instructor,
      maxStudents,
      startDate,
      endDate,
      isActive,
    } = req.body;

    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        title,
        description,
        content,
        imageUrl,
        price: price ? parseFloat(price) : undefined,
        currency,
        duration: duration ? parseInt(duration) : undefined,
        level,
        category,
        instructor,
        maxStudents: maxStudents ? parseInt(maxStudents) : undefined,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    });

    res.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete course
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    await prisma.course.delete({
      where: { id },
    });

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Server error" });
  }
};
