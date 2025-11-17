import {
  ICredentialType,
  INodeProperties,
  ICredentialTestRequest,
} from "n8n-workflow";

export class MongoDbCredentials implements ICredentialType {
  name = "mongoDbCredentials";
  displayName = "MongoDB Bulk";
  documentationUrl = "mongodb";
  properties: INodeProperties[] = [
    {
      displayName: "Configuration Type",
      name: "configurationType",
      type: "options",
      options: [
        {
          name: "Connection String",
          value: "connectionString",
        },
        {
          name: "Values",
          value: "values",
        },
      ],
      default: "connectionString",
      description: "How to configure the MongoDB connection",
    },
    {
      displayName: "Connection String",
      name: "connectionString",
      type: "string",
      displayOptions: {
        show: {
          configurationType: ["connectionString"],
        },
      },
      default: "",
      placeholder: "mongodb://username:password@localhost:27017/database",
      description:
        "The MongoDB connection string. For Atlas: mongodb+srv://username:password@cluster.mongodb.net/database",
    },
    {
      displayName: "Host",
      name: "host",
      type: "string",
      displayOptions: {
        show: {
          configurationType: ["values"],
        },
      },
      default: "localhost",
      description: "MongoDB server hostname or IP address",
    },
    {
      displayName: "Port",
      name: "port",
      type: "number",
      displayOptions: {
        show: {
          configurationType: ["values"],
        },
      },
      default: 27017,
      description: "MongoDB server port (default: 27017)",
    },
    {
      displayName: "Database",
      name: "database",
      type: "string",
      displayOptions: {
        show: {
          configurationType: ["values"],
        },
      },
      default: "",
      placeholder: "myDatabase",
      description: "The name of the database to connect to",
    },
    {
      displayName: "User",
      name: "user",
      type: "string",
      displayOptions: {
        show: {
          configurationType: ["values"],
        },
      },
      default: "",
      description: "MongoDB username (leave empty for no authentication)",
    },
    {
      displayName: "Password",
      name: "password",
      type: "string",
      typeOptions: {
        password: true,
      },
      displayOptions: {
        show: {
          configurationType: ["values"],
        },
      },
      default: "",
      description: "MongoDB password",
    },
    {
      displayName: "Use TLS/SSL",
      name: "tls",
      type: "boolean",
      displayOptions: {
        show: {
          configurationType: ["values"],
        },
      },
      default: false,
      description:
        "Whether to use TLS/SSL for the connection (required for MongoDB Atlas)",
    },
    {
      displayName: "MongoDB Server Version",
      name: "serverVersion",
      type: "options",
      options: [
        {
          name: "4.2 or Higher",
          value: "4.2+",
          description: "Use for MongoDB 4.2 and above (default)",
        },
        {
          name: "4.0 or Lower",
          value: "4.0-",
          description: "Use for MongoDB 4.0, 3.6, and older versions",
        },
      ],
      default: "4.2+",
      description:
        'Select your MongoDB server version for driver compatibility. Choose "4.0 or Lower" if connecting to MongoDB 4.0.x or earlier.',
    },
  ];
}
