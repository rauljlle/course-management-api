import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoDBConnection } from "./MongoDBConnection";

let mongoServer: MongoMemoryServer;
let mongoConnection: MongoDBConnection;

export const connectInMemoryDB = async (): Promise<void> => {
  mongoServer = await MongoMemoryServer.create();
  mongoConnection = await MongoDBConnection.getInstance();

  const uri = mongoServer.getUri();

  await mongoConnection.connect(uri);
};

export const disconnectInMemoryDB = async (): Promise<void> => {
  mongoConnection = await MongoDBConnection.getInstance();
  await mongoConnection.disconnect();
  await mongoServer.stop();
};
