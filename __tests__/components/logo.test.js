/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, screen, fire } from "@testing-library/react"
import Logo from "../../src/components/Logo"

describe("Navigation", () => {
  beforeEach(() => {
    render(<Logo />)
  })

  it("renders the logo on the page", () => {
    const logo = screen.getByTestId("logo")
    expect(screen.getByTestId("logo")).toBeVisible()
  })

  it("has alt text", () => {
    const logo = screen.getByTestId("logo")
    expect(logo).toHaveAttribute("alt", "Benson's Logo")
    expect(screen.getByAltText("Benson's Logo")).toBeVisible()
  })
})
