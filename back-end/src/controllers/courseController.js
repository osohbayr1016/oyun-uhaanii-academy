"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourseById = exports.getAllCourses = void 0;
const prisma_1 = require("../../utils/prisma");
// Get all courses
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield prisma_1.prisma.course.findMany({
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
        const transformedCourses = courses.map((course) => (Object.assign(Object.assign({}, course), { studentCount: course.enrollments.length, averageRating: course.reviews.length > 0
                ? course.reviews.reduce((acc, review) => acc + review.rating, 0) /
                    course.reviews.length
                : 0 })));
        res.json(transformedCourses);
    }
    catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getAllCourses = getAllCourses;
// Get single course by ID
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield prisma_1.prisma.course.findUnique({
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
    }
    catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getCourseById = getCourseById;
// Create new course
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, content, imageUrl, price, currency = "MNT", duration, level, category, instructor, maxStudents, startDate, endDate, } = req.body;
        const course = yield prisma_1.prisma.course.create({
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
    }
    catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.createCourse = createCourse;
// Update course
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, content, imageUrl, price, currency, duration, level, category, instructor, maxStudents, startDate, endDate, isActive, } = req.body;
        const existingCourse = yield prisma_1.prisma.course.findUnique({
            where: { id },
        });
        if (!existingCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        const updatedCourse = yield prisma_1.prisma.course.update({
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
    }
    catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateCourse = updateCourse;
// Delete course
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingCourse = yield prisma_1.prisma.course.findUnique({
            where: { id },
        });
        if (!existingCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        yield prisma_1.prisma.course.delete({
            where: { id },
        });
        res.json({ message: "Course deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.deleteCourse = deleteCourse;
