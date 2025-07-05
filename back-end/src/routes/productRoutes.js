"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import {
//   getProducts,
//   getProductById,
//   createProduct,
// } from "./controllers/productController";
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
router.get("/", productController_1.getAllProducts);
router.get("/:id", productController_1.getProductById);
router.post("/", productController_1.createProduct); // Temporarily removed authMiddleware for testing
router.put("/:id", productController_1.updateProduct); // Temporarily removed authMiddleware for testing
router.delete("/:id", productController_1.deleteProduct); // Temporarily removed authMiddleware for testing
exports.default = router;
