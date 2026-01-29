#!/bin/bash

# Enhanced Bun Test Runner Script
# Usage: ./run-tests.sh [options] [pattern]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Default values
WATCH_MODE=false
COVERAGE=false
VERBOSE=false
BAIL=false
CI_MODE=false
UPDATE_SNAPSHOTS=false
PATTERN=""

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --watch|-w)
            WATCH_MODE=true
            shift
            ;;
        --coverage|-c)
            COVERAGE=true
            shift
            ;;
        --verbose|-v)
            VERBOSE=true
            shift
            ;;
        --bail|-b)
            BAIL=true
            shift
            ;;
        --ci)
            CI_MODE=true
            shift
            ;;
        --update-snapshots|-u)
            UPDATE_SNAPSHOTS=true
            shift
            ;;
        --help|-h)
            echo -e "${CYAN}Bun Test Runner${NC}"
            echo ""
            echo "Usage: $0 [options] [pattern]"
            echo ""
            echo "Options:"
            echo "  -w, --watch             Run tests in watch mode"
            echo "  -c, --coverage          Run tests with coverage"
            echo "  -v, --verbose           Run tests with verbose output"
            echo "  -b, --bail              Stop on first failure"
            echo "  -u, --update-snapshots  Update snapshot files"
            echo "  --ci                    CI mode (quiet output, bail, coverage)"
            echo "  -h, --help              Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0                      # Run all tests"
            echo "  $0 Button               # Run tests matching 'Button'"
            echo "  $0 --watch              # Run all tests in watch mode"
            echo "  $0 --coverage posts     # Run 'posts' tests with coverage"
            echo "  $0 --ci                 # CI mode (for GitHub Actions)"
            exit 0
            ;;
        *)
            PATTERN="$1"
            shift
            ;;
    esac
done

# Build command
CMD="bun test"

# CI mode sets multiple flags
if [ "$CI_MODE" = true ]; then
    export AGENT=1  # Quieter output for CI/agents
    BAIL=true
    COVERAGE=true
fi

if [ "$WATCH_MODE" = true ]; then
    CMD="$CMD --watch"
fi

if [ "$COVERAGE" = true ]; then
    CMD="$CMD --coverage"
fi

if [ "$VERBOSE" = true ]; then
    CMD="$CMD --verbose"
fi

if [ "$BAIL" = true ]; then
    CMD="$CMD --bail"
fi

if [ "$UPDATE_SNAPSHOTS" = true ]; then
    CMD="$CMD --update-snapshots"
fi

if [ -n "$PATTERN" ]; then
    CMD="$CMD $PATTERN"
fi

echo -e "${BLUE}🧪 Running tests...${NC}"
echo -e "${YELLOW}Command: $CMD${NC}"
if [ "$CI_MODE" = true ]; then
    echo -e "${CYAN}Mode: CI (AGENT=1, bail on failure, coverage enabled)${NC}"
fi
echo ""

# Run tests
if $CMD; then
    echo ""
    echo -e "${GREEN}✅ All tests passed!${NC}"
else
    echo ""
    echo -e "${RED}❌ Some tests failed${NC}"
    exit 1
fi
