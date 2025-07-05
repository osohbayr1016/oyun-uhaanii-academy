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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../utils/prisma");
const jwt_1 = require("../../utils/jwt");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        // Check if user already exists
        const existingUser = yield prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash password
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        // Create user
        const user = yield prisma_1.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: "user", // Default role
            },
        });
        // Generate token
        const token = (0, jwt_1.generateToken)(user.id);
        res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find user
        const user = yield prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Check password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Generate token
        const token = (0, jwt_1.generateToken)(user.id);
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.login = login;
