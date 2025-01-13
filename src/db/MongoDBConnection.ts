import mongoose from "mongoose";
import UserModel from "../modules/login/user/UserModel";
import { AuthService } from "../modules/login/auth/AuthService";
import { UserRepository } from "../modules/login/user/UserRepository";

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
      await mongoose.connect(uri);
      this.connected = true;
      const ur = new UserRepository;
      const as = new AuthService(ur);
      await as.register(
        {email: "admin@admin.com",
        name: "admin",
        username: "admin",
        password: "admin"}
      )
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
