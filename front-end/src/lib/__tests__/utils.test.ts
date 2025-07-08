import { cn } from "../utils";

describe("Utility Functions", () => {
  describe("cn function", () => {
    it("should combine class names correctly", () => {
      const result = cn("class1", "class2", "class3");
      expect(result).toBe("class1 class2 class3");
    });

    it("should handle conditional classes", () => {
      const isActive = true;
      const result = cn(
        "base-class",
        isActive && "active-class",
        "always-class"
      );
      expect(result).toBe("base-class active-class always-class");
    });

    it("should handle falsy values", () => {
      const isActive = false;
      const result = cn(
        "base-class",
        isActive && "active-class",
        "always-class"
      );
      expect(result).toBe("base-class always-class");
    });

    it("should handle undefined and null values", () => {
      const result = cn("base-class", undefined, null, "valid-class");
      expect(result).toBe("base-class valid-class");
    });

    it("should handle empty strings", () => {
      const result = cn("base-class", "", "valid-class");
      expect(result).toBe("base-class valid-class");
    });
  });
});
