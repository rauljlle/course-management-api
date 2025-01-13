import express from "express";
import dotenv from "dotenv";
import authRoutes from "./modules/login/routes";
import coursesRoutes from "./modules/courses/routes";
import { connectInMemoryDB } from "./db/DBConnector";
import UserModel from "./modules/login/user/UserModel";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/login", authRoutes);
app.use("/courses", coursesRoutes);


try{
    connectInMemoryDB();

    UserModel.create({
        email: "admin@admin.com",
        name: "admin",
        username: "admin",
        password: "admin"
    });

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
catch(error){
    if (error instanceof Error){
        console.log(error.message);
    }
}