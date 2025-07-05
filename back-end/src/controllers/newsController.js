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
exports.deleteNews = exports.updateNews = exports.createNews = exports.getNewsById = exports.getAllNews = void 0;
const prisma_1 = require("../../utils/prisma");
// Get all news articles
const getAllNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield prisma_1.prisma.news.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                publishedAt: "desc",
            },
        });
        res.json(news);
    }
    catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getAllNews = getAllNews;
// Get single news article by ID
const getNewsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const news = yield prisma_1.prisma.news.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!news) {
            return res.status(404).json({ message: "News article not found" });
        }
        res.json(news);
    }
    catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getNewsById = getNewsById;
// Create new news article
const createNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, content, imageUrl } = req.body;
        const authorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // From auth middleware
        if (!authorId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const news = yield prisma_1.prisma.news.create({
            data: {
                title,
                content,
                imageUrl,
                authorId,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        res.status(201).json(news);
    }
    catch (error) {
        console.error("Error creating news:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.createNews = createNews;
// Update news article
const updateNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { title, content, imageUrl } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Check if news exists and user is author or admin
        const existingNews = yield prisma_1.prisma.news.findUnique({
            where: { id },
            include: { author: true },
        });
        if (!existingNews) {
            return res.status(404).json({ message: "News article not found" });
        }
        // Check if user is author or admin
        const user = yield prisma_1.prisma.user.findUnique({ where: { id: userId } });
        if (existingNews.authorId !== userId && (user === null || user === void 0 ? void 0 : user.role) !== "admin") {
            return res.status(403).json({ message: "Forbidden" });
        }
        const updatedNews = yield prisma_1.prisma.news.update({
            where: { id },
            data: {
                title,
                content,
                imageUrl,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        res.json(updatedNews);
    }
    catch (error) {
        console.error("Error updating news:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateNews = updateNews;
// Delete news article
const deleteNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Check if news exists and user is author or admin
        const existingNews = yield prisma_1.prisma.news.findUnique({
            where: { id },
            include: { author: true },
        });
        if (!existingNews) {
            return res.status(404).json({ message: "News article not found" });
        }
        // Check if user is author or admin
        const user = yield prisma_1.prisma.user.findUnique({ where: { id: userId } });
        if (existingNews.authorId !== userId && (user === null || user === void 0 ? void 0 : user.role) !== "admin") {
            return res.status(403).json({ message: "Forbidden" });
        }
        yield prisma_1.prisma.news.delete({
            where: { id },
        });
        res.json({ message: "News article deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting news:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.deleteNews = deleteNews;
