import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("FATAL: JWT_SECRET is not set in environment variables.");
  process.exit(1);
}

const validateEmail = (email: string) => /.+@.+\..+/.test(email);
const validatePassword = (password: string) =>
  typeof password === "string" && password.length >= 6;
const validateName = (name: string) =>
  typeof name === "string" && name.trim().length > 0;

const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Input validation
    if (!email || !validateEmail(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }
    if (!password || !validatePassword(password)) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    if (!name || !validateName(name)) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "user",
      },
    });

    // Generate token
    const token = generateToken(user.id);

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    // Handle unique constraint error (duplicate email) from Prisma
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return res.status(400).json({ message: "User already exists" });
    }
    console.error("Registration error:", error, "Request body:", req.body);
    return res
      .status(500)
      .json({ message: "Server error during registration" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !validateEmail(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }
    if (!password || !validatePassword(password)) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user.id);

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
  } catch (error) {
    console.error("Login error:", error, "Request body:", req.body);
    res.status(500).json({ message: "Server error during login" });
  }
};
