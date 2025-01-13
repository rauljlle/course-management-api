"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./modules/login/routes"));
const routes_2 = __importDefault(require("./modules/courses/routes"));
const DBConnector_1 = require("./db/DBConnector");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/login", routes_1.default);
app.use("/courses", routes_2.default);
try {
    (0, DBConnector_1.connectInMemoryDB)();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}
