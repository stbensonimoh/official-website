import { test, expect, describe, mock } from "bun:test";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "./Header";

// Mock Next.js router
mock.module("next/navigation", () => ({
  usePathname: () => "/",
}));

// Mock Clarity tracking
mock.module("@/lib/clarity", () => ({
  trackNavigation: () => {},
  trackMobileMenu: () => {},
}));

// Mock Logo component
mock.module("./Logo", () => ({
  default: ({ width, height, className, "data-testid": dataTestId }: any) => (
    <svg
      width={width}
      height={height}
      className={className}
      data-testid={dataTestId}
      aria-label="Logo"
    >
      <rect width="100%" height="100%" />
    </svg>
  ),
}));

describe("Header Accessibility", () => {
  test("hamburger button has aria-expanded and aria-controls attributes", () => {
    render(<Header />);

    const menuButton = screen.getByLabelText(/open menu/i);
    expect(menuButton.getAttribute("aria-expanded")).toBe("false");
    expect(menuButton.getAttribute("aria-controls")).toBeTruthy();
  });

  test("clicking hamburger button opens menu and sets aria-expanded to true", async () => {
    render(<Header />);

    const menuButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(menuButton.getAttribute("aria-expanded")).toBe("true");
    });

    // Menu should be visible (has mobile-nav testid and is not hidden)
    const mobileNav = screen.getByTestId("mobile-nav");
    expect(mobileNav).toBeTruthy();
  });

  test("pressing Escape closes the menu and returns focus to hamburger button", async () => {
    render(<Header />);

    const menuButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(menuButton);

    // Wait for menu to open
    await waitFor(() => {
      expect(menuButton.getAttribute("aria-expanded")).toBe("true");
    });

    // Press Escape
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    // Menu should be closed
    await waitFor(() => {
      expect(menuButton.getAttribute("aria-expanded")).toBe("false");
    });

    // Focus should return to hamburger button
    expect(document.activeElement).toBe(menuButton);
  });

  test("active nav link has aria-current attribute", () => {
    render(<Header />);

    // Get the desktop nav's active link (the one in desktop-nav)
    const desktopNav = screen.getByTestId("desktop-nav");
    const activeLink = desktopNav.querySelector('[aria-current="page"]');
    expect(activeLink).toBeTruthy();
    expect(activeLink?.textContent).toBe("Home");
  });
});
