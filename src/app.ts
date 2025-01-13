import express from "express";
import dotenv from "dotenv";
import authRoutes from "./modules/login/routes";
import coursesRoutes from "./modules/courses/routes";
import { connectInMemoryDB } from "./db/DBConnector";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/login", authRoutes);
app.use("/courses", coursesRoutes);


try{
    connectInMemoryDB();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
catch(error){
    if (error instanceof Error){
        console.log(error.message);
    }
}