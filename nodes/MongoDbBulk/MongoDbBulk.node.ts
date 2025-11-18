import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
} from "n8n-workflow";

import { MongoClient, ObjectId } from "mongodb";

/**
 * Helper function to convert date fields in documents
 * @param documents - Array of documents or single document
 * @param dateFields - Array of field names to convert to Date objects
 * @returns Processed documents with Date objects
 */
function convertDateFields(documents: any, dateFields: string[]): any {
  if (!dateFields || dateFields.length === 0) {
    return documents;
  }

  const processDocument = (doc: any): any => {
    const processedDoc = { ...doc };

    for (const field of dateFields) {
      // Support nested fields using dot notation
      const fieldParts = field.split(".");
      let current = processedDoc;

      // Navigate to the parent of the target field
      for (let i = 0; i < fieldParts.length - 1; i++) {
        if (current[fieldParts[i]] === undefined) {
          break;
        }
        current = current[fieldParts[i]];
      }

      const lastPart = fieldParts[fieldParts.length - 1];

      if (current[lastPart] !== undefined && current[lastPart] !== null) {
        const value = current[lastPart];

        // Convert to Date if it's a string or number
        if (typeof value === "string" || typeof value === "number") {
          const date = new Date(value);
          // Check if the date is valid
          if (!Number.isNaN(date.getTime())) {
            current[lastPart] = date;
          }
        }
      }
    }

    return processedDoc;
  };

  // Handle both single document and array of documents
  if (Array.isArray(documents)) {
    return documents.map(processDocument);
  } else {
    return processDocument(documents);
  }
}

export class MongoDbBulk implements INodeType {
  description: INodeTypeDescription = {
    displayName: "MongoDB Bulk",
    name: "mongoDbBulk",
    icon: "file:n8n-nodes-mongo-bulk.png",
    group: ["transform"],
    version: 1,
    description: "Perform bulk operations on MongoDB collections",
    defaults: {
      name: "MongoDB Bulk",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [
      {
        name: "mongoDb",
        required: true,
      },
    ],
    properties: [
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "Insert Many",
            value: "insertMany",
            description: "Insert multiple documents",
            action: "Insert multiple documents",
          },
          {
            name: "Update Many",
            value: "updateMany",
            description: "Update multiple documents",
            action: "Update multiple documents",
          },
          {
            name: "Delete Many",
            value: "deleteMany",
            description: "Delete multiple documents",
            action: "Delete multiple documents",
          },
          {
            name: "Bulk Write",
            value: "bulkWrite",
            description: "Execute multiple write operations",
            action: "Execute multiple write operations",
          },
          {
            name: "Find",
            value: "find",
            description: "Find multiple documents",
            action: "Find multiple documents",
          },
        ],
        default: "insertMany",
      },
      {
        displayName: "Collection",
        name: "collection",
        type: "string",
        required: true,
        default: "",
        description: "MongoDB Collection Name",
      },

      // Insert Many Options
      {
        displayName: "Documents",
        name: "documents",
        type: "json",
        displayOptions: {
          show: {
            operation: ["insertMany"],
          },
        },
        default: "[]",
        description: "Array of documents to insert",
        placeholder: '[{"name": "John"}, {"name": "Jane"}]',
      },
      {
        displayName: "Date Fields",
        name: "dateFields",
        type: "string",
        displayOptions: {
          show: {
            operation: ["insertMany"],
          },
        },
        default: "",
        description:
          "Comma-separated list of field names that should be converted to Date objects (e.g., timestamp,createdAt,updatedAt)",
        placeholder: "timestamp,createdAt,updatedAt",
      },
      {
        displayName: "Options",
        name: "options",
        type: "collection",
        placeholder: "Add Option",
        default: {},
        displayOptions: {
          show: {
            operation: ["insertMany"],
          },
        },
        options: [
          {
            displayName: "Ordered",
            name: "ordered",
            type: "boolean",
            default: true,
            description: "Whether to execute inserts in order",
          },
          {
            displayName: "Bypass Document Validation",
            name: "bypassDocumentValidation",
            type: "boolean",
            default: false,
            description: "Whether to bypass document validation",
          },
        ],
      },

