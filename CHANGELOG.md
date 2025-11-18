# Changelog

All notable changes to this project will be documented in this file.

## [1.0.14] - 2025-11-18

### Added
- ⚙️ **Convert _id to ObjectId Option**: Added option to disable automatic _id to ObjectId conversion
  - New "Convert _id to ObjectId" option in bulkWrite, updateMany, deleteMany, and find operations
  - Enabled by default for backward compatibility
  - Disable this option when using string IDs instead of MongoDB ObjectId format

### Fixed
- 🐛 **String ID Support**: Fixed "Argument passed in must be a string of 12 bytes or 24 hex characters" error
  - Allows using custom string IDs (e.g., "0987768") instead of ObjectId format
  - Prevents automatic conversion errors when _id is not in ObjectId format

## [1.0.13] - 2025-11-17

### Fixed
- 🐛 **Package Bundling**: Bundled mongodb and bson dependencies to fix n8n installation issues
  - Changed to exact versions without semver ranges
  - Added bundledDependencies to ensure proper dependency resolution in n8n

## [1.0.12] - 2025-11-17

### Fixed
- 🐛 **BSON Dependency**: Added explicit BSON dependency to fix module loading issues in n8n
  - Resolves "Cannot find module 'bson/lib/bson.cjs'" error
  - Ensures proper dependency resolution in n8n's community package system

## [1.0.11] - 2025-11-17

### Added
- 🔧 **MongoDB 4.0 Support**: Added backward compatibility for older MongoDB versions
  - Added "MongoDB Server Version" option in credentials to select compatibility mode
  - Support for MongoDB 3.6, 4.0, and newer versions
  - Automatic driver configuration based on selected server version

### Changed
- 📦 **MongoDB Driver**: Downgraded driver from v6.3.0 to v4.17.2 for broader compatibility
  - Resolves "maximum wire version" errors with older MongoDB servers
  - Maintains support for modern MongoDB features

### Fixed
- 🐛 **Connection Error**: Fixed "Server reports maximum wire version 7, but this version requires at least 8" error
  - Users can now connect to MongoDB 4.0.3 and earlier versions
  - Added legacy connection options for older servers

## [1.0.8] - 2025-10-31

### Added
- ✨ **Date Fields Conversion**: New feature to automatically convert date string fields to MongoDB Date objects
  - Added `dateFields` parameter to `insertMany` operation
  - Added `dateFields` parameter to `bulkWrite` operation
  - Support for simple field names: `timestamp,createdAt,updatedAt`
  - Support for nested fields with dot notation: `customer.registeredAt,order.shippedAt`
  - Automatic validation of date values before conversion
  - Works with ISO 8601 strings, date-only strings, and Unix timestamps

### Documentation
- 📚 **DATE-FIELDS-GUIDE.md**: Comprehensive guide for date field conversion feature
- 📖 **QUICK-DATE-SOLUTION.md**: Quick start guide with step-by-step instructions
- 📝 **Updated EXAMPLES.md**: Added examples demonstrating date field conversion
  - Example with single date field
  - Example with multiple date fields
  - Example with nested date fields
  - Updated bulkWrite examples to show date conversion

### Fixed
- 🐛 **Date Type Issue**: Resolved issue where datetime values were stored as strings instead of Date objects
  - Date range queries now work correctly
  - Date-based sorting now functions properly
  - Date arithmetic operations are now supported

## [1.0.7] - 2025-10-31

### Changed
- 📊 **Badge Updates**: Optimized npm badges in README
  - Updated npm badges to use modern format (removed `.svg` extension, added `logo=npm` parameter)
  - Changed download metric to show total downloads (`dt`) for better package statistics
  - Improved badge caching behavior with shields.io

### Fixed
- 🔧 **GitHub Actions CI**: Fixed npm ci error by adding package-lock.json to repository
  - Removed `package-lock.json` from `.gitignore`
  - Generated and committed package-lock.json for reproducible builds
  - CI workflows now run successfully with npm ci

