import { getPrisma } from "../utils/prisma";
import type { AppCtx } from "../types/context";
import type { PublicCtx } from "../types/context";

export const getAllCourses = async (c: PublicCtx) => {
  try {
    const prisma = getPrisma();
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { enrollments: true, reviews: true },
        },
      },
    });

    const courseIds = courses.map((row) => row.id);
    const avgRows =
      courseIds.length === 0
        ? []
        : await prisma.review.groupBy({
            by: ["courseId"],
            where: { courseId: { in: courseIds } },
            _avg: { rating: true },
          });

    const avgByCourseId = new Map(
      avgRows
        .filter((r): r is typeof r & { courseId: string } => r.courseId != null)
        .map((r) => [r.courseId, r._avg.rating ?? 0])
    );

    const transformedCourses = courses.map((course) => {
      const { _count, ...rest } = course;
      return {
        ...rest,
        studentCount: _count.enrollments,
        averageRating: avgByCourseId.get(course.id) ?? 0,
      };
    });

    return c.json(transformedCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return c.json([]);
  }
};

export const getCourseById = async (c: PublicCtx) => {
  try {
    const id = c.req.param("id");

    const course = await getPrisma().course.findUnique({
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
      return c.json({ message: "Course not found" }, 404);
    }

    const courseWithDesign = {
      ...course,
      backgroundImage:
        "backgroundImage" in course ? (course as { backgroundImage?: string }).backgroundImage : null,
      youtubeUrl:
        "youtubeUrl" in course ? (course as { youtubeUrl?: string }).youtubeUrl : null,
      subtitle: "subtitle" in course ? (course as { subtitle?: string }).subtitle : "",
    };

    return c.json(courseWithDesign);
  } catch (error) {
    console.error("Error fetching course:", error);
    return c.json({ message: "Server error" }, 500);
  }
};

export const createCourse = async (c: PublicCtx) => {
  try {
    const body = await c.req.json<Record<string, unknown>>();
    const {
      title,
      description,
      content,
      imageUrl,
      price,
      currency = "MNT",
      duration,
      level,
      levels,
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
      courseMaterials,
      enrollLink,
    } = body;

    if (!title || !String(title).trim()) {
      return c.json({ message: "Course title is required" }, 400);
    }
    if (!description || !String(description).trim()) {
      return c.json({ message: "Course description is required" }, 400);
    }
    if (!imageUrl || !String(imageUrl).trim()) {
      return c.json({ message: "Course imageUrl is required" }, 400);
    }

    const course = await getPrisma().course.create({
      data: {
        title: title as string,
        description: description as string,
        content: content as string,
        imageUrl: imageUrl as string,
        price: price ? parseFloat(String(price)) : undefined,
        currency: currency as string,
        duration: duration ? parseInt(String(duration), 10) : undefined,
        level: level as string | undefined,
        levels: Array.isArray(levels)
          ? (levels as string[])
          : levels
            ? [String(levels)]
            : [],
        category: category as string | undefined,
        instructor: instructor as string | undefined,
        maxStudents: maxStudents ? parseInt(String(maxStudents), 10) : null,
        startDate: startDate ? new Date(String(startDate)) : null,
        endDate: endDate ? new Date(String(endDate)) : null,
        youtubeUrl: youtubeUrl as string | undefined,
        heroImage: heroImage as string | undefined,
        backgroundImage: backgroundImage as string | undefined,
        sectionImage: sectionImage as string | undefined,
        sectionText: sectionText as string | undefined,
        goal: goal as string | undefined,
        target: target as string | undefined,
        structure: structure as string | undefined,
        courseMaterials: courseMaterials as string | undefined,
        enrollLink: enrollLink as string | undefined,
      },
    });

    return c.json(course, 201);
  } catch (error) {
    console.error("Error creating course:", error);
    if (process.env.NODE_ENV === "development") {
      return c.json(
        {
          message: "Server error",
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        },
        500
      );
    }
    return c.json({ message: "Server error" }, 500);
  }
};

export const updateCourse = async (c: AppCtx) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json<Record<string, unknown>>();
    const {
      title,
      description,
      content,
      imageUrl,
      price,
      currency,
      duration,
      level,
      levels,
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
      courseMaterials,
      enrollLink,
    } = body;

    const existingCourse = await getPrisma().course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return c.json({ message: "Course not found" }, 404);
    }

    const updatedCourse = await getPrisma().course.update({
      where: { id },
      data: {
        title: title as string | undefined,
        description: description as string | undefined,
        content: content as string | undefined,
        imageUrl: imageUrl as string | undefined,
        price: price ? parseFloat(String(price)) : undefined,
        currency: currency as string | undefined,
        duration: duration ? parseInt(String(duration), 10) : undefined,
        level: level as string | undefined,
        levels: Array.isArray(levels)
          ? (levels as string[])
          : levels
            ? [String(levels)]
            : undefined,
        category: category as string | undefined,
        instructor: instructor as string | undefined,
        maxStudents: maxStudents ? parseInt(String(maxStudents), 10) : undefined,
        startDate: startDate ? new Date(String(startDate)) : undefined,
        endDate: endDate ? new Date(String(endDate)) : undefined,
        isActive: isActive !== undefined ? Boolean(isActive) : undefined,
        backgroundImage: backgroundImage as string | undefined,
        sectionImage: sectionImage as string | undefined,
        sectionText: sectionText as string | undefined,
        youtubeUrl: youtubeUrl as string | undefined,
        heroImage: heroImage as string | undefined,
        goal: goal as string | undefined,
        target: target as string | undefined,
        structure: structure as string | undefined,
        courseMaterials: courseMaterials as string | undefined,
        enrollLink: enrollLink as string | undefined,
      },
    });

    return c.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    return c.json({ message: "Server error" }, 500);
  }
};

export const deleteCourse = async (c: PublicCtx) => {
  try {
    const id = c.req.param("id");

    const existingCourse = await getPrisma().course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return c.json({ message: "Course not found" }, 404);
    }

    await getPrisma().course.delete({
      where: { id },
    });

    return c.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return c.json({ message: "Server error" }, 500);
  }
};
