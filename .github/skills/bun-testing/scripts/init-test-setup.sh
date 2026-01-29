#!/bin/bash

# Initialize Bun Test Setup Script
# This script sets up the necessary configuration files for Bun testing
# with Next.js App Router best practices

set -e

echo "🧪 Setting up Bun testing environment for Next.js..."

# Check if running in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing testing dependencies..."
bun add -d @testing-library/react @testing-library/jest-dom @testing-library/user-event @happy-dom/global-registrator

# Create bunfig.toml if it doesn't exist
if [ ! -f "bunfig.toml" ]; then
    echo "📝 Creating bunfig.toml..."
    cat > bunfig.toml << 'EOF'
[test]
preload = ["./test-setup.ts"]

[test.coverage]
enabled = false
reporter = ["text", "lcov"]
coverageDir = "./coverage"
coverageThreshold = { lines = 70, functions = 70, branches = 70 }
EOF
    echo "✅ Created bunfig.toml"
else
    echo "⚠️  bunfig.toml already exists. Checking for coverage config..."
    if ! grep -q "coverageThreshold" bunfig.toml; then
        echo "📝 Adding coverage configuration to bunfig.toml..."
        cat >> bunfig.toml << 'EOF'

[test.coverage]
enabled = false
reporter = ["text", "lcov"]
coverageDir = "./coverage"
coverageThreshold = { lines = 70, functions = 70, branches = 70 }
EOF
        echo "✅ Added coverage configuration"
    fi
fi

# Create test-setup.ts if it doesn't exist
if [ ! -f "test-setup.ts" ]; then
    echo "📝 Creating test-setup.ts..."
    cat > test-setup.ts << 'EOF'
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { expect, afterEach } from "bun:test";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Register happy-dom globals (window, document, etc.)
GlobalRegistrator.register();

// Add jest-dom matchers
expect.extend(matchers);

// Cleanup after each test to prevent test pollution
afterEach(() => {
  cleanup();
});
EOF
    echo "✅ Created test-setup.ts"
else
    echo "⚠️  test-setup.ts already exists. Skipping..."
fi

# Create src/__tests__ directory structure for Next.js App Router
echo "📁 Creating test directory structure..."
mkdir -p src/__tests__/components
mkdir -p src/__tests__/context
mkdir -p src/__tests__/pages
mkdir -p src/__tests__/integration

# Create a README in the tests directory
if [ ! -f "src/__tests__/README.md" ]; then
    cat > src/__tests__/README.md << 'EOF'
# Tests Directory

This directory contains tests for the Next.js application.

## Structure

```
__tests__/
├── components/     # Tests for React components
├── context/        # Tests for context providers
├── pages/          # Tests for page metadata and static params
└── integration/    # Integration tests
```

## Why this structure?

Next.js App Router uses the file system for routing. Placing test files
alongside page files (e.g., `page.test.tsx` next to `page.tsx`) can cause
routing conflicts.

## Exception

Files in `src/lib/` can have co-located tests since they're not part
of the router.

## Running Tests

```bash
bun test                    # Run all tests
bun test --watch           # Watch mode
bun test --coverage        # With coverage report
bun test Button            # Filter by pattern
```
EOF
    echo "✅ Created src/__tests__/README.md"
fi

# Update package.json with test scripts
echo "📝 Checking package.json scripts..."
if ! grep -q '"test:ci"' package.json; then
    echo "📦 Adding test scripts to package.json..."
    # Use bun to modify package.json
    bun << 'BUN_SCRIPT'
const pkg = JSON.parse(await Bun.file('package.json').text());

pkg.scripts = pkg.scripts || {};
pkg.scripts.test = pkg.scripts.test || 'bun test';
pkg.scripts['test:watch'] = 'bun test --watch';
pkg.scripts['test:coverage'] = 'bun test --coverage';
pkg.scripts['test:ci'] = 'AGENT=1 bun test --bail --coverage';

await Bun.write('package.json', JSON.stringify(pkg, null, 2) + '\n');
console.log('✅ Updated package.json with test scripts');
BUN_SCRIPT
else
    echo "✅ Test scripts already exist in package.json"
fi

# Add coverage directory to .gitignore if not already present
if [ -f ".gitignore" ]; then
    if ! grep -q "^coverage/$" .gitignore; then
        echo "" >> .gitignore
        echo "# Test coverage" >> .gitignore
        echo "coverage/" >> .gitignore
        echo "✅ Added coverage/ to .gitignore"
    fi
fi

echo ""
echo "✅ Bun testing environment setup complete!"
echo ""
echo "📂 Directory structure created:"
echo "   src/__tests__/"
echo "   ├── components/   # React component tests"
echo "   ├── context/      # Context provider tests"
echo "   ├── pages/        # Page metadata tests"
echo "   └── integration/  # Integration tests"
echo ""
echo "🚀 Next steps:"
echo "  1. Run 'bun test' to execute tests"
echo "  2. Create your first test in src/__tests__/components/"
echo "  3. For lib/ utilities, create tests alongside (e.g., src/lib/posts.test.ts)"
echo "  4. See .github/skills/bun-testing/SKILL.md for detailed usage"
echo ""
