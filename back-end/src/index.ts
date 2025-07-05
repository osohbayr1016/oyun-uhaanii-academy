import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "./generated/prisma";

// Load environment variables from .env file
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // Fallback for dev, but use .env

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses JSON request bodies

// Import your routes
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import newsRoutes from "./routes/newsRoutes";
import courseRoutes from "./routes/courseRoutes";
import tournamentRoutes from "./routes/tournamentRoutes";
// import errorHandler from './middleware/errorHandler'; // Optional: for centralized error handling

// Route Middlewares
app.use("/api/products", productRoutes); // e.g., /api/products, /api/products/:id
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/tournaments", tournamentRoutes);

// Basic test route
app.get("/", (req, res) => {
  res.send("Backend API is running!");
});

// Global Error Handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  }
);

// Optional: Global Error Handler (put this at the very end of your middleware chain)
// app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `Database URL: ${
      process.env.DATABASE_URL ? "Configured" : "NOT CONFIGURED!"
    }`
  );
});

// Handle graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
