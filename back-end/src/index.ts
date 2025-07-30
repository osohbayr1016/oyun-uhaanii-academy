import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// Load environment variables from .env file
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // Fallback for dev, but use .env

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses JSON request bodies

// Import your routes
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import newsRoutes from "./routes/newsRoutes";
import courseRoutes from "./routes/courseRoutes";
import tournamentRoutes from "./routes/tournamentRoutes";
import adminRoutes from "./routes/adminRoutes";
import textContentRoutes from "./routes/textContentRoutes";
import homeContentRoutes from "./routes/homeContentRoutes";
import newsletterRoutes from "./routes/newsletterRoutes";
import aboutRoutes from "./routes/aboutRoutes";
import carouselRoutes from "./routes/carouselRoutes";
import clubRoutes from "./routes/clubRoutes";
// import errorHandler from './middleware/errorHandler'; // Optional: for centralized error handling

// Route Middlewares
app.use("/api/products", productRoutes); // e.g., /api/products, /api/products/:id
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/text-content", textContentRoutes);
app.use("/api/home-content", homeContentRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/carousel", carouselRoutes);
app.use("/api/club", clubRoutes);
// app.use("/api/clubs", clubRoutes);

// Basic test route
app.get("/", (req: Request, res: Response) => {
  res.send("Backend API is running!");
});

// Health check endpoint
app.get("/health", async (req: Request, res: Response) => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(503).json({
      status: "unhealthy",
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });
  }
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Global error handler caught:", {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Handle specific error types
  if (err.name === "PrismaClientKnownRequestError") {
    return res.status(400).json({
      message: "Database operation failed",
      error: "Invalid request to database",
    });
  }

  if (err.name === "PrismaClientUnknownRequestError") {
    return res.status(500).json({
      message: "Database error",
      error: "Unknown database error occurred",
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      error: err.message,
    });
  }

  // Default error response
  res.status(500).json({
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message,
  });
});

// Optional: Global Error Handler (put this at the very end of your middleware chain)
// app.use(errorHandler);

// Start the server only if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(
      `Database URL: ${
        process.env.DATABASE_URL ? "Configured" : "NOT CONFIGURED!"
      }`
    );

    // Test database connection on startup
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log("✅ Database connection successful");
    } catch (error) {
      console.error("❌ Database connection failed:", error);
      console.error("Please check your DATABASE_URL environment variable");
    }
  });
}

// Handle graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

// Handle uncaught exceptions
process.on("uncaughtException", (error: Error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Export for testing
export { app, prisma };
