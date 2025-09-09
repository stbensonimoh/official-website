#!/usr/bin/env bun
// Script to setup test mocks for Next.js font imports and Image component

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'

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

const imageMockContent = `// Test mock for next/image
const React = require('react')

function Image(props) {
  const { src, alt, className, style, width, height, priority, ...otherProps } = props
  return React.createElement('img', {
    src,
    alt,
    className,
    style,
    width,
    height,
    ...otherProps
  })
}

module.exports = Image
module.exports.default = Image
`

const fontGooglePath = join(process.cwd(), 'node_modules', 'next', 'font', 'google', 'index.js')
const backupPath = fontGooglePath + '.original'

const imagePath = join(process.cwd(), 'node_modules', 'next', 'image.js')
const imageBackupPath = imagePath + '.original'

try {
  // Setup font mocks
  if (existsSync(fontGooglePath)) {
    if (!existsSync(backupPath)) {
      const originalContent = readFileSync(fontGooglePath, 'utf8')
      writeFileSync(backupPath, originalContent)
      console.log('✅ Created backup of original next/font/google index.js')
    }
    
    writeFileSync(fontGooglePath, fontMockContent)
    console.log('✅ Applied test mock for next/font/google')
  } else {
    console.log('⚠️  next/font/google/index.js not found, skipping font mock setup')
  }

  // Setup image mocks
  if (existsSync(imagePath)) {
    if (!existsSync(imageBackupPath)) {
      const originalContent = readFileSync(imagePath, 'utf8')
      writeFileSync(imageBackupPath, originalContent)
      console.log('✅ Created backup of original next/image.js')
    }
    
    writeFileSync(imagePath, imageMockContent)
    console.log('✅ Applied test mock for next/image')
  } else {
    console.log('⚠️  next/image.js not found, skipping image mock setup')
  }
} catch (error) {
  console.error('❌ Error setting up mocks:', error instanceof Error ? error.message : String(error))
  process.exit(1)
}
