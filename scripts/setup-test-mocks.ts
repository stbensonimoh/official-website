#!/usr/bin/env bun
// Script to setup test mocks for Next.js font imports

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const fontMockContent = `// Test mock for next/font/google
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
`

const fontGooglePath = join(process.cwd(), 'node_modules', 'next', 'font', 'google', 'index.js')
const backupPath = fontGooglePath + '.original'

try {
  // Check if the font file exists
  if (existsSync(fontGooglePath)) {
    // Create backup if it doesn't exist
    if (!existsSync(backupPath)) {
      const originalContent = readFileSync(fontGooglePath, 'utf8')
      writeFileSync(backupPath, originalContent)
      console.log('✅ Created backup of original next/font/google index.js')
    }
    
    // Write the mock content
    writeFileSync(fontGooglePath, fontMockContent)
    console.log('✅ Applied test mock for next/font/google')
  } else {
    console.log('⚠️  next/font/google/index.js not found, skipping font mock setup')
  }
} catch (error) {
  console.error('❌ Error setting up font mocks:', error instanceof Error ? error.message : String(error))
  process.exit(1)
}
