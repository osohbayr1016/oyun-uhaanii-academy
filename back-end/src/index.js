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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = require("./generated/prisma");
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new prisma_1.PrismaClient();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // Fallback for dev, but use .env
// Middleware
app.use((0, cors_1.default)()); // Enables Cross-Origin Resource Sharing
app.use(express_1.default.json()); // Parses JSON request bodies
// Import your routes
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const newsRoutes_1 = __importDefault(require("./routes/newsRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const tournamentRoutes_1 = __importDefault(require("./routes/tournamentRoutes"));
// import errorHandler from './middleware/errorHandler'; // Optional: for centralized error handling
// Route Middlewares
app.use("/api/products", productRoutes_1.default); // e.g., /api/products, /api/products/:id
app.use("/api/auth", authRoutes_1.default);
app.use("/api/news", newsRoutes_1.default);
app.use("/api/courses", courseRoutes_1.default);
app.use("/api/tournaments", tournamentRoutes_1.default);
// Basic test route
app.get("/", (req, res) => {
    res.send("Backend API is running!");
});
// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});
// Optional: Global Error Handler (put this at the very end of your middleware chain)
// app.use(errorHandler);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Database URL: ${process.env.DATABASE_URL ? "Configured" : "NOT CONFIGURED!"}`);
});
// Handle graceful shutdown
process.on("beforeExit", () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
