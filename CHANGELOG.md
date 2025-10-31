# Changelog

All notable changes to this project will be documented in this file.

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
