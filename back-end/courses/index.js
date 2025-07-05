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
exports.default = handler;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === "POST") {
            const { title, description, image } = req.body;
            try {
                const course = yield prisma.course.create({
                    data: { title, description, image },
                });
                res.status(200).json(course);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to add course" });
            }
        }
        else if (req.method === "GET") {
            const courses = yield prisma.course.findMany();
            res.status(200).json(courses);
        }
    });
}
