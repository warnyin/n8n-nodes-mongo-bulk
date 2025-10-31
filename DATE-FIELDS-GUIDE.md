# Date Fields Guide

## Problem

When inserting documents into MongoDB through the n8n MongoDB Bulk node, datetime values in ISO string format (e.g., `"2025-10-31T02:44:40.780Z"`) are stored as plain strings instead of MongoDB Date objects. This can cause issues with:

- Date range queries
- Date-based sorting
- Date arithmetic operations
- MongoDB's built-in date functions

## Solution

The MongoDB Bulk node now includes a **Date Fields** parameter that automatically converts specified fields from strings to MongoDB Date objects during insertion or update operations.

## How to Use

### For Insert Many Operation

1. Add your documents in JSON format
2. In the **Date Fields** parameter, enter a comma-separated list of field names that contain dates
3. The node will automatically convert those fields to Date objects before inserting

**Example:**

```json
{
  "operation": "insertMany",
  "collection": "products",
  "documents": [
    {
      "product_id": "P21091536196937",
      "timestamp": "2025-10-31T02:44:40.780Z",
      "name": "Product A"
    },
    {
      "product_id": "P21091536229833",
      "timestamp": "2025-10-31T02:44:40.780Z",
      "name": "Product B"
    }
  ],
  "dateFields": "timestamp"
}
```

### For Bulk Write Operation

The Date Fields parameter works with `bulkWrite` operations as well, automatically converting dates in:
- `insertOne` documents
- `replaceOne` replacement documents
- `updateOne` and `updateMany` `$set` operations

**Example:**

```json
{
  "operation": "bulkWrite",
  "collection": "events",
  "operations": [
    {
      "insertOne": {
        "document": {
          "eventName": "User Login",
          "timestamp": "2025-10-31T02:44:40.780Z",
          "userId": "user123"
        }
      }
    },
    {
      "updateOne": {
        "filter": { "userId": "user456" },
        "update": {
          "$set": {
            "lastSeen": "2025-10-31T03:00:00.000Z"
          }
        }
      }
    }
  ],
  "dateFields": "timestamp,lastSeen"
}
```

## Supported Formats

The Date Fields parameter supports:

### Simple Field Names
```
dateFields: "timestamp,createdAt,updatedAt"
```

### Nested Fields (Dot Notation)
```
dateFields: "user.registeredAt,order.shippedAt"
```

Example with nested fields:
```json
{
  "documents": [
    {
      "orderId": "ORD-001",
      "customer": {
        "name": "Jane Smith",
        "registeredAt": "2025-01-15T08:00:00.000Z"
      },
      "createdAt": "2025-10-31T02:44:40.780Z"
    }
  ],
  "dateFields": "createdAt,customer.registeredAt"
}
```

## Date Input Formats

The converter accepts any valid JavaScript Date input:

- **ISO 8601 strings**: `"2025-10-31T02:44:40.780Z"`
- **Date-only strings**: `"2025-10-31"`
- **Unix timestamps (milliseconds)**: `1730343880780`
- **Any string that `new Date()` can parse**

Invalid date values will be left unchanged (not converted).

## Before and After

### Before (without Date Fields parameter)

```javascript
// Stored in MongoDB as string
{
  "product_id": "P21091536196937",
  "timestamp": "2025-10-31T02:44:40.780Z"  // String type
}
```

Queries like this won't work properly:
```javascript
db.products.find({
  timestamp: { $gt: new Date("2025-10-30") }  // Won't match!
})
```

### After (with Date Fields parameter)

```javascript
// Stored in MongoDB as Date object
{
  "product_id": "P21091536196937",
  "timestamp": ISODate("2025-10-31T02:44:40.780Z")  // Date type
}
```

Now date queries work correctly:
```javascript
db.products.find({
  timestamp: { $gt: new Date("2025-10-30") }  // Works!
})
```

## Tips

1. **Always specify date fields** when your documents contain dates that you'll query or sort by
2. **Use consistent field names** across your documents for easier maintenance
3. **Test with a small dataset** first to ensure dates are converted correctly
4. **Leave empty** if you don't have any date fields to convert

## See Also

- [EXAMPLES.md](./EXAMPLES.md) - More usage examples
- [MongoDB Date Documentation](https://www.mongodb.com/docs/manual/reference/bson-types/#date)
