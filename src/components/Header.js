import React from "react"
import Logo from "./Logo"
import { Link } from "gatsby"

const Header = () => {
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
    <div className="header flex justify-between items-center my-4">
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
  )
}

export default Header
