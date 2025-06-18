// Mock for next/font/google to prevent import errors during testing

const mockFont = {
  className: 'mock-font',
  style: { fontFamily: 'mock-font' },
  variable: '--mock-font'
}

export const Roboto = () => mockFont
export const Bebas_Neue = () => mockFont
export const Bad_Script = () => mockFont
export const Dosis = () => mockFont
export const Roboto_Slab = () => mockFont