      // Update Many Options
      {
        displayName: "Filter",
        name: "filter",
        type: "json",
        displayOptions: {
          show: {
            operation: ["updateMany", "deleteMany", "find"],
          },
        },
        default: "{}",
        description: "Query filter for documents",
        placeholder: '{"status": "active"}',
      },
      {
        displayName: "Update",
        name: "update",
        type: "json",
        displayOptions: {
          show: {
            operation: ["updateMany"],
          },
        },
        default: "{}",
        description: "Update operations to apply",
        placeholder: '{"$set": {"status": "inactive"}}',
      },
      {
        displayName: "Options",
        name: "options",
        type: "collection",
        placeholder: "Add Option",
        default: {},
        displayOptions: {
          show: {
            operation: ["updateMany"],
          },
        },
        options: [
          {
            displayName: "Upsert",
            name: "upsert",
            type: "boolean",
            default: false,
            description: "Whether to insert document if no match is found",
          },
          {
            displayName: "Array Filters",
            name: "arrayFilters",
            type: "json",
            default: "[]",
            description:
              "Array of filter documents for array update operations",
          },
          {
            displayName: "Convert _id to ObjectId",
            name: "convertIdToObjectId",
            type: "boolean",
            default: true,
            description: "Whether to automatically convert _id string fields to MongoDB ObjectId. Disable this if your collection uses string IDs instead of ObjectId.",
          },
        ],
      },

      // Find Options
      {
        displayName: "Options",
        name: "options",
        type: "collection",
        placeholder: "Add Option",
        default: {},
        displayOptions: {
          show: {
            operation: ["find"],
          },
        },
        options: [
          {
            displayName: "Limit",
            name: "limit",
            type: "number",
            default: 0,
            description:
              "Maximum number of documents to return (0 for no limit)",
          },
          {
            displayName: "Skip",
            name: "skip",
            type: "number",
            default: 0,
            description: "Number of documents to skip",
          },
          {
            displayName: "Sort",
            name: "sort",
            type: "json",
            default: "{}",
            description: "Sort specification",
            placeholder: '{"createdAt": -1}',
          },
          {
            displayName: "Projection",
            name: "projection",
            type: "json",
            default: "{}",
            description: "Fields to include/exclude",
            placeholder: '{"name": 1, "email": 1}',
          },
          {
            displayName: "Convert _id to ObjectId",
            name: "convertIdToObjectId",
            type: "boolean",
            default: true,
            description: "Whether to automatically convert _id string fields to MongoDB ObjectId. Disable this if your collection uses string IDs instead of ObjectId.",
          },
        ],
      },

      // Bulk Write Optionss
      {
        displayName: "Options",
        name: "options",
        type: "collection",
        placeholder: "Add Option",
        default: {},
        displayOptions: {
          show: {
            operation: ["deleteMany"],
          },
        },
        options: [
          {
            displayName: "Convert _id to ObjectId",
            name: "convertIdToObjectId",
            type: "boolean",
            default: true,
            description: "Whether to automatically convert _id string fields to MongoDB ObjectId. Disable this if your collection uses string IDs instead of ObjectId.",
          },
        ],
      },

