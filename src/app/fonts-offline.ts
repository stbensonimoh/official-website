// Offline fonts fallback for build environments with network restrictions
const createMockFont = (variable: string) => ({
  className: 'mock-font',
  style: { fontFamily: 'sans-serif' },
  variable: variable,
});

export const roboto = createMockFont('--font-roboto');
export const bebas = createMockFont('--font-bebas');
export const badscript = createMockFont('--font-badscript');
export const dosis = createMockFont('--font-dosis');
export const slab = createMockFont('--font-slab');