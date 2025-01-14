import express from "express";
import dotenv from "dotenv";
import authRoutes from "./modules/login/routes";
import coursesRoutes from "./modules/courses/routes";
import { connectInMemoryDB } from "./db/DBConnector";
import { getErrorMessage } from "./utils/ErrorMessageUtil";
import { authenticate } from "./modules/login/auth/AuthMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/login", authRoutes);
app.use(
  "/courses",
  (res, req, next) => {
    authenticate(res, req, next);
  },
  coursesRoutes,
);

try {
  connectInMemoryDB();

  if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
} catch (error) {
  console.log(getErrorMessage(error));
}

export default app;
