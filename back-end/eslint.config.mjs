import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import parserTs from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "src/generated/prisma/**",
      "jest.config.js",
      "scripts/**",
      "*.js", // Ignore root-level JS files
      "tests/**",
      "prisma/seed.ts",
    ],
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": eslintPluginTs,
    },
    rules: {
      // Add your rules here
    },
  },
];
