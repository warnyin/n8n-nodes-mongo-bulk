# Upgrade to Version 1.0.3

## What's New?

Version 1.0.3 now uses **n8n's standard MongoDB credentials** (`mongoDb`) instead of custom credentials!

## Benefits

✅ **Reuse existing MongoDB credentials** - No need to create duplicate credentials
✅ **Share credentials** across standard MongoDB node and MongoDB Bulk node
✅ **Full TLS support** - CA certificates, client certificates, keys, and passphrases
✅ **Tested and reliable** - Uses the same credential system as n8n's official MongoDB node

---

## How to Upgrade

### Step 1: Update the Package

In n8n:
1. Go to **Settings > Community Nodes**
2. Update or reinstall: `n8n-nodes-mongo-bulk`
3. Make sure version **1.0.3** is installed

### Step 2: Update Your Workflows

If you were using version 1.0.2 with custom "MongoDB Bulk" credentials:

1. Open workflows using MongoDB Bulk nodes
2. Select the MongoDB Bulk node
3. Click on **Credential to connect with**
4. Select an **existing MongoDB credential** OR create a new one

### Step 3: Use Standard MongoDB Credentials

Now when you add credentials, you'll see the standard **MongoDB** credential:

#### Configuration Type: Connection String
```
mongodb://username:password@localhost:27017/database
```

#### Configuration Type: Values
- **Host:** localhost
- **Database:** myDatabase
- **User:** username
- **Password:** password
- **Port:** 27017
- **Use TLS:** (checked if needed)

#### Advanced TLS Options
When TLS is enabled, you can now add:
- **CA Certificate**
- **Public Client Certificate**
- **Private Client Key**
- **Passphrase**

---

## Credential Compatibility

The MongoDB Bulk node now accepts the **same credentials** as:
- MongoDB node (standard n8n node)
- Any other node using `mongoDb` credentials

This means you can:
1. Create ONE set of MongoDB credentials
2. Use them across ALL MongoDB nodes
3. No duplicate credential management!

---

## Example Workflow

**Before (v1.0.2):**
- MongoDB node → Uses "MongoDB" credentials
- MongoDB Bulk node → Uses "MongoDB Bulk" credentials (separate)

**After (v1.0.3):**
- MongoDB node → Uses "MongoDB" credentials
- MongoDB Bulk node → Uses **same** "MongoDB" credentials ✅

---

## Connection String Examples

### Local MongoDB
```
mongodb://localhost:27017/myDatabase
```

### With Authentication
```
mongodb://admin:password@localhost:27017/myDatabase?authSource=admin
```

### MongoDB Atlas
```
mongodb+srv://username:password@cluster0.mongodb.net/myDatabase
```

### With TLS (Advanced)
For advanced TLS configurations, use **Configuration Type: Values** and enable **Use TLS**, then provide certificate files.

---

## Troubleshooting

### "Cannot find credential type"

Make sure you're using n8n version that includes the MongoDB credential type. The standard MongoDB credentials have been available since early versions of n8n.

### "Credentials not working"

1. Test your credentials with the standard MongoDB node first
2. If they work there, they'll work with MongoDB Bulk
3. Check your connection string format
4. Verify database name is included

### Migrating from 1.0.2

If you have workflows using the old "MongoDB Bulk" custom credentials:

1. Note your connection details from the old credentials
2. Create new standard MongoDB credentials with the same details
3. Update your MongoDB Bulk nodes to use the new credentials
4. Delete the old custom credentials (optional)

---

## Full Feature List (v1.0.3)

### Operations
- ✅ Insert Many
- ✅ Update Many
- ✅ Delete Many
- ✅ Find (with pagination, sorting, projection)
- ✅ Bulk Write (mixed operations)

### Credential Features
- ✅ Connection string support
- ✅ Individual values configuration
- ✅ Username/password authentication
- ✅ TLS/SSL connections
- ✅ CA certificate support
- ✅ Client certificate support
- ✅ Private key support
- ✅ Passphrase support

### Advanced Features
- ✅ ObjectId conversion
- ✅ Array filters
- ✅ Upsert operations
- ✅ Ordered/unordered operations
- ✅ Continue on fail

---

## Questions?

Check these resources:
- `README.md` - Full documentation
- `EXAMPLES.md` - 10+ usage examples
- `CHANGELOG.md` - Version history
- [n8n Community Forum](https://community.n8n.io/)
