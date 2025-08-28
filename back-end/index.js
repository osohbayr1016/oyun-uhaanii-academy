/* Runtime bootstrap: ensure compiled build exists, then start server */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const distEntry = path.join(__dirname, "dist", "index.js");

if (!fs.existsSync(distEntry)) {
  console.log("⚠️ dist/index.js not found. Running one-time compile...");
  try {
    // Ensure dependencies present (no-op if already installed)
    execSync("npm install --no-audit --no-fund", { stdio: "inherit" });
    // Generate Prisma client if schema exists
    if (fs.existsSync(path.join(__dirname, "prisma", "schema.prisma"))) {
      execSync("npx prisma generate", { stdio: "inherit" });
    }
    // Compile TypeScript
    execSync("npx tsc", { stdio: "inherit" });
  } catch (err) {
    console.error("❌ Auto-compile failed:", err.message);
    process.exit(1);
  }
}

require(distEntry);
