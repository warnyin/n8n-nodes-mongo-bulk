# GitHub Actions & npm Trusted Publisher Setup

This guide explains how to set up automated publishing to npm using GitHub Actions and npm's Trusted Publisher feature.

## Table of Contents

1. [Setup npm Trusted Publisher](#setup-npm-trusted-publisher)
2. [Configure GitHub Secrets](#configure-github-secrets)
3. [Create a Release](#create-a-release)
4. [Workflows Explained](#workflows-explained)
5. [Troubleshooting](#troubleshooting)

---

## Setup npm Trusted Publisher

npm's Trusted Publisher feature allows GitHub Actions to publish packages securely without storing npm tokens.

### Step 1: Log in to npm

Visit https://www.npmjs.com and log in with your account (`thebossza101`).

### Step 2: Access Package Settings

1. Go to your package: https://www.npmjs.com/package/n8n-nodes-mongo-bulk
2. Click **Settings** tab

### Step 3: Configure Trusted Publisher (Recommended)

**Option A: Using Provenance (Recommended for npm Trusted Publisher)**

This is the modern, secure way that doesn't require storing tokens:

1. The workflow already includes `--provenance` flag
2. npm will automatically verify the GitHub Actions identity
3. No manual token configuration needed!

**Option B: Using npm Token (Traditional Method)**

If you prefer the traditional method:

1. Generate an **Automation Token** on npm:
   - Go to https://www.npmjs.com/settings/[username]/tokens
   - Click **Generate New Token**
   - Select **Automation**
   - Copy the token

2. Add token to GitHub Secrets:
   - Go to https://github.com/thebossza101/n8n-nodes-mongo-bulk/settings/secrets/actions
   - Click **New repository secret**
   - Name: `NPM_TOKEN`
   - Value: Paste your npm token
   - Click **Add secret**

---

## Configure GitHub Secrets

### Required Secrets

#### NPM_TOKEN

**Only needed if NOT using Trusted Publisher (Option B above)**

```
Name: NPM_TOKEN
Value: npm_xxxxxxxxxxxxxxxxxxxx
```

**How to get:**
1. Go to https://www.npmjs.com/settings/[username]/tokens
2. Click **Generate New Token** > **Automation**
3. Copy the token
4. Add to GitHub Secrets

### Optional Secrets

GitHub automatically provides `GITHUB_TOKEN` for releases, so no additional setup needed!

---

## Create a Release

### Method 1: Automated Release (Recommended)

The workflow triggers automatically when you push a git tag.

#### Step 1: Update Version

```bash
# Update package.json version
npm version patch  # for 1.0.5 -> 1.0.6
# or
npm version minor  # for 1.0.5 -> 1.1.0
# or
npm version major  # for 1.0.5 -> 2.0.0
```

#### Step 2: Update CHANGELOG.md

Add a new section for the version:

```markdown
## [1.0.6] - 2025-10-31

### Added
- New feature description

### Fixed
- Bug fix description
```

#### Step 3: Commit Changes

```bash
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: bump version to 1.0.6"
```

#### Step 4: Create and Push Tag

```bash
# Create tag
git tag -a v1.0.6 -m "Release v1.0.6"

# Push commits and tag
git push origin main
git push origin v1.0.6
```

#### Step 5: Watch Automation

1. Go to https://github.com/thebossza101/n8n-nodes-mongo-bulk/actions
2. Watch the workflows run:
   - **Create Release** - Creates GitHub release
   - **Publish to npm** - Publishes to npm

### Method 2: Manual Release (npm)

If workflows fail, you can publish manually:

```bash
npm run build
npm publish
```

---

## Workflows Explained

### 1. CI Workflow (`.github/workflows/ci.yml`)

**Triggers:** On push to `main` or `develop`, and on pull requests

**What it does:**
- Runs on Node.js 18, 20, and 21
- Installs dependencies
- Lints code
- Builds package
- Verifies build output
- Creates package artifact

**Badge:**
```markdown
[![CI](https://github.com/thebossza101/n8n-nodes-mongo-bulk/actions/workflows/ci.yml/badge.svg)](https://github.com/thebossza101/n8n-nodes-mongo-bulk/actions/workflows/ci.yml)
```

### 2. npm Publish Workflow (`.github/workflows/npm-publish.yml`)

**Triggers:** When a tag matching `v*.*.*` is pushed

**What it does:**
- Checks out code
- Installs dependencies
- Builds package
- Publishes to npm with provenance
- Includes supply chain transparency

**Requirements:**
- Tag must match pattern `v1.0.6`, `v2.3.4`, etc.
- NPM_TOKEN secret (if not using Trusted Publisher)

### 3. Release Workflow (`.github/workflows/release.yml`)

**Triggers:** When a tag matching `v*.*.*` is pushed

**What it does:**
- Creates GitHub Release
- Extracts changelog for the version
- Attaches package tarball
- Marks release as published

---

## Workflow Permissions

The workflows use these permissions:

### npm-publish.yml
```yaml
permissions:
  contents: read      # Read repository contents
  id-token: write     # Required for npm provenance
```

### release.yml
```yaml
permissions:
  contents: write     # Create releases
```

---

## Testing Workflows

### Test CI Locally

```bash
# Install dependencies
npm ci

# Run lint
npm run lint

# Run build
npm run build

# Check output
ls -la dist/nodes/MongoDbBulk/
```

### Test Package Creation

```bash
# Build
npm run build

# Create package
npm pack

# Check contents
tar -tzf n8n-nodes-mongo-bulk-*.tgz
```

---

## Troubleshooting

### Workflow Not Running

**Problem:** Workflow doesn't trigger after pushing tag

**Solutions:**
1. Check tag format matches `v*.*.*` (e.g., `v1.0.6`)
2. Ensure tag was pushed: `git push origin v1.0.6`
3. Check Actions tab for error messages

### npm Publish Fails

**Problem:** `npm ERR! 403 Forbidden`

**Solutions:**
1. Check NPM_TOKEN is valid and not expired
2. Verify token has **Automation** type (not Read-only)
3. Check package name is available on npm
4. Ensure you're the package owner

### Build Fails

**Problem:** Build step fails in workflow

**Solutions:**
1. Test build locally: `npm run build`
2. Check TypeScript errors: `npm run lint`
3. Verify all dependencies are in `package.json`
4. Check Node.js version compatibility

### Provenance Fails

**Problem:** `npm ERR! Provenance generation failed`

**Solutions:**
1. Ensure `id-token: write` permission is set
2. Check npm version supports provenance (7.0.0+)
3. Verify GitHub Actions environment

---

## Security Best Practices

### ✅ DO

- ✅ Use `npm ci` instead of `npm install` in workflows
- ✅ Use `--provenance` flag for supply chain transparency
- ✅ Use Automation tokens (not Classic tokens)
- ✅ Rotate npm tokens regularly
- ✅ Use minimal required permissions
- ✅ Review workflow runs regularly

### ❌ DON'T

- ❌ Commit npm tokens to repository
- ❌ Share npm tokens publicly
- ❌ Use personal access tokens for automation
- ❌ Skip security audits
- ❌ Ignore workflow failures

---

## Adding Workflow Badges

Add these badges to your README.md:

```markdown
[![CI](https://github.com/thebossza101/n8n-nodes-mongo-bulk/actions/workflows/ci.yml/badge.svg)](https://github.com/thebossza101/n8n-nodes-mongo-bulk/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/n8n-nodes-mongo-bulk.svg)](https://www.npmjs.com/package/n8n-nodes-mongo-bulk)
[![npm downloads](https://img.shields.io/npm/dt/n8n-nodes-mongo-bulk.svg)](https://www.npmjs.com/package/n8n-nodes-mongo-bulk)
```

---

## Advanced: Automated Version Bumping

Create a script to automate the release process:

```bash
#!/bin/bash
# release.sh

# Usage: ./release.sh patch|minor|major

RELEASE_TYPE=$1

if [ -z "$RELEASE_TYPE" ]; then
  echo "Usage: ./release.sh patch|minor|major"
  exit 1
fi

# Bump version
npm version $RELEASE_TYPE --no-git-tag-version

# Get new version
NEW_VERSION=$(node -p "require('./package.json').version")

# Update changelog (manual)
echo "Please update CHANGELOG.md for version $NEW_VERSION"
read -p "Press enter when done..."

# Commit
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: release v$NEW_VERSION"

# Tag
git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION"

# Push
git push origin main
git push origin "v$NEW_VERSION"

echo "✅ Release v$NEW_VERSION created!"
echo "Check: https://github.com/thebossza101/n8n-nodes-mongo-bulk/actions"
```

Make it executable:
```bash
chmod +x release.sh
```

Use it:
```bash
./release.sh patch
```

---

## Resources

- [npm Trusted Publishers](https://docs.npmjs.com/generating-provenance-statements)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [npm Provenance](https://github.blog/2023-04-19-introducing-npm-package-provenance/)
- [Semantic Versioning](https://semver.org/)

---

## Support

If you encounter issues:

1. Check [GitHub Actions logs](https://github.com/thebossza101/n8n-nodes-mongo-bulk/actions)
2. Review [npm package status](https://www.npmjs.com/package/n8n-nodes-mongo-bulk)
3. Create an [issue](https://github.com/thebossza101/n8n-nodes-mongo-bulk/issues)

**Created:** 2025-10-31
**Last Updated:** 2025-10-31
