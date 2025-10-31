# Release Notes - v1.0.8

## 🎉 Date Fields Conversion Feature

This release introduces a powerful new feature to handle date/datetime fields correctly when inserting or updating MongoDB documents.

### 🌟 Key Features

#### Automatic Date Conversion
- **New `dateFields` parameter** for `insertMany` and `bulkWrite` operations
- Automatically converts ISO date strings to MongoDB Date objects
- Prevents common issues with date queries, sorting, and operations

#### Simple to Use
Just specify which fields should be treated as dates:
```
dateFields: timestamp,createdAt,updatedAt
```

#### Flexible Format Support
- Simple field names: `timestamp`
- Multiple fields: `timestamp,createdAt,updatedAt`
- Nested fields: `customer.registeredAt,order.shippedAt`

### 📝 What's Changed

#### Added
- ✨ `dateFields` parameter for `insertMany` operation
- ✨ `dateFields` parameter for `bulkWrite` operation
- 📚 Comprehensive DATE-FIELDS-GUIDE.md documentation
- 📖 Quick start guide (QUICK-DATE-SOLUTION.md)
- 📝 Updated examples in EXAMPLES.md

#### Fixed
- 🐛 Date strings now properly convert to MongoDB Date objects
- ✅ Date range queries work correctly
- ✅ Date-based sorting functions properly
- ✅ Date arithmetic operations are supported

### 🚀 Usage Example

**Before v1.0.8:**
```json
{
  "product_id": "P21091536196937",
  "timestamp": "2025-10-31T02:44:40.780Z"  // ❌ Stored as string
}
```

**With v1.0.8:**
```json
// In your n8n node:
{
  "operation": "insertMany",
  "collection": "products",
  "documents": [
    {
      "product_id": "P21091536196937",
      "timestamp": "2025-10-31T02:44:40.780Z"
    }
  ],
  "dateFields": "timestamp"  // ✅ New parameter!
}

// Result in MongoDB:
{
  "product_id": "P21091536196937",
  "timestamp": ISODate("2025-10-31T02:44:40.780Z")  // ✅ Proper Date object
}
```

### 📖 Documentation

- **Quick Start**: See [QUICK-DATE-SOLUTION.md](./QUICK-DATE-SOLUTION.md)
- **Full Guide**: See [DATE-FIELDS-GUIDE.md](./DATE-FIELDS-GUIDE.md)
- **Examples**: See [EXAMPLES.md](./EXAMPLES.md)

### 🔧 Technical Details

- Supports ISO 8601 date strings
- Supports Unix timestamps (milliseconds)
- Validates dates before conversion
- Works with nested objects using dot notation
- Compatible with all bulk operations

### 📦 Installation

```bash
npm install n8n-nodes-mongo-bulk@1.0.8
```

Or update in your n8n instance through the Community Nodes section.

### 🙏 Acknowledgments

Thanks to all users who reported the date conversion issue and helped test this feature!

---

**Full Changelog**: https://github.com/thebossza101/n8n-nodes-mongo-bulk/compare/v1.0.7...v1.0.8
