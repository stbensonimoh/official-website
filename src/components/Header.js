import React, { useState } from "react"
import Logo from "./Logo"
import { Link } from "gatsby"
import { FiX, FiMenu } from "react-icons/fi"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  const menuItems = [
    {
      name: "Home",
      link: "/",
      internal: true,
    },
    {
      name: "About",
      link: "/about",
      internal: true,
    },
    // {
    //   name: "Resume",
    //   link: "/resume",
    //   internal: true,
    // },
    // {
    //   name: "Projects",
    //   link: "/projects",
    //   internal: true,
    // },
    // {
    //   name: "Writing",
    //   link: "/writing",
    //   internal: true,
    // },
    // {
    //   name: "Speaking",
    //   link: "/speaking",
    //   internal: true,
    // },
    {
      name: "Blog",
      link: "/blog",
      internal: true,
    },
    {
      name: "Contact",
      link: "/contact",
      internal: true,
    },
  ]
  return (
    <>
      <div className="hidden header md:flex justify-between items-center my-4">
        <Link to="/" className="logo ml-4">
          <Logo className="w-24" />
        </Link>
        <nav className="main-navigation uppercase text-base font-dosis mr-8">
          {menuItems.map((item, index) =>
            item.internal ? (
              <Link
                key={index}
                to={item.link}
                className="nav-item"
                activeClassName="active-menu-item"
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
        <Logo className="w-24" />
      </div>
      <div
        className={`${
          menuOpen ? "-translate-y-0 fixed" : "-translate-y-full absolute"
        } w-full flex flex-col items-center h-screen bg-white z-[20] py-8 md:hidden transition transform ease-in-out duration-700`}
      >
        <Link to="/" className="logo">
          <Logo className="w-24" />
        </Link>
        <nav className="uppercase text-2xl font-dosis flex flex-col items-center h-1/2 mt-24 justify-between">
          {menuItems.map((item, index) =>
            item.internal ? (
              <Link
                key={index}
                to={item.link}
                className="nav-item"
                activeClassName="active-menu-item"
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

      <button
        className="fixed top-8 right-8 text-3xl z-[21] md:hidden"
        onClick={toggleMenu}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
    </>
  )
}

export default Header
