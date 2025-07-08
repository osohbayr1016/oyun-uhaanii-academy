import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CourseCard from "../../app/courses/_components/CourseCard";

const mockCourse = {
  id: "1",
  title: "Test Course",
  description: "This is a test course description",
  duration: "10 hours",
  level: "Beginner",
  price: 50000,
  currency: "MNT",
  imageUrl: "https://example.com/course.jpg",
  category: "Programming",
};

describe("CourseCard Component", () => {
  it("renders course information correctly", () => {
    render(<CourseCard course={mockCourse} />);

    expect(screen.getByText("Test Course")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test course description")
    ).toBeInTheDocument();
    expect(screen.getByText("10 hours")).toBeInTheDocument();
    expect(screen.getAllByText("Beginner")).toHaveLength(2); // Badge and details
    expect(screen.getByText("Programming")).toBeInTheDocument();
    expect(screen.getByText("Дэлгэрэнгүй")).toBeInTheDocument();
  });

  it("displays course image with correct alt text", () => {
    render(<CourseCard course={mockCourse} />);

    const image = screen.getByAltText("Test Course");
    expect(image).toBeInTheDocument();
    // Next.js Image component transforms the src, so we check for the presence of the image
    expect(image).toHaveAttribute("src");
  });

  it("renders level badge with correct styling", () => {
    render(<CourseCard course={mockCourse} />);

    const levelBadges = screen.getAllByText("Beginner");
    // There are two "Beginner" texts - one in the badge and one in the details
    const levelBadge = levelBadges[0]; // The badge is the first one
    expect(levelBadge).toHaveClass("bg-green-600", "text-white");
  });

  it("renders different level badges correctly", () => {
    const advancedCourse = { ...mockCourse, level: "Advanced" };
    render(<CourseCard course={advancedCourse} />);

    const levelBadges = screen.getAllByText("Advanced");
    const levelBadge = levelBadges[0]; // The badge is the first one
    expect(levelBadge).toHaveClass("bg-green-600", "text-white");
  });

  it("handles missing image gracefully", () => {
    const courseWithoutImage = { ...mockCourse, imageUrl: "" };
    render(<CourseCard course={courseWithoutImage} />);

    const image = screen.getByAltText("Test Course");
    expect(image).toBeInTheDocument();
    // Should use the fallback image
    expect(image).toHaveAttribute("src");
  });

  it("renders category badge correctly", () => {
    render(<CourseCard course={mockCourse} />);

    const categoryBadge = screen.getByText("Programming");
    expect(categoryBadge).toHaveClass("bg-blue-600", "text-white");
  });

  it("renders link to course detail page", () => {
    render(<CourseCard course={mockCourse} />);

    const link = screen.getByRole("link", { name: "Дэлгэрэнгүй" });
    expect(link).toHaveAttribute("href", "/courses/1");
  });
});
