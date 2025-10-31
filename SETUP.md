# Setup and Installation Guide

## Quick Start

The MongoDB Bulk node has been built and linked! Follow these steps to use it in your n8n instance.

## Installation Methods

### Method 1: Link to Your n8n Installation (Development)

The package is now linked globally. To use it in your n8n installation:

1. Navigate to your n8n installation directory:
   ```bash
   cd /path/to/your/n8n
   ```

2. Link the package:
   ```bash
   npm link n8n-nodes-mongo-bulk
   ```

3. Restart n8n:
   ```bash
   n8n start
   ```

### Method 2: Install from NPM (Production)

Once published to npm:

1. In n8n, go to **Settings > Community Nodes**
2. Click **Install**
3. Enter `n8n-nodes-mongo-bulk`
4. Click **Install**

Or install via command line:
```bash
cd ~/.n8n
npm install n8n-nodes-mongo-bulk
```

### Method 3: Manual Installation

Copy the built files directly to n8n:

```bash
# Copy to n8n custom nodes directory
cp -r dist/* ~/.n8n/custom/
```

## Configuration

### 1. Add MongoDB Credentials

1. In n8n, go to **Credentials**
2. Click **Add Credential**
3. Search for **MongoDB**
4. Choose configuration type:
   - **Connection String**: Use full MongoDB URI
   - **Values**: Enter individual connection details

#### Connection String Example:
```
mongodb://username:password@localhost:27017/mydb
```

#### MongoDB Atlas Example:
```
mongodb+srv://username:password@cluster0.mongodb.net/mydb
```

### 2. Use the Node in a Workflow

1. Create a new workflow or open an existing one
2. Click **+** to add a node
3. Search for **MongoDB Bulk**
4. Select your MongoDB credentials
5. Choose an operation

## Operations Guide

### Insert Many

Insert multiple documents at once:

```json
{
  "collection": "users",
  "documents": [
    {"name": "John", "email": "john@example.com"},
    {"name": "Jane", "email": "jane@example.com"}
  ]
}
```

### Update Many

Update multiple documents matching a filter:

```json
{
  "collection": "orders",
  "filter": {"status": "pending"},
  "update": {"$set": {"status": "processing"}}
}
```

### Delete Many

Delete multiple documents:

```json
{
  "collection": "logs",
  "filter": {"createdAt": {"$lt": "2024-01-01"}}
}
```

### Find

Query with pagination and sorting:

```json
{
  "collection": "products",
  "filter": {"category": "electronics"},
  "options": {
    "limit": 10,
    "sort": {"price": -1},
    "projection": {"name": 1, "price": 1}
  }
}
```

### Bulk Write

Execute multiple operations:

```json
{
  "collection": "inventory",
  "operations": [
    {"insertOne": {"document": {"item": "A", "qty": 10}}},
    {"updateOne": {"filter": {"item": "B"}, "update": {"$inc": {"qty": 5}}}},
    {"deleteOne": {"filter": {"item": "C"}}}
  ]
}
```

## Testing the Installation

### Quick Test Workflow

1. Create a new workflow
2. Add a **Manual Trigger** node
3. Add a **MongoDB Bulk** node
4. Configure credentials
5. Select **Insert Many** operation
6. Set collection name: `test`
7. Set documents:
   ```json
   [{"test": "value", "timestamp": "2025-10-31"}]
   ```
8. Execute the workflow

If successful, you'll see the inserted document IDs in the output.

## Troubleshooting

### Node Not Appearing

1. Check that the package is installed:
   ```bash
   npm list n8n-nodes-mongo-bulk
   ```

2. Restart n8n completely:
   ```bash
   # Kill all n8n processes
   pkill -f n8n

   # Start again
   n8n start
   ```

3. Check n8n logs for errors:
   ```bash
   ~/.n8n/logs/
   ```

### Connection Issues

1. Verify MongoDB connection string is correct
2. Check MongoDB server is running
3. Verify network access (firewall, security groups)
4. For MongoDB Atlas, whitelist your IP address

### Build Errors

If you make changes to the source:

1. Clean the dist folder:
   ```bash
   rm -rf dist/
   ```

2. Rebuild:
   ```bash
   npm run build
   ```

3. Relink:
   ```bash
   npm link
   ```

## Development

### Making Changes

1. Edit source files in `nodes/` or `credentials/`
2. Run build:
   ```bash
   npm run build
   ```

3. Changes will be reflected in linked n8n instances after restart

### Running in Watch Mode

For active development:

```bash
npm run dev
```

This will watch for changes and rebuild automatically.

## Uninstalling

### Unlink the package:
```bash
# In your n8n directory
npm unlink n8n-nodes-mongo-bulk

# In the package directory
npm unlink
```

### Remove from n8n:
```bash
cd ~/.n8n
npm uninstall n8n-nodes-mongo-bulk
```

## Next Steps

- Check `EXAMPLES.md` for more usage examples
- Read `README.md` for detailed operation documentation
- Test with your MongoDB database
- Create workflows for your use cases

## Support

For issues or questions:
- Check the [n8n community forum](https://community.n8n.io/)
- Review [MongoDB documentation](https://www.mongodb.com/docs/)
- Check [n8n custom nodes docs](https://docs.n8n.io/integrations/community-nodes/)
