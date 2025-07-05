import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

// Extend the Express Request interface to include a 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string }; // Add user property
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = decoded; // Attach user information to the request
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Server error during token verification" });
  }
};

export default authMiddleware;
