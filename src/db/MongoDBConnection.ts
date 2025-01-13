import mongoose from "mongoose";

export class MongoDBConnection {
  private static instance: MongoDBConnection;
  private connected = false;

  private constructor() {}

  static getInstance(): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection();
    }
    return MongoDBConnection.instance;
  }

  async connect(uri: string): Promise<void> {
    if (this.connected) return;

    try {
      await mongoose.connect(uri, {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        sanitizeFilter: true
      });
      this.connected = true;
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
      process.exit(1);
    }
  }

  disconnect(): void {
    if (this.connected) {
      mongoose.disconnect();
      this.connected = false;
      console.log("Disconnected from MongoDB");
    }
  }
}