### Added
- 🎨 **Visual Identity Updates**:
  - Updated banner.svg with simplified MongoDB leaf icon matching node design
  - PNG icon (1024x1024) properly configured in node and README
  - Centered node icon display in README (128x128px)
- 🔒 **Security**: Added SECURITY.md with security policy

## [1.0.6] - 2025-10-31

### Added
- 🚀 **GitHub Actions CI/CD**: Automated workflows for testing, building, and publishing
  - CI workflow: Test on Node.js 18, 20, and 21
  - npm publish workflow: Automated publishing with provenance
  - Release workflow: Automated GitHub releases
- 📚 **Documentation**: GITHUB-ACTIONS-SETUP.md with complete workflow setup guide
- 🤝 **Contributing**: CONTRIBUTING.md with contribution guidelines
- 💰 **Funding**: GitHub funding configuration

### Changed
- Updated README with CI workflow badge
- Improved package metadata with repository links

### Infrastructure
- Automated npm publishing with Trusted Publisher support
- Supply chain security with npm provenance
- Multi-version Node.js testing

## [1.0.5] - 2025-10-31

### Fixed
- 🔧 **Icon Path Fix**: Corrected icon directory structure in build output
  - Icons now properly located at `dist/nodes/MongoDbBulk/*.svg`
  - Fixed n8n UI icon loading issue
  - Changed copyfiles flag from `-u 1` to `-u 0` to preserve directory structure

### Technical Details
- Icons are now correctly placed where n8n expects them
- Browser loads icon from: `/icons/n8n-nodes-mongo-bulk/dist/nodes/MongoDbBulk/mongodb.svg`
- Previous versions had icons in wrong location causing 404 errors

## [1.0.4] - 2025-10-31 (Icon path issue - upgrade to 1.0.5)

### Added
- 🎨 **Visual Assets**: Added banner, logo, and enhanced icons
  - Banner image (800x200) for README and documentation
  - Square logo (128x128) for package listings
  - Enhanced bulk operations icon (64x64) with visual indicators
- 📊 npm badges for version, downloads, and license
- Assets README with usage instructions

### Changed
- Updated README with banner image
- Improved package visual identity
- Added assets directory to published package

### Known Issue
- Icons not loading in n8n UI (fixed in 1.0.5)

## [1.0.3] - 2025-10-31

### Changed
- **IMPORTANT**: Now uses n8n's standard MongoDB credentials (`mongoDb`)
- Users can now reuse existing MongoDB credentials from standard MongoDB nodes
- Removed custom credentials - use existing MongoDB credentials instead
- Added full TLS/SSL certificate support (ca, cert, key, passphrase)
- Improved password encoding in connection strings
- Better handling of database name in connections

### Benefits
- ✅ Share credentials across MongoDB nodes
- ✅ No need to create duplicate credentials
- ✅ Full TLS certificate support for secure connections
- ✅ Compatible with existing MongoDB setups

## [1.0.2] - 2025-10-31

### Fixed
- Fixed credential testing issue from version 1.0.1
- Restored custom MongoDB Bulk credentials with proper configuration
- Updated credential display name to "MongoDB Bulk" to avoid confusion
- Set connection string as default configuration method

### Changed
- Improved credential field descriptions and placeholders
- Better MongoDB Atlas connection string examples

## [1.0.1] - 2025-10-31 (DEPRECATED)

### Issues
- Credential testing not working
- Please upgrade to 1.0.2

## [1.0.0] - 2025-10-31

### Added
- Initial release
- Insert Many operation
- Update Many operation
- Delete Many operation
- Find operation with pagination and sorting
- Bulk Write operation for mixed operations
- Support for MongoDB connection strings
- Support for individual connection parameters
- Automatic ObjectId conversion
- Array filters support
- Continue on fail support
