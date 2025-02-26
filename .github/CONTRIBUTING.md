# Contributing to Benson Imoh's Official Website

Thank you for your interest in contributing to this project! This document provides guidelines and steps for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

- Check if the bug has already been reported in the [Issues](https://github.com/stbensonimoh/official-website/issues)
- If not, create a new issue using the [Bug Report template](https://github.com/stbensonimoh/official-website/issues/new?template=bug_report.md)
- Include as much relevant information as possible and steps to reproduce

### Suggesting Features

- Check if the feature has already been suggested in the [Issues](https://github.com/stbensonimoh/official-website/issues)
- If not, create a new issue using the [Feature Request template](https://github.com/stbensonimoh/official-website/issues/new?template=feature_request.md)
- Describe the feature in detail and why it would be valuable

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Run tests and ensure they pass: `npm run test`
5. Commit your changes using the [conventional commit format](https://www.conventionalcommits.org/)
   - The repository uses a commit template you can enable with:
   - `git config --local commit.template .github/commit-template.txt`
6. Push to your branch (`git push origin feature/your-feature-name`)
7. Open a Pull Request

## Development Setup

1. Clone your fork of the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Coding Standards

- Follow the existing code style
- Write tests for new features
- Keep pull requests focused on a single topic
- Document any new functionality

## Testing

- Run tests before submitting a PR:
  ```bash
  npm run test
  ```
- Add tests for new features

## License

By contributing to this project, you agree that your contributions will be licensed under the project's MIT License.