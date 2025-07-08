import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../../app/_components/Header";

// Mock the auth context
const mockUseAuth = jest.fn();

jest.mock("../../lib/auth", () => ({
  useAuth: () => mockUseAuth(),
}));

describe("Header Component", () => {
  beforeEach(() => {
    mockUseAuth.mockClear();
  });

  it("renders header with navigation", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: () => false,
      isAdmin: () => false,
      logout: jest.fn(),
      loading: false,
    });

    render(<Header />);

    expect(screen.getByText("Нүүр")).toBeInTheDocument();
    expect(screen.getByText("Сургалтууд")).toBeInTheDocument();
    expect(screen.getByText("Бүтээгдэхүүн")).toBeInTheDocument();
    expect(screen.getByText("Тэмцээнүүд")).toBeInTheDocument();
    expect(screen.getByText("Мэдээ")).toBeInTheDocument();
    expect(screen.getByText("Бидний тухай")).toBeInTheDocument();
  });

  it("shows login button when user is not authenticated", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: () => false,
      isAdmin: () => false,
      logout: jest.fn(),
      loading: false,
    });

    render(<Header />);

    expect(screen.getByText("Нэвтрэх")).toBeInTheDocument();
  });

  it("shows user menu when user is authenticated", () => {
    mockUseAuth.mockReturnValue({
      user: { name: "Test User", email: "test@example.com" },
      isAuthenticated: () => true,
      isAdmin: () => false,
      logout: jest.fn(),
      loading: false,
    });

    render(<Header />);

    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("shows admin button when user is admin", () => {
    mockUseAuth.mockReturnValue({
      user: { name: "Admin User", email: "admin@example.com", role: "admin" },
      isAuthenticated: () => true,
      isAdmin: () => true,
      logout: jest.fn(),
      loading: false,
    });

    render(<Header />);

    expect(screen.getByText("Go to Admin Page")).toBeInTheDocument();
  });

  it("has mobile menu button", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: () => false,
      isAdmin: () => false,
      logout: jest.fn(),
      loading: false,
    });

    render(<Header />);

    const hamburgerButton = screen.getByRole("button");
    expect(hamburgerButton).toBeInTheDocument();
  });
});
