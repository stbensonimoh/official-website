"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiX, FiMenu } from "react-icons/fi";
import { trackNavigation, trackMobileMenu } from "@/lib/clarity";
import FocusTrap from "focus-trap-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = "mobile-navigation-menu";

  const toggleMenu = () => {
    const nextState = !menuOpen;
    trackMobileMenu(nextState ? 'open' : 'close');
    setMenuOpen(nextState);
  };

  const closeMenu = useCallback(() => {
    trackMobileMenu('close');
    setMenuOpen(false);
  }, []);

  // Handle Escape key to close menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, closeMenu]);

  // Prevent body scroll when menu is open, compensate for scrollbar width
  useEffect(() => {
    if (menuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [menuOpen]);

  const menuItems: Array<{
    name: string;
    link: `/${string}` | "/";
    internal: boolean;
  }> = [
    { name: "Home", link: "/", internal: true },
    { name: "About", link: "/about", internal: true },
    { name: "Blog", link: "/blog", internal: true },
    { name: "Contact", link: "/contact", internal: true },
  ];

  const isActive = (link: string) => pathname === link;

  return (
    <>
      <div className="hidden header md:flex justify-between items-center my-4">
        <Link href="/" className="logo ml-4">
          <Logo width={96} height={96} className="w-24" data-testid="desktop-logo" />
        </Link>
        <nav className="main-navigation uppercase text-base font-dosis mr-8" data-testid="desktop-nav">
          {menuItems.map((item, index) =>
            item.internal ? (
              <Link
                key={index}
                href={item.link}
                onClick={() => trackNavigation(item.name)}
                className={`nav-item ${
                  isActive(item.link) ? "active-menu-item" : ""
                }`}
                aria-current={isActive(item.link) ? "page" : undefined}
              >
                {item.name}
              </Link>
            ) : (
              <a key={index} href={item.link} className="nav-item" onClick={() => trackNavigation(item.name)}>
                {item.name}
              </a>
            )
          )}
        </nav>
      </div>
      <div className="flex justify-center absolute top-8 w-full items-center md:hidden">
        <Logo width={96} height={96} className="w-24" data-testid="mobile-logo" aria-label="Benson Imoh,ST" />
      </div>

      {menuOpen && (
        <FocusTrap
          focusTrapOptions={{
            fallbackFocus: `#${menuId}`,
            escapeDeactivates: false,
          }}
        >
          <div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 w-full h-screen bg-background z-[20] py-8 md:hidden flex flex-col items-center"
            tabIndex={-1}
          >
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="absolute top-8 right-8 text-3xl"
              type="button"
            >
              <FiX aria-hidden="true" />
            </button>
            <Link href="/" className="logo" onClick={closeMenu}>
              <Logo width={96} height={96} className="w-24" data-testid="menu-logo" />
            </Link>
            <nav className="uppercase text-2xl font-dosis flex flex-col items-center h-1/2 mt-24 justify-between" data-testid="mobile-nav">
              {menuItems.map((item, index) =>
                item.internal ? (
                  <Link
                    key={index}
                    href={item.link}
                    onClick={() => {
                      trackNavigation(item.name);
                      closeMenu();
                    }}
                    className={`nav-item ${
                      isActive(item.link) ? "active-menu-item" : ""
                    }`}
                    aria-current={isActive(item.link) ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={index}
                    href={item.link}
                    className="nav-item"
                    onClick={() => {
                      trackNavigation(item.name);
                      closeMenu();
                    }}
                  >
                    {item.name}
                  </a>
                )
              )}
            </nav>
          </div>
        </FocusTrap>
      )}

      {!menuOpen && (
        <button
          ref={menuButtonRef}
          className="fixed top-8 right-8 text-3xl z-[21] md:hidden"
          onClick={toggleMenu}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          type="button"
        >
          <FiMenu aria-hidden="true" />
        </button>
      )}
    </>
  );
};

export default Header;
