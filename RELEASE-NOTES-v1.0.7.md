# v1.0.7 - Badge Updates & CI Fixes

## 🎉 What's Changed in v1.0.7

### 📊 Badge Updates
- Updated npm badges to use modern format for better caching
- Changed to show **total downloads** metric for comprehensive package statistics
- Improved badge display with npm logo integration

### 🔧 CI/CD Improvements
- **Fixed GitHub Actions CI error** by adding `package-lock.json` to repository
- Removed `package-lock.json` from `.gitignore` for reproducible builds
- CI workflows now run successfully with `npm ci` command

### 🎨 Visual Identity
- Updated `banner.svg` with simplified MongoDB leaf icon matching node design
- PNG icon (1024x1024) properly configured in node interface and README
- Added centered node icon display in README (128x128px)

### 🔒 Security
- Added `SECURITY.md` with security policy and vulnerability reporting process

## 📦 Installation

```bash
npm install n8n-nodes-mongo-bulk
```

## 🔗 Links
- [npm Package](https://www.npmjs.com/package/n8n-nodes-mongo-bulk)
- [Documentation](https://github.com/thebossza101/n8n-nodes-mongo-bulk#readme)
- [Changelog](https://github.com/thebossza101/n8n-nodes-mongo-bulk/blob/main/CHANGELOG.md)

## 📝 Detailed Changes

### Files Modified
- `README.md` - Updated npm badges format and download metric
- `.gitignore` - Removed package-lock.json from ignore list
- `package-lock.json` - Added for reproducible builds (3273 lines)
- `assets/banner.svg` - Updated icon design
- `SECURITY.md` - Added security policy

### Commits in This Release
- `67643bb` - feat: change download badge back to show total downloads
- `323b72e` - feat: change download badge to show 18-month downloads
- `8934630` - fix: update npm badge format to bypass cache
- `fa26c98` - fix: force refresh npm badges cache
- `4119b3d` - fix: add package-lock.json for GitHub Actions CI
- `e8fb78c` - fix: simplify banner icon to match MongoDB leaf with bulk lines design
- `8e1e3d4` - Create SECURITY.md for security policy

**Full Changelog**: https://github.com/thebossza101/n8n-nodes-mongo-bulk/compare/v1.0.6...v1.0.7
