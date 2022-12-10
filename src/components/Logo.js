import React from "react"

const Logo = props => {
  return (
    <>
      <img
        src="/logo.svg"
        name="Logo"
        data-testid="logo"
        alt="Benson's Logo"
        {...props}
      />
    </>
  )
}

export default Logo
