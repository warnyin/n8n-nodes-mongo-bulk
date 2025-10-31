# Quick Start Guide

## Version 1.0.2 - Fixed Credentials Issue! ✅

The credential testing issue has been fixed. Follow this guide to set up and use the MongoDB Bulk node.

---

## Step 1: Install the Node

In n8n:
1. Go to **Settings > Community Nodes**
2. Click **Install**
3. Enter: `n8n-nodes-mongo-bulk`
4. Make sure it installs **version 1.0.2**
5. Click **Install**
6. Restart n8n if prompted

---

## Step 2: Create MongoDB Bulk Credentials

1. In your workflow, add the **MongoDB Bulk** node
2. Click on **Credential to connect with**
3. Click **Create New Credential**
4. You'll see **MongoDB Bulk** credential form

### Option A: Using Connection String (Recommended)

This is the default and easiest method:

**Configuration Type:** Connection String

**For local MongoDB:**
```
mongodb://localhost:27017/myDatabase
```

**With authentication:**
```
mongodb://username:password@localhost:27017/myDatabase
```

**For MongoDB Atlas:**
```
mongodb+srv://username:password@cluster0.mongodb.net/myDatabase
```

### Option B: Using Individual Values

**Configuration Type:** Values

Fill in:
- **Host:** `localhost` (or your MongoDB server address)
- **Port:** `27017`
- **Database:** `myDatabase`
- **User:** `myUsername` (optional)
- **Password:** `myPassword` (optional)
- **Use TLS/SSL:** Check if using MongoDB Atlas or TLS

---

## Step 3: Configure Your Operation

### Example 1: Insert Many

```json
{
  "collection": "users",
  "documents": [
    {"name": "John", "email": "john@example.com"},
    {"name": "Jane", "email": "jane@example.com"}
  ]
}
```

### Example 2: Update Many

```json
{
  "collection": "orders",
  "filter": {"status": "pending"},
  "update": {"$set": {"status": "processing"}}
}
```

### Example 3: Delete Many

```json
{
  "collection": "users",
  "filter": {
    "lastLoginAt": {"$lt": "2024-10-31T00:00:00Z"},
    "status": "inactive"
  }
}
```

### Example 4: Find with Pagination

```json
{
  "collection": "products",
  "filter": {"category": "electronics"},
  "options": {
    "limit": 10,
    "skip": 0,
    "sort": {"price": -1}
  }
}
```

### Example 5: Bulk Write (Mixed Operations)

```json
{
  "collection": "inventory",
  "operations": [
    {
      "insertOne": {
        "document": {"item": "notebook", "qty": 50}
      }
    },
    {
      "updateOne": {
        "filter": {"item": "pen"},
        "update": {"$inc": {"qty": 10}}
      }
    },
    {
      "deleteOne": {
        "filter": {"item": "eraser"}
      }
    }
  ]
}
```

---

## Common Connection Strings

### Local MongoDB (No Auth)
```
mongodb://localhost:27017/myDatabase
```

### Local MongoDB (With Auth)
```
mongodb://admin:password@localhost:27017/myDatabase?authSource=admin
```

### MongoDB Atlas
```
mongodb+srv://username:password@cluster0.mongodb.net/myDatabase
```

### Docker MongoDB
```
mongodb://host.docker.internal:27017/myDatabase
```

### Replica Set
```
mongodb://host1:27017,host2:27017,host3:27017/myDatabase?replicaSet=rs0
```

---

## Troubleshooting

### "Couldn't connect with these settings"

1. **Check connection string format:**
   - Make sure it starts with `mongodb://` or `mongodb+srv://`
   - Include the database name at the end
   - Verify username and password are URL-encoded

2. **Test connection outside n8n:**
   ```bash
   # Using mongosh
   mongosh "mongodb://localhost:27017/myDatabase"
   ```

3. **For MongoDB Atlas:**
   - Make sure your IP is whitelisted
   - Use `mongodb+srv://` protocol
   - Check username/password are correct

4. **For local MongoDB:**
   - Verify MongoDB is running: `mongod --version`
   - Check port 27017 is open
   - Try without authentication first

### "Database not found"

Make sure to include the database name in the connection string:
- ✅ `mongodb://localhost:27017/myDatabase`
- ❌ `mongodb://localhost:27017`

---

## Testing Your Setup

Try this simple test workflow:

1. **Manual Trigger** node
2. **MongoDB Bulk** node:
   - Operation: **Insert Many**
   - Collection: `test`
   - Documents:
     ```json
     [{"message": "Hello from n8n!", "timestamp": "{{$now}}"}]
     ```
3. Click **Execute Node**

If successful, you'll see the inserted document ID in the output!

---

## Need More Help?

Check these files in the package:
- `README.md` - Full documentation
- `EXAMPLES.md` - 10+ real-world examples
- `CHANGELOG.md` - Version history

Or visit:
- [n8n Community Forum](https://community.n8n.io/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
