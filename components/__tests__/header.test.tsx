import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../header";

describe("Header responsive behavior", () => {
  test("renders desktop nav with CSS-driven class", () => {
    render(<Header />);
    const desktopNav = screen.getByRole("navigation", { name: /Primary/i });
    expect(desktopNav).toBeInTheDocument();
    expect(desktopNav.className).toContain("nav-desktop");
  });

  test("renders mobile toggle with CSS-driven class", () => {
    render(<Header />);
    const mobileToggle = screen.getByRole("button", { name: /Toggle navigation menu/i });
    expect(mobileToggle).toBeInTheDocument();
    expect(mobileToggle.className).toContain("mobile-toggle");
  });
});