# MongoDB Bulk Operations Examples

This document provides practical examples for using the MongoDB Bulk node in n8n workflows.

## Example 1: Insert Documents with Date Fields

When inserting documents with datetime fields, you need to specify which fields should be converted to MongoDB Date objects. Without this, date strings will be stored as plain strings.

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

**With multiple date fields:**

```json
{
  "operation": "insertMany",
  "collection": "users",
  "documents": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-10-31T00:00:00.000Z",
      "lastLoginAt": "2025-10-31T10:30:00.000Z",
      "subscriptionExpiry": "2026-10-31T00:00:00.000Z"
    }
  ],
  "dateFields": "createdAt,lastLoginAt,subscriptionExpiry"
}
```

**With nested date fields (using dot notation):**

```json
{
  "operation": "insertMany",
  "collection": "orders",
  "documents": [
    {
      "orderId": "ORD-001",
      "customer": {
        "name": "Jane Smith",
        "registeredAt": "2025-01-15T08:00:00.000Z"
      },
      "createdAt": "2025-10-31T02:44:40.780Z",
      "shipping": {
        "estimatedDelivery": "2025-11-05T00:00:00.000Z"
      }
    }
  ],
  "dateFields": "createdAt,customer.registeredAt,shipping.estimatedDelivery"
}
```

## Example 2: Batch User Import

Import multiple users at once:

```json
{
  "operation": "insertMany",
  "collection": "users",
  "documents": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      "createdAt": "2025-10-31T00:00:00Z"
    },
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "user",
      "createdAt": "2025-10-31T00:00:00Z"
    },
    {
      "name": "Bob Johnson",
      "email": "bob@example.com",
      "role": "user",
      "createdAt": "2025-10-31T00:00:00Z"
    }
  ]
}
```

## Example 2: Bulk Status Update

Update all pending orders to processing:

```json
{
  "operation": "updateMany",
  "collection": "orders",
  "filter": {
    "status": "pending"
  },
  "update": {
    "$set": {
      "status": "processing",
      "processedAt": "2025-10-31T10:30:00Z"
    }
  }
}
```

## Example 3: Bulk Delete Old Records

Delete all users inactive for more than 365 days:

```json
{
  "operation": "deleteMany",
  "collection": "users",
  "filter": {
    "lastLoginAt": {
      "$lt": "2024-10-31T00:00:00Z"
    },
    "status": "inactive"
  }
}
```

## Example 4: Complex Bulk Write

Perform multiple operations in one request:

```json
{
  "operation": "bulkWrite",
  "collection": "products",
  "operations": [
    {
      "insertOne": {
        "document": {
          "name": "New Product",
          "price": 29.99,
          "stock": 100,
          "createdAt": "2025-10-31T02:44:40.780Z"
        }
      }
    },
    {
      "updateMany": {
        "filter": {
          "category": "electronics"
        },
        "update": {
          "$mul": {
            "price": 0.9
          },
          "$set": {
            "updatedAt": "2025-10-31T02:44:40.780Z"
          }
        }
      }
    },
    {
      "deleteMany": {
        "filter": {
          "stock": 0,
          "discontinued": true
        }
      }
    },
    {
      "updateOne": {
        "filter": {
          "sku": "PROD-123"
        },
        "update": {
          "$inc": {
            "stock": 50
          },
          "$set": {
            "lastRestocked": "2025-10-31T02:44:40.780Z"
          }
        },
        "upsert": true
      }
    }
  ],
  "dateFields": "createdAt,updatedAt,lastRestocked"
}
```

**Note:** When using the `dateFields` parameter with `bulkWrite`, it will automatically convert the specified fields to Date objects in:
- `insertOne` document
- `replaceOne` replacement document  
- `updateOne` and `updateMany` `$set` operations

## Example 5: Find with Pagination

Retrieve users with pagination:

```json
{
  "operation": "find",
  "collection": "users",
  "filter": {
    "status": "active"
  },
  "options": {
    "limit": 20,
    "skip": 0,
    "sort": {
      "createdAt": -1
    },
    "projection": {
      "name": 1,
      "email": 1,
      "role": 1,
      "_id": 0
    }
  }
}
```

## Example 6: Update Array Fields

Update specific array elements:

```json
{
  "operation": "updateMany",
  "collection": "posts",
  "filter": {
    "comments.status": "pending"
  },
  "update": {
    "$set": {
      "comments.$[elem].status": "approved"
    }
  },
  "options": {
    "arrayFilters": [
      {
        "elem.status": "pending"
      }
    ]
  }
}
```

## Example 7: Upsert Multiple Records

Update or insert if not exists:

```json
{
  "operation": "updateMany",
  "collection": "settings",
  "filter": {
    "key": "notification_enabled"
  },
  "update": {
    "$set": {
      "value": true,
      "updatedAt": "2025-10-31T10:30:00Z"
    }
  },
  "options": {
    "upsert": true
  }
}
```

## Example 8: Workflow Integration

Example n8n workflow combining HTTP request with bulk insert:

1. **Webhook Node**: Receive data from external API
2. **Function Node**: Transform data into MongoDB format
3. **MongoDB Bulk Node**: Insert many documents
4. **Send Response**: Return success message

Function Node code:
```javascript
const items = $input.all();
const documents = items.map(item => ({
  name: item.json.name,
  email: item.json.email,
  source: 'webhook',
  importedAt: new Date().toISOString()
}));

return [{ json: { documents } }];
```

MongoDB Bulk Node configuration:
```json
{
  "operation": "insertMany",
  "collection": "imports",
  "documents": "{{ $json.documents }}"
}
```

## Example 9: Data Migration

Migrate data from one collection to another with transformation:

1. **MongoDB Bulk Node (Find)**: Read from source collection
2. **Function Node**: Transform data structure
3. **MongoDB Bulk Node (InsertMany)**: Write to target collection

## Example 10: Scheduled Cleanup

Daily cleanup workflow:

1. **Schedule Trigger**: Run daily at midnight
2. **MongoDB Bulk Node (DeleteMany)**: Remove old logs
3. **MongoDB Bulk Node (UpdateMany)**: Archive old records
4. **Email Node**: Send cleanup report

## Tips

- Use `ordered: false` for better performance when order doesn't matter
- Break large operations into smaller batches to avoid memory issues
- Use projection in find operations to reduce data transfer
- Enable `continueOnFail` for fault-tolerant bulk operations
- Test filters carefully before running delete operations
