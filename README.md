# n8n-nodes-mongo-bulk

<p align="center">
  <img src="./n8n-nodes-mongo-bulk.png" alt="MongoDB Bulk Node Icon" width="128" height="128">
</p>

![MongoDB Bulk Banner](./assets/banner.svg)

This is an n8n community node for MongoDB bulk and many operations. It provides efficient ways to perform bulk operations on MongoDB collections.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[![CI](https://github.com/thebossza101/n8n-nodes-mongo-bulk/actions/workflows/ci.yml/badge.svg)](https://github.com/thebossza101/n8n-nodes-mongo-bulk/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/n8n-nodes-mongo-bulk.svg)](https://www.npmjs.com/package/n8n-nodes-mongo-bulk)
[![npm downloads](https://img.shields.io/npm/dt/n8n-nodes-mongo-bulk.svg)](https://www.npmjs.com/package/n8n-nodes-mongo-bulk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Node Installation

1. Go to **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-mongo-bulk` in **Enter npm package name**.
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes and select **Install**.

After installing the node, you can use it like any other node. n8n displays the node in search results in the **Nodes** panel.

### Manual Installation

To install manually:

```bash
npm install n8n-nodes-mongo-bulk
```

## Operations

The MongoDB Bulk node supports the following operations:

### Insert Many
Insert multiple documents into a collection in a single operation.

**Parameters:**
- **Collection**: The name of the MongoDB collection
- **Documents**: JSON array of documents to insert
- **Options**:
  - **Ordered**: Execute inserts in order (default: true)
  - **Bypass Document Validation**: Skip document validation (default: false)

**Example:**
```json
[
  {"name": "John Doe", "email": "john@example.com"},
  {"name": "Jane Smith", "email": "jane@example.com"}
]
```

### Update Many
Update multiple documents that match a filter.

**Parameters:**
- **Collection**: The name of the MongoDB collection
- **Filter**: Query filter to match documents
- **Update**: Update operations to apply
- **Options**:
  - **Upsert**: Insert if no match found (default: false)
  - **Array Filters**: Filters for array update operations

**Example Filter:**
```json
{"status": "pending"}
```

**Example Update:**
```json
{"$set": {"status": "completed", "completedAt": "2025-10-31"}}
```

### Delete Many
Delete multiple documents that match a filter.

**Parameters:**
- **Collection**: The name of the MongoDB collection
- **Filter**: Query filter to match documents to delete

**Example Filter:**
```json
{"status": "archived", "createdAt": {"$lt": "2024-01-01"}}
```

### Find
Find multiple documents that match a filter.

**Parameters:**
- **Collection**: The name of the MongoDB collection
- **Filter**: Query filter to match documents
- **Options**:
  - **Limit**: Maximum number of documents to return
  - **Skip**: Number of documents to skip
  - **Sort**: Sort specification
  - **Projection**: Fields to include/exclude

**Example Filter:**
```json
{"status": "active"}
```

**Example Sort:**
```json
{"createdAt": -1}
```

**Example Projection:**
```json
{"name": 1, "email": 1, "_id": 0}
```

### Bulk Write
Execute multiple write operations in a single request.

**Parameters:**
- **Collection**: The name of the MongoDB collection
- **Operations**: Array of bulk write operations
- **Options**:
  - **Ordered**: Execute operations in order (default: true)

**Example Operations:**
```json
[
  {
    "insertOne": {
      "document": {"name": "John", "status": "active"}
    }
  },
  {
    "updateOne": {
      "filter": {"name": "Jane"},
      "update": {"$set": {"status": "inactive"}}
    }
  },
  {
    "deleteOne": {
      "filter": {"name": "Old User"}
    }
  },
  {
    "updateMany": {
      "filter": {"status": "pending"},
      "update": {"$set": {"status": "processed"}}
    }
  },
  {
    "replaceOne": {
      "filter": {"_id": "507f1f77bcf86cd799439011"},
      "replacement": {"name": "New Name", "status": "active"}
    }
  }
]
```

## Credentials

**Important:** This node uses n8n's **standard MongoDB credentials** (`mongoDb`), which means:

✅ **Share credentials** with the standard MongoDB node
✅ **No duplicate credentials** needed
✅ **Full TLS certificate support** (CA, client cert, key, passphrase)

### Configuration Methods

The MongoDB credentials can be configured in two ways:

#### Connection String
Provide a complete MongoDB connection string:
```
mongodb://username:password@host:port/database
```

For MongoDB Atlas:
```
mongodb+srv://username:password@cluster.mongodb.net/database
```

With authentication source:
```
mongodb://admin:password@localhost:27017/myDatabase?authSource=admin
```

#### Individual Values
Configure connection details separately:
- **Host**: MongoDB server hostname
- **Port**: MongoDB server port (default: 27017)
- **Database**: Database name
- **User**: Username for authentication
- **Password**: Password for authentication
- **Use TLS**: Enable TLS/SSL connection

#### Advanced TLS Options
When TLS is enabled:
- **CA Certificate**: Certificate authority certificate
- **Public Client Certificate**: Client certificate for authentication
- **Private Client Key**: Private key for client certificate
- **Passphrase**: Passphrase for encrypted private key

## Features

- **Efficient Bulk Operations**: Perform multiple operations in a single database round-trip
- **Flexible Filtering**: Support for complex MongoDB query filters
- **ObjectId Conversion**: Automatic conversion of string IDs to MongoDB ObjectId
- **Error Handling**: Continue on fail option for fault-tolerant workflows
- **Multiple Operation Types**: Support for insert, update, delete, find, and mixed bulk operations

## Use Cases

- **Batch Data Import**: Import large datasets efficiently
- **Bulk Updates**: Update multiple records based on conditions
- **Data Cleanup**: Delete multiple records in one operation
- **Complex Workflows**: Execute multiple different operations in sequence
- **Data Migration**: Migrate data between collections or databases

## Compatibility

- Requires n8n version 0.187.0 or higher
- Compatible with MongoDB 4.0 and higher
- Supports MongoDB Atlas cloud databases

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [MongoDB Node.js Driver documentation](https://www.mongodb.com/docs/drivers/node/)

## License

[MIT](LICENSE.md)
