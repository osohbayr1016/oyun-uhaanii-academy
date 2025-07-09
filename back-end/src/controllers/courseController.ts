import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

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
    const transformedCourses = courses.map((course: any) => ({
      ...course,
      studentCount: course.enrollments.length,
      averageRating:
        course.reviews.length > 0
          ? course.reviews.reduce(
              (acc: number, review: any) => acc + review.rating,
              0
            ) / course.reviews.length
          : 0,
    }));

    res.json(transformedCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    if (process.env.NODE_ENV === "development") {
      res.status(500).json({
        message: "Server error",
        error: error instanceof Error ? error.stack : error,
      });
    } else {
      res.status(500).json({ message: "Server error" });
    }
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

    // Add extra fields for design (backgroundImage, youtubeUrl, subtitle)
    // If not present in DB, fallback to null or empty string
    const courseWithDesign = {
      ...course,
      backgroundImage:
        "backgroundImage" in course ? (course as any).backgroundImage : null,
      youtubeUrl: "youtubeUrl" in course ? (course as any).youtubeUrl : null,
      subtitle: "subtitle" in course ? (course as any).subtitle : "",
    };

    res.json(courseWithDesign);
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
      youtubeUrl,
      heroImage,
      backgroundImage,
      sectionImage,
      sectionText,
      goal,
      target,
      structure,
      enrollLink,
    } = req.body;

    // Input validation
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Course title is required" });
    }
    if (!description || !description.trim()) {
      return res
        .status(400)
        .json({ message: "Course description is required" });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Course content is required" });
    }
    if (!imageUrl || !imageUrl.trim()) {
      return res.status(400).json({ message: "Course imageUrl is required" });
    }
    if (!price || isNaN(parseFloat(price))) {
      return res
        .status(400)
        .json({ message: "Valid course price is required" });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({ message: "Course category is required" });
    }
    if (!instructor || !instructor.trim()) {
      return res.status(400).json({ message: "Course instructor is required" });
    }
    if (!level || !level.trim()) {
      return res.status(400).json({ message: "Course level is required" });
    }
    if (!duration || isNaN(parseInt(duration))) {
      return res
        .status(400)
        .json({ message: "Valid course duration is required" });
    }

    const course = await prisma.course.create({
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
        maxStudents: maxStudents ? parseInt(maxStudents) : null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        youtubeUrl,
        heroImage,
        backgroundImage,
        sectionImage,
        sectionText,
        goal,
        target,
        structure,
        enrollLink,
      },
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    if (process.env.NODE_ENV === "development") {
      res.status(500).json({
        message: "Server error",
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
    } else {
      res.status(500).json({ message: "Server error" });
    }
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
      backgroundImage,
      sectionImage,
      sectionText,
      youtubeUrl,
      heroImage,
      goal,
      target,
      structure,
      enrollLink,
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
        backgroundImage,
        sectionImage,
        sectionText,
        youtubeUrl,
        heroImage,
        goal,
        target,
        structure,
        enrollLink,
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
