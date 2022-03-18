import React from "react"
import { Link } from "gatsby"

const Button = props => {
  const type = props.type || "button"
  return (
    <>
      {type === "internal" && (
        <Link
          {...props}
          className="button flex items-center border border-bensonpink w-max py-3 px-10 font-dosis uppercase text-xl font-bold text-bensonpink hover:text-white"
        >
          {props.children}
        </Link>
      )}
      {type === "external" && (
        <a
          {...props}
          className="button flex items-center border border-bensonpink w-max py-3 px-10 font-dosis uppercase text-xl font-bold text-bensonpink hover:text-white"
        >
          {props.children}
        </a>
      )}
      {type === "button" && (
        <button
          {...props}
          className="button flex items-center border border-bensonpink w-max py-3 px-10 font-dosis uppercase text-xl font-bold text-bensonpink hover:text-white"
        >
          {" "}
          {props.children}
        </button>
      )}
    </>
  )
}

export default Button
