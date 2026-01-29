#!/bin/bash

# Create Test File Script for Next.js App Router
# Usage: ./create-test-file.sh <path-to-source-file> [--colocate]
# 
# By default, creates tests in src/__tests__/ mirroring the source structure.
# Use --colocate for src/lib/ files to place tests alongside the source.
#
# Examples:
#   ./create-test-file.sh src/app/components/Button.tsx
#   → Creates: src/__tests__/components/Button.test.tsx
#
#   ./create-test-file.sh src/lib/posts.ts --colocate
#   → Creates: src/lib/posts.test.ts

set -e

COLOCATE=false

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --colocate|-c)
            COLOCATE=true
            shift
            ;;
        --help|-h)
            echo "Create Test File for Next.js App Router"
            echo ""
            echo "Usage: $0 <path-to-source-file> [options]"
            echo ""
            echo "Options:"
            echo "  -c, --colocate    Place test alongside source file (recommended for src/lib/)"
            echo "  -h, --help        Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0 src/app/components/Button.tsx"
            echo "  $0 src/lib/posts.ts --colocate"
            exit 0
            ;;
        *)
            SOURCE_FILE="$1"
            shift
            ;;
    esac
done

if [ -z "$SOURCE_FILE" ]; then
    echo "❌ Error: Please provide the path to the source file"
    echo "Usage: $0 <path-to-source-file> [--colocate]"
    echo "Run '$0 --help' for more information"
    exit 1
fi

# Check if source file exists
if [ ! -f "$SOURCE_FILE" ]; then
    echo "❌ Error: Source file '$SOURCE_FILE' not found"
    exit 1
fi

# Get the filename and extension
FILENAME=$(basename "$SOURCE_FILE" | sed 's/\.[^.]*$//')
if [[ "$SOURCE_FILE" == *.tsx ]]; then
    EXT="tsx"
else
    EXT="ts"
fi

# Determine test file path
if [ "$COLOCATE" = true ]; then
    # Co-locate test next to source file
    TEST_FILE="${SOURCE_FILE%.*}.test.$EXT"
else
    # Place in src/__tests__/ with mirrored structure
    # Remove 'src/app/' or 'src/' prefix and create in __tests__
    RELATIVE_PATH=$(echo "$SOURCE_FILE" | sed 's|^src/app/||' | sed 's|^src/||')
    RELATIVE_DIR=$(dirname "$RELATIVE_PATH")
    TEST_FILE="src/__tests__/${RELATIVE_DIR}/${FILENAME}.test.$EXT"
    
    # Create directory if needed
    mkdir -p "$(dirname "$TEST_FILE")"
fi

# Check if test file already exists
if [ -f "$TEST_FILE" ]; then
    echo "⚠️  Test file '$TEST_FILE' already exists"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Cancelled"
        exit 0
    fi
fi

echo "📝 Creating test file: $TEST_FILE"

# Determine the import path
if [ "$COLOCATE" = true ]; then
    IMPORT_PATH="./${FILENAME}"
else
    # Calculate relative import or use path alias
    IMPORT_PATH="@/$(echo "$SOURCE_FILE" | sed 's|^src/||' | sed 's|\.[^.]*$||')"
fi

# Determine if it's a component (tsx) or utility (ts)
if [[ "$EXT" == "tsx" ]]; then
    # React component template
    cat > "$TEST_FILE" << EOF
import { describe, test, expect, mock, beforeEach } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import ${FILENAME} from "${IMPORT_PATH}";

// Mock Next.js navigation if needed
mock.module("next/navigation", () => ({
  useRouter: () => ({ push: mock(), back: mock() }),
  usePathname: () => "/",
}));

describe("${FILENAME}", () => {
  beforeEach(() => {
    mock.restore();
  });

  test("renders without crashing", () => {
    render(<${FILENAME} />);
    // TODO: Add specific assertions
    // expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("handles user interaction", () => {
    const handleClick = mock();
    render(<${FILENAME} onClick={handleClick} />);
    
    // TODO: Adjust selector and interaction
    // fireEvent.click(screen.getByRole("button"));
    // expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
EOF
else
    # Utility function template
    cat > "$TEST_FILE" << EOF
import { describe, test, expect, mock, beforeEach } from "bun:test";
// TODO: Import the functions you want to test
// import { myFunction } from "${IMPORT_PATH}";

describe("${FILENAME}", () => {
  beforeEach(() => {
    mock.restore();
  });

  test("should work correctly", () => {
    // TODO: Write your test here
    // const result = myFunction();
    // expect(result).toBe(expected);
    expect(true).toBe(true);
  });

  test("handles edge cases", () => {
    // TODO: Test edge cases
    // expect(myFunction(null)).toBeUndefined();
    // expect(myFunction("")).toBe("");
  });
});
EOF
fi

echo "✅ Created test file: $TEST_FILE"
echo ""
echo "📝 Next steps:"
echo "  1. Open $TEST_FILE"
echo "  2. Update imports and add actual test assertions"
echo "  3. Run 'bun test $TEST_FILE' to execute"
echo ""
