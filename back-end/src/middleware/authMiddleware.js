"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../../utils/jwt");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        if (!decoded) {
            return res.status(403).json({ message: "Token is not valid" });
        }
        req.user = decoded; // Attach user information to the request
        next();
    }
    catch (error) {
        console.error("Auth middleware error:", error);
        res.status(500).json({ message: "Server error during token verification" });
    }
};
exports.default = authMiddleware;
