"use client";
import { useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiX, FiMenu } from "react-icons/fi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
                className={`nav-item ${
                  pathname === item.link ? "active-menu-item" : ""
                }`}
              >
                {item.name}
              </Link>
            ) : (
              <a key={index} href={item.link} className="nav-item">
                {item.name}
              </a>
            )
          )}
        </nav>
      </div>
      <div className="flex justify-center absolute top-8 w-full items-center md:hidden">
        <Logo width={96} height={96} className="w-24" data-testid="mobile-logo" />
      </div>
      <div
        role="banner"
        className={`${
          menuOpen ? "-translate-y-0 fixed" : "-translate-y-full absolute"
        } w-full flex flex-col items-center h-screen bg-background z-[20] py-8 md:hidden transition transform ease-in-out duration-700`}
      >
        <Link href="/" className="logo">
          <Logo width={96} height={96} className="w-24" data-testid="menu-logo" />
        </Link>
        <nav className="uppercase text-2xl font-dosis flex flex-col items-center h-1/2 mt-24 justify-between" data-testid="mobile-nav">
          {menuItems.map((item, index) =>
            item.internal ? (
              <Link
                key={index}
                href={item.link}
                onClick={() => setMenuOpen(false)}
                className={`nav-item ${
                  pathname === item.link ? "active-menu-item" : ""
                }`}
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={index}
                href={item.link}
                className="nav-item"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </a>
            )
          )}
        </nav>
      </div>

      <button
        className="fixed top-8 right-8 text-3xl z-[21] md:hidden"
        onClick={toggleMenu}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
    </>
  );
};

export default Header;
