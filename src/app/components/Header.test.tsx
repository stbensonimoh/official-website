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
  default: ({ width, height, className, "data-testid": dataTestId, "aria-label": ariaLabel }: any) => (
    <svg
      width={width}
      height={height}
      className={className}
      data-testid={dataTestId}
      aria-label={ariaLabel || "Logo"}
    >
      <rect width="100%" height="100%" />
    </svg>
  ),
}));

const openMenu = () => {
  const button = screen.getByLabelText("Open menu");
  fireEvent.click(button);
};

const getFocusableElements = (container: Element) =>
  container.querySelectorAll(
    'a[href], button:not([disabled]), input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
  );

describe("Header Accessibility", () => {
  test("hamburger button has aria-expanded and aria-controls", () => {
    render(<Header />);

    const menuButton = screen.getByLabelText("Open menu");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(menuButton).toHaveAttribute("aria-controls", "mobile-navigation-menu");
  });

  test("clicking hamburger button opens menu and sets aria-expanded to true", async () => {
    render(<Header />);

    const menuButton = screen.getByLabelText("Open menu");
    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "true");
    });

    // Menu should be visible
    const mobileNav = screen.getByTestId("mobile-nav");
    expect(mobileNav).toBeInTheDocument();
  });

  test("close button is inside the focus trap dialog", async () => {
    render(<Header />);
    openMenu();

    await waitFor(() => {
      expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
    });

    // The close button should be inside the dialog, not outside it
    const dialog = screen.getByRole("dialog");
    const closeButton = screen.getByLabelText("Close menu");
    expect(dialog.contains(closeButton)).toBe(true);
  });

  test("Tab cycling stays within the mobile menu when open", async () => {
    render(<Header />);
    openMenu();

    await waitFor(() => {
      expect(screen.getByTestId("mobile-nav")).toBeInTheDocument();
    });

    const mobileNav = screen.getByTestId("mobile-nav");
    const dialog = screen.getByRole("dialog");
    const focusableElements = getFocusableElements(dialog);
    expect(focusableElements.length).toBeGreaterThan(0);

    // Focus the last element and Tab forward — should stay inside dialog
    const last = focusableElements[focusableElements.length - 1] as HTMLElement;
    last.focus();
    fireEvent.keyDown(last, { key: "Tab", code: "Tab" });

    const activeAfterTab = document.activeElement;
    expect(dialog.contains(activeAfterTab)).toBe(true);
  });

  test("pressing Escape closes the menu", async () => {
    render(<Header />);
    openMenu();

    await waitFor(() => {
      expect(screen.getByTestId("mobile-nav")).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    await waitFor(() => {
      const menuButton = screen.getByLabelText("Open menu");
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
    });
  });

  test("body scroll is locked when menu is open", async () => {
    render(<Header />);
    expect(document.body.style.overflow).toBe("");

    openMenu();

    await waitFor(() => {
      expect(document.body.style.overflow).toBe("hidden");
    });
  });

  test("body scroll is restored when menu closes", async () => {
    render(<Header />);
    openMenu();

    await waitFor(() => {
      expect(document.body.style.overflow).toBe("hidden");
    });

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    await waitFor(() => {
      expect(document.body.style.overflow).toBe("");
    });
  });

  test("active nav link has aria-current attribute", () => {
    render(<Header />);

    const desktopNav = screen.getByTestId("desktop-nav");
    const activeLink = desktopNav.querySelector('[aria-current="page"]');
    expect(activeLink).toBeTruthy();
    expect(activeLink?.textContent).toBe("Home");
  });
});
