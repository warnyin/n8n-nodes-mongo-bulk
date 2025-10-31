# Quick Solution: Converting Date Strings to MongoDB Date Objects

## Your Problem
Your datetime fields are being inserted as strings instead of MongoDB Date objects:

```json
{
  "product_id": "P21091536196937",
  "timestamp": "2025-10-31T02:44:40.780Z"  // ❌ Stored as string
}
```

## The Solution
Use the new **Date Fields** parameter in the MongoDB Bulk node!

## Step-by-Step Instructions

### For Insert Many Operation

1. **Configure your node as usual:**
   - Operation: `Insert Many`
   - Collection: your collection name
   - Documents: your JSON array

2. **Add the Date Fields parameter:**
   - In the node settings, you'll now see a new field called **Date Fields**
   - Enter the names of your date fields, separated by commas

3. **Example configuration:**

   ```
   Operation: insertMany
   Collection: products
   Documents:
   [
     {
       "product_id": "P21091536196937",
       "timestamp": "2025-10-31T02:44:40.780Z"
     },
     {
       "product_id": "P21091536229833",
       "timestamp": "2025-10-31T02:44:40.780Z"
     }
   ]
   
   Date Fields: timestamp
   ```

### Result
Now your documents will be stored with proper Date objects:

```json
{
  "product_id": "P21091536196937",
  "timestamp": ISODate("2025-10-31T02:44:40.780Z")  // ✅ Stored as Date
}
```

## Multiple Date Fields

If you have multiple date fields, separate them with commas:

```
Date Fields: timestamp,createdAt,updatedAt,expiresAt
```

## Nested Date Fields

For nested objects, use dot notation:

```json
{
  "orderId": "ORD-001",
  "customer": {
    "registeredAt": "2025-01-15T08:00:00.000Z"
  },
  "createdAt": "2025-10-31T02:44:40.780Z"
}
```

```
Date Fields: createdAt,customer.registeredAt
```

## For Bulk Write Operations

The Date Fields parameter also works with `bulkWrite`:

```
Operation: bulkWrite
Collection: events
Operations: [... your operations ...]
Date Fields: timestamp,createdAt,updatedAt
```

It will convert dates in:
- `insertOne` operations
- `replaceOne` operations
- `updateOne` and `updateMany` `$set` operations

## That's It!

No need to manually convert dates in your code - just list the field names and the node handles the rest!

---

For more detailed examples and advanced usage, see [DATE-FIELDS-GUIDE.md](./DATE-FIELDS-GUIDE.md)
