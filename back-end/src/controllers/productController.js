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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const prisma_1 = require("../../utils/prisma");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma_1.prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(products);
    }
    catch (error) {
        console.error("Get all products error:", error);
        res.status(500).json({ message: "Failed to fetch products" });
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield prisma_1.prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    }
    catch (error) {
        console.error("Get product by ID error:", error);
        res.status(500).json({ message: "Failed to fetch product" });
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Backend: Received product data:", req.body);
        const { name, price, currency, imageUrl, description, category, stock, materials, dimensions, } = req.body;
        // Validate required fields
        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Product name is required",
            });
        }
        if (!price || isNaN(parseFloat(price))) {
            return res.status(400).json({
                message: "Valid price is required",
            });
        }
        if (!description || !description.trim()) {
            return res.status(400).json({
                message: "Product description is required",
            });
        }
        if (!category || !category.trim()) {
            return res.status(400).json({
                message: "Product category is required",
            });
        }
        const productData = {
            name: name.trim(),
            price: parseFloat(price),
            currency: currency || "MNT",
            imageUrl: imageUrl || "",
            description: description.trim(),
            category: category.trim(),
            stock: parseInt(stock) || 0,
            materials: materials || [],
            dimensions: dimensions || {},
        };
        console.log("Backend: Creating product with data:", productData);
        const product = yield prisma_1.prisma.product.create({
            data: productData,
        });
        console.log("Backend: Product created successfully:", product);
        res.status(201).json(product);
    }
    catch (error) {
        console.error("Backend: Create product error:", error);
        res.status(500).json({
            message: "Failed to create product",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const product = yield prisma_1.prisma.product.update({
            where: { id },
            data: updateData,
        });
        res.json(product);
    }
    catch (error) {
        console.error("Update product error:", error);
        res.status(500).json({ message: "Failed to update product" });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma_1.prisma.product.delete({
            where: { id },
        });
        res.json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("Delete product error:", error);
        res.status(500).json({ message: "Failed to delete product" });
    }
});
exports.deleteProduct = deleteProduct;
