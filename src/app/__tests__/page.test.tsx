import { render, screen, within, cleanup } from '@testing-library/react'
import { describe, test, expect, afterEach, beforeEach } from 'bun:test'
import Home from '../page'
import { ThemeProvider } from "@/app/context/ThemeContext"

describe('Home', () => {
  beforeEach(() => {
    // Ensure localStorage is available
    if (typeof localStorage === 'undefined') {
      global.localStorage = {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        length: 0,
        key: () => null,
      }
    }
  })
  
  afterEach(() => {
    cleanup()
  })

  test('renders main content sections', () => {
    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    )
    
    // Check for main heading content
    expect(screen.getByText('Hello!')).toBeTruthy()
    expect(screen.getByText('I am Benson...')).toBeTruthy()
    
    // Find the desktop heading
    const desktopHeading = screen.getByRole('heading', { level: 1 })
    expect(within(desktopHeading).getByText(/Software Engineer/)).toBeTruthy()
    expect(within(desktopHeading).getByText(/DevOps Enthusiast/)).toBeTruthy()
    expect(within(desktopHeading).getByText(/OSS Advocate/)).toBeTruthy()
  })

  test('renders social icons and copyright', () => {
    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    )

    // Find the container for social icons
    const socialIconsContainer = screen.getByTestId('social-icons');

    // Check for links by their href attribute within the container
    expect(within(socialIconsContainer).getByRole('link', { name: /github profile/i }).getAttribute('href')).toBe('https://github.com/stbensonimoh');
    expect(within(socialIconsContainer).getByRole('link', { name: /linkedin profile/i }).getAttribute('href')).toBe('https://linkedin.com/in/stbensonimoh');
    expect(within(socialIconsContainer).getByRole('link', { name: /twitter profile/i }).getAttribute('href')).toBe('https://twitter.com/stbensonimoh');
    expect(within(socialIconsContainer).getByRole('link', { name: /instagram profile/i }).getAttribute('href')).toBe('https://instagram.com/stbensonimoh');

    // Find the copyright container and check its text content
    const copyrightContainer = screen.getByText(/Copyright ©/).closest('div');
    expect(copyrightContainer?.textContent).toContain('Copyright © 2025 Benson Imoh,ST');
  })

  test('renders responsive layouts', () => {
    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    )
    // Desktop layout check
    // Find the paragraph, get its parent div, then the grandparent div which has the responsive classes
    const desktopParagraph = screen.getByText(/I build software and infrastructure/);
    const desktopSectionContainer = desktopParagraph.closest('div')?.parentElement;
    expect(desktopSectionContainer?.classList.contains('hidden')).toBe(true);
    expect(desktopSectionContainer?.classList.contains('md:flex')).toBe(true);


    // Mobile layout check
    // Find the mobile header container directly by its content and structure if possible, or use a test-id if added.
    // For now, let's stick to the text finding approach but ensure the correct element is targeted.
    // The text 'SOFTWARE ENGINEER' is inside a div, which is inside the 'mobile-header' div.
    const mobileTextElement = screen.getByText('SOFTWARE ENGINEER');
    const mobileHeader = mobileTextElement.closest('.mobile-header'); // Find the ancestor with the class
    expect(mobileHeader).toBeTruthy(); // Ensure the header itself is found
    expect(mobileHeader?.classList.contains('mobile-header')).toBe(true);
    expect(mobileHeader?.classList.contains('flex')).toBe(true);
    expect(mobileHeader?.classList.contains('flex-col')).toBe(true);
    expect(mobileHeader?.classList.contains('md:hidden')).toBe(true);
  })
})
