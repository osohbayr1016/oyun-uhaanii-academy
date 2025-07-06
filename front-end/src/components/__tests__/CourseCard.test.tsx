import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CourseCard from "../../app/courses/_components/CourseCard";

const mockCourse = {
  id: "1",
  title: "Test Course",
  description: "This is a test course description",
  instructor: "Test Instructor",
  duration: "10 hours",
  level: "Beginner",
  price: 50000,
  currency: "MNT",
  imageUrl: "https://example.com/course.jpg",
  category: "Programming",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("CourseCard Component", () => {
  it("renders course information correctly", () => {
    render(<CourseCard course={mockCourse} />);

    expect(screen.getByText("Test Course")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test course description")
    ).toBeInTheDocument();
    expect(screen.getByText("Test Instructor")).toBeInTheDocument();
    expect(screen.getByText("10 hours")).toBeInTheDocument();
    expect(screen.getByText("Beginner")).toBeInTheDocument();
    expect(screen.getByText("50,000 MNT")).toBeInTheDocument();
    expect(screen.getByText("Programming")).toBeInTheDocument();
  });

  it("displays course image with correct alt text", () => {
    render(<CourseCard course={mockCourse} />);

    const image = screen.getByAltText("Test Course");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/course.jpg");
  });

  it("renders level badge with correct styling", () => {
    render(<CourseCard course={mockCourse} />);

    const levelBadge = screen.getByText("Beginner");
    expect(levelBadge).toHaveClass("bg-green-100", "text-green-800");
  });

  it("renders different level badges correctly", () => {
    const advancedCourse = { ...mockCourse, level: "Advanced" };
    render(<CourseCard course={advancedCourse} />);

    const levelBadge = screen.getByText("Advanced");
    expect(levelBadge).toHaveClass("bg-red-100", "text-red-800");
  });

  it("formats price correctly", () => {
    const expensiveCourse = { ...mockCourse, price: 150000 };
    render(<CourseCard course={expensiveCourse} />);

    expect(screen.getByText("150,000 MNT")).toBeInTheDocument();
  });

  it("handles missing image gracefully", () => {
    const courseWithoutImage = { ...mockCourse, imageUrl: null };
    render(<CourseCard course={courseWithoutImage} />);

    const image = screen.getByAltText("Test Course");
    expect(image).toHaveAttribute("src", "/placeholder-course.jpg");
  });
});
