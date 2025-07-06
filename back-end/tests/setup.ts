import dotenv from "dotenv";

// Load test environment variables
dotenv.config({ path: ".env.test" });

// Set test environment
process.env.NODE_ENV = "test";
process.env.DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://test:test@localhost:5432/test_db";
process.env.JWT_SECRET = "test-secret-key";

// Global test timeout
jest.setTimeout(10000);

// Clean up after each test
afterEach(async () => {
  // Add any cleanup logic here
});
