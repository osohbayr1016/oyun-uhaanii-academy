import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../../app/_components/Header";

// Mock the auth context
jest.mock("@/lib/auth", () => ({
  useAuth: () => ({
    user: null,
    isAuthenticated: () => false,
    isAdmin: () => false,
    logout: jest.fn(),
    loading: false,
  }),
}));

describe("Header Component", () => {
  it("renders header with logo and navigation", () => {
    render(<Header />);

    expect(screen.getByText("Oyun Uhaanii Academy")).toBeInTheDocument();
    expect(screen.getByText("Нүүр")).toBeInTheDocument();
    expect(screen.getByText("Сургалтууд")).toBeInTheDocument();
    expect(screen.getByText("Бүтээгдэхүүн")).toBeInTheDocument();
    expect(screen.getByText("Тэмцээн")).toBeInTheDocument();
    expect(screen.getByText("Мэдээ")).toBeInTheDocument();
    expect(screen.getByText("Бидний тухай")).toBeInTheDocument();
  });

  it("shows login button when user is not authenticated", () => {
    render(<Header />);

    expect(screen.getByText("Нэвтрэх")).toBeInTheDocument();
  });

  it("shows user menu when user is authenticated", () => {
    // Mock authenticated user
    jest.doMock("@/lib/auth", () => ({
      useAuth: () => ({
        user: { name: "Test User", email: "test@example.com" },
        isAuthenticated: () => true,
        isAdmin: () => false,
        logout: jest.fn(),
        loading: false,
      }),
    }));

    render(<Header />);

    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("shows admin button when user is admin", () => {
    // Mock admin user
    jest.doMock("@/lib/auth", () => ({
      useAuth: () => ({
        user: { name: "Admin User", email: "admin@example.com" },
        isAuthenticated: () => true,
        isAdmin: () => true,
        logout: jest.fn(),
        loading: false,
      }),
    }));

    render(<Header />);

    expect(screen.getByText("Админ")).toBeInTheDocument();
  });

  it("toggles mobile menu when hamburger button is clicked", () => {
    render(<Header />);

    const hamburgerButton = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(hamburgerButton);

    // Check if mobile menu is visible
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