      // Bulk Write Options
      {
        displayName: "Operations",
        name: "operations",
        type: "json",
        displayOptions: {
          show: {
            operation: ["bulkWrite"],
          },
        },
        default: "[]",
        description: "Array of bulk write operations",
        placeholder:
          '[{"insertOne": {"document": {"name": "John"}}}, {"updateOne": {"filter": {"_id": "123"}, "update": {"$set": {"status": "active"}}}}]',
      },
      {
        displayName: "Date Fields",
        name: "dateFields",
        type: "string",
        displayOptions: {
          show: {
            operation: ["bulkWrite"],
          },
        },
        default: "",
        description:
          "Comma-separated list of field names that should be converted to Date objects for insert/update operations (e.g., timestamp,createdAt,updatedAt)",
        placeholder: "timestamp,createdAt,updatedAt",
      },
      {
        displayName: "Options",
        name: "options",
        type: "collection",
        placeholder: "Add Option",
        default: {},
        displayOptions: {
          show: {
            operation: ["bulkWrite"],
          },
        },
        options: [
          {
            displayName: "Ordered",
            name: "ordered",
            type: "boolean",
            default: true,
            description: "Whether to execute operations in order",
          },
          {
            displayName: "Convert _id to ObjectId",
            name: "convertIdToObjectId",
            type: "boolean",
            default: true,
            description: "Whether to automatically convert _id string fields to MongoDB ObjectId. Disable this if your collection uses string IDs instead of ObjectId.",
          },
        ],
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const operation = this.getNodeParameter("operation", 0) as string;
    const collection = this.getNodeParameter("collection", 0) as string;

    // Get credentials
    const credentials = await this.getCredentials("mongoDb");

    // Build connection string
    let connectionString: string;
    if (credentials.configurationType === "connectionString") {
      connectionString = credentials.connectionString as string;
    } else {
      const protocol = "mongodb";
      const auth = credentials.user
        ? `${credentials.user}:${encodeURIComponent(
            credentials.password as string
          )}@`
        : "";
      const host = credentials.host || "localhost";
      const port = `:${credentials.port || 27017}`;
      connectionString = `${protocol}://${auth}${host}${port}`;
    }

    // Build MongoDB client options
    const clientOptions: any = {};

    // Handle server version compatibility
    const serverVersion = credentials.serverVersion || "4.2+";
    if (serverVersion === "4.0-") {
      // For MongoDB 4.0 and older, use legacy options
      clientOptions.useUnifiedTopology = true;
      clientOptions.useNewUrlParser = true;
    }

    // Add TLS options if enabled
    if (credentials.tls) {
      clientOptions.tls = true;
      if (credentials.ca) {
        clientOptions.tlsCAFile = credentials.ca;
      }
      if (credentials.cert) {
        clientOptions.tlsCertificateKeyFile = credentials.cert;
      }
      if (credentials.key) {
        clientOptions.tlsCertificateKeyFile = credentials.key;
      }
      if (credentials.passphrase) {
        clientOptions.tlsCertificateKeyFilePassword = credentials.passphrase;
      }
    }

    // Connect to MongoDB
    const client = new MongoClient(connectionString, clientOptions);

    try {
      await client.connect();
      const database = credentials.database
        ? client.db(credentials.database as string)
        : client.db();
      const mongoCollection = database.collection(collection);

      for (let i = 0; i < items.length; i++) {
        try {
          let result: any;

          switch (operation) {
            case "insertMany": {
              const documentsJson = this.getNodeParameter(
                "documents",
                i
              ) as string;
              const documents =
                typeof documentsJson === "string"
                  ? JSON.parse(documentsJson)
                  : documentsJson;
              const options = this.getNodeParameter("options", i, {}) as any;

              // Get date fields parameter
              const dateFieldsParam = this.getNodeParameter(
                "dateFields",
                i,
                ""
              ) as string;
              const dateFields = dateFieldsParam
                ? dateFieldsParam
                    .split(",")
                    .map((f) => f.trim())
                    .filter((f) => f.length > 0)
                : [];

              // Convert date fields if specified
              const processedDocuments = convertDateFields(
                documents,
                dateFields
              );

              result = await mongoCollection.insertMany(
                processedDocuments,
                options
              );
              break;
            }

            case "updateMany": {
              const filterJson = this.getNodeParameter("filter", i) as string;
              const filter =
                typeof filterJson === "string"
                  ? JSON.parse(filterJson)
                  : filterJson;
              const updateJson = this.getNodeParameter("update", i) as string;
              const update =
                typeof updateJson === "string"
                  ? JSON.parse(updateJson)
                  : updateJson;
              const options = this.getNodeParameter("options", i, {}) as any;
              
              // Get convertIdToObjectId option (default: true for backward compatibility)
              const convertIdToObjectId = options.convertIdToObjectId !== false;

              // Parse array filters if provided
              if (
                options.arrayFilters &&
                typeof options.arrayFilters === "string"
              ) {
                options.arrayFilters = JSON.parse(options.arrayFilters);
              }

              // Convert _id strings to ObjectId if needed
              if (convertIdToObjectId && filter._id && typeof filter._id === "string") {
                filter._id = new ObjectId(filter._id);
              }

              result = await mongoCollection.updateMany(
                filter,
                update,
                options
              );
              break;
            }

            case "deleteMany": {
              const filterJson = this.getNodeParameter("filter", i) as string;
              const filter =
                typeof filterJson === "string"
                  ? JSON.parse(filterJson)
                  : filterJson;
              const options = this.getNodeParameter("options", i, {}) as any;
              
              // Get convertIdToObjectId option (default: true for backward compatibility)
              const convertIdToObjectId = options.convertIdToObjectId !== false;

              // Convert _id strings to ObjectId if needed
              if (convertIdToObjectId && filter._id && typeof filter._id === "string") {
                filter._id = new ObjectId(filter._id);
              }

              result = await mongoCollection.deleteMany(filter);
              break;
            }

            case "find": {
              const filterJson = this.getNodeParameter("filter", i) as string;
              const filter =
                typeof filterJson === "string"
                  ? JSON.parse(filterJson)
                  : filterJson;
              const options = this.getNodeParameter("options", i, {}) as any;
              
              // Get convertIdToObjectId option (default: true for backward compatibility)
              const convertIdToObjectId = options.convertIdToObjectId !== false;

              // Convert _id strings to ObjectId if needed
              if (convertIdToObjectId && filter._id && typeof filter._id === "string") {
                filter._id = new ObjectId(filter._id);
              }

              let cursor = mongoCollection.find(filter);

              // Apply options
              if (options.limit) {
                cursor = cursor.limit(options.limit);
              }
              if (options.skip) {
                cursor = cursor.skip(options.skip);
              }
              if (options.sort) {
                const sort =
                  typeof options.sort === "string"
                    ? JSON.parse(options.sort)
                    : options.sort;
                cursor = cursor.sort(sort);
              }
              if (options.projection) {
                const projection =
                  typeof options.projection === "string"
                    ? JSON.parse(options.projection)
                    : options.projection;
                cursor = cursor.project(projection);
              }

              const documents = await cursor.toArray();

              // Return each document as a separate item
              for (const doc of documents) {
                returnData.push({
                  json: doc,
                  pairedItem: { item: i },
                });
              }
              continue; // Skip the normal returnData push
            }

            case "bulkWrite": {
              const operationsJson = this.getNodeParameter(
                "operations",
                i
              ) as string;
              const operations =
                typeof operationsJson === "string"
                  ? JSON.parse(operationsJson)
                  : operationsJson;
              const options = this.getNodeParameter("options", i, {}) as any;
              
              // Get convertIdToObjectId option (default: true for backward compatibility)
              const convertIdToObjectId = options.convertIdToObjectId !== false;

              // Get date fields parameter
              const dateFieldsParam = this.getNodeParameter(
                "dateFields",
                i,
                ""
              ) as string;
              const dateFields = dateFieldsParam
                ? dateFieldsParam
                    .split(",")
                    .map((f) => f.trim())
                    .filter((f) => f.length > 0)
                : [];

              // Process operations to convert _id strings to ObjectId and date fields
              const processedOperations = operations.map((op: any) => {
                const operation = { ...op };

                // Handle different operation types
                if (
                  convertIdToObjectId &&
                  operation.insertOne?.document?._id &&
                  typeof operation.insertOne.document._id === "string"
                ) {
                  operation.insertOne.document._id = new ObjectId(
                    operation.insertOne.document._id
                  );
                }

                // Convert date fields for insertOne
                if (operation.insertOne?.document) {
                  operation.insertOne.document = convertDateFields(
                    operation.insertOne.document,
                    dateFields
                  );
                }

                // Convert date fields for replaceOne
                if (operation.replaceOne?.replacement) {
                  operation.replaceOne.replacement = convertDateFields(
                    operation.replaceOne.replacement,
                    dateFields
                  );
                }

                // Convert date fields in updateOne $set operations
                if (operation.updateOne?.update?.$set) {
                  operation.updateOne.update.$set = convertDateFields(
                    operation.updateOne.update.$set,
                    dateFields
                  );
                }

                // Convert date fields in updateMany $set operations
                if (operation.updateMany?.update?.$set) {
                  operation.updateMany.update.$set = convertDateFields(
                    operation.updateMany.update.$set,
                    dateFields
                  );
                }

                if (
                  convertIdToObjectId &&
                  operation.updateOne?.filter?._id &&
                  typeof operation.updateOne.filter._id === "string"
                ) {
                  operation.updateOne.filter._id = new ObjectId(
                    operation.updateOne.filter._id
                  );
                }
                if (
                  convertIdToObjectId &&
                  operation.updateMany?.filter?._id &&
                  typeof operation.updateMany.filter._id === "string"
                ) {
                  operation.updateMany.filter._id = new ObjectId(
                    operation.updateMany.filter._id
                  );
                }
                if (
                  convertIdToObjectId &&
                  operation.deleteOne?.filter?._id &&
                  typeof operation.deleteOne.filter._id === "string"
                ) {
                  operation.deleteOne.filter._id = new ObjectId(
                    operation.deleteOne.filter._id
                  );
                }
                if (
                  convertIdToObjectId &&
                  operation.deleteMany?.filter?._id &&
                  typeof operation.deleteMany.filter._id === "string"
                ) {
                  operation.deleteMany.filter._id = new ObjectId(
                    operation.deleteMany.filter._id
                  );
                }
                if (
                  convertIdToObjectId &&
                  operation.replaceOne?.filter?._id &&
                  typeof operation.replaceOne.filter._id === "string"
                ) {
                  operation.replaceOne.filter._id = new ObjectId(
                    operation.replaceOne.filter._id
                  );
                }

                return operation;
              });

              result = await mongoCollection.bulkWrite(
                processedOperations,
                options
              );
              break;
            }

            default:
              throw new NodeOperationError(
                this.getNode(),
                `The operation "${operation}" is not supported!`
              );
          }

          returnData.push({
            json: result,
            pairedItem: { item: i },
          });
        } catch (error) {
          if (this.continueOnFail()) {
            returnData.push({
              json: {
                error: error instanceof Error ? error.message : String(error),
              },
              pairedItem: { item: i },
            });
            continue;
          }
          throw error;
        }
      }
    } finally {
      await client.close();
    }

    return [returnData];
  }
}
