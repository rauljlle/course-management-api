import express from "express";
import dotenv from "dotenv";
import authRoutes from "./modules/login/routes";
import { MongoDBConnection } from "./db/MongoDBConnection";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI || "";

app.use(express.json());

app.use("/auth", authRoutes);




(async () => {
  try {
    // Initialize MongoDB connection
    await MongoDBConnection.getInstance().connect(DB_URI);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the application", error);
  }
})();
