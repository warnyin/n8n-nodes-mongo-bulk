# Contributing to n8n-nodes-mongo-bulk

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
3. [Development Setup](#development-setup)
4. [Making Changes](#making-changes)
5. [Testing](#testing)
6. [Submitting Changes](#submitting-changes)
7. [Release Process](#release-process)

---

## Code of Conduct

Please be respectful and constructive in all interactions.

---

## How to Contribute

### Reporting Bugs

1. Check [existing issues](https://github.com/thebossza101/n8n-nodes-mongo-bulk/issues) first
2. If not found, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - n8n version, Node.js version, OS
   - Screenshots if applicable

### Suggesting Features

1. Check [existing issues](https://github.com/thebossza101/n8n-nodes-mongo-bulk/issues)
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Pull Requests

We welcome pull requests! Please follow the guidelines below.

---

## Development Setup

### Prerequisites

- Node.js 18+ (recommend 20+)
- npm 9+
- Git
- n8n (for testing)

### Clone the Repository

```bash
git clone https://github.com/thebossza101/n8n-nodes-mongo-bulk.git
cd n8n-nodes-mongo-bulk
```

### Install Dependencies

```bash
npm install
```

### Build the Project

```bash
npm run build
```

### Link for Local Development

```bash
# In this package directory
npm link

# In your n8n installation
cd ~/.n8n
npm link n8n-nodes-mongo-bulk
```

---

## Making Changes

### Project Structure

```
n8n-nodes-mongo-bulk/
├── nodes/
│   └── MongoDbBulk/
│       ├── MongoDbBulk.node.ts    # Main node implementation
│       ├── mongodb.svg             # Node icon
│       └── mongodb-bulk.svg        # Alternative icon
├── credentials/
│   └── MongoDbCredentials.credentials.ts  # Credentials (not used in v1.0.3+)
├── assets/                         # Visual assets
├── dist/                          # Build output (gitignored)
└── .github/workflows/             # CI/CD workflows
```

### Coding Standards

#### TypeScript

- Use TypeScript strict mode
- Follow existing code style
- Use meaningful variable names
- Add JSDoc comments for public APIs

```typescript
/**
 * Performs bulk insert operation
 * @param documents Array of documents to insert
 * @param options Insert options
 * @returns Insert result with inserted IDs
 */
async insertMany(documents: any[], options?: InsertManyOptions): Promise<InsertManyResult> {
  // Implementation
}
```

#### Naming Conventions

- **Files:** `PascalCase.node.ts`, `camelCase.credentials.ts`
- **Classes:** `PascalCase`
- **Functions/Methods:** `camelCase`
- **Variables:** `camelCase`
- **Constants:** `UPPER_SNAKE_CASE`

#### Formatting

```bash
# Format code
npm run format

# Lint code
npm run lint

# Fix linting issues
npm run lintfix
```

### Branch Naming

- **Feature:** `feature/description` (e.g., `feature/add-aggregate-operation`)
- **Bug fix:** `fix/description` (e.g., `fix/connection-timeout`)
- **Documentation:** `docs/description` (e.g., `docs/update-readme`)
- **Refactor:** `refactor/description`

---

## Testing

### Manual Testing in n8n

1. Build and link the package:
   ```bash
   npm run build
   npm link
   ```

2. Start n8n:
   ```bash
   n8n start
   ```

3. Create a test workflow:
   - Add MongoDB Bulk node
   - Configure credentials
   - Test each operation

### Testing Checklist

Before submitting PR, verify:

- [ ] All operations work (Insert Many, Update Many, Delete Many, Find, Bulk Write)
- [ ] Error handling works (invalid credentials, connection failures)
- [ ] Icons display correctly
- [ ] Documentation is updated
- [ ] CHANGELOG.md is updated
- [ ] No console errors
- [ ] Build succeeds: `npm run build`
- [ ] Lint passes: `npm run lint`

---

## Submitting Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Write clean, documented code
- Follow coding standards
- Test thoroughly

### 3. Commit Your Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add aggregate operation support"
git commit -m "fix: resolve connection timeout issue"
git commit -m "docs: update installation guide"
```

**Commit Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks
- `style:` Code style changes

### 4. Push to GitHub

```bash
git push origin feature/your-feature-name
```

### 5. Create Pull Request

1. Go to https://github.com/thebossza101/n8n-nodes-mongo-bulk/pulls
2. Click **New Pull Request**
3. Select your branch
4. Fill in the PR template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally in n8n
- [ ] All operations working
- [ ] Build succeeds
- [ ] Lint passes

## Screenshots (if applicable)
Add screenshots of the feature/fix

## Checklist
- [ ] Code follows project style
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] No breaking changes (or documented if yes)
```

### 6. Wait for Review

- Maintainers will review your PR
- Address any feedback
- CI checks must pass

---

## Release Process

Releases are automated via GitHub Actions.

### For Maintainers

1. **Update Version**
   ```bash
   npm version patch  # 1.0.5 -> 1.0.6
   npm version minor  # 1.0.5 -> 1.1.0
   npm version major  # 1.0.5 -> 2.0.0
   ```

2. **Update CHANGELOG.md**
   ```markdown
   ## [1.0.6] - 2025-11-01

   ### Added
   - New feature

   ### Fixed
   - Bug fix
   ```

3. **Commit and Tag**
   ```bash
   git add package.json package-lock.json CHANGELOG.md
   git commit -m "chore: release v1.0.6"
   git tag -a v1.0.6 -m "Release v1.0.6"
   ```

4. **Push**
   ```bash
   git push origin main
   git push origin v1.0.6
   ```

5. **Watch Automation**
   - GitHub Actions will create a release
   - Package will be published to npm
   - Check: https://github.com/thebossza101/n8n-nodes-mongo-bulk/actions

See [GITHUB-ACTIONS-SETUP.md](./GITHUB-ACTIONS-SETUP.md) for detailed workflow documentation.

---

## Questions?

- Create an [issue](https://github.com/thebossza101/n8n-nodes-mongo-bulk/issues)
- Check [documentation](./README.md)
- Review [examples](./EXAMPLES.md)

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉
