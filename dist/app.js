"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./modules/login/routes"));
const MongoDBConnection_1 = require("./db/MongoDBConnection");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI || "";
app.use(express_1.default.json());
app.use("/auth", routes_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Initialize MongoDB connection
        yield MongoDBConnection_1.MongoDBConnection.getInstance().connect(DB_URI);
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start the application", error);
    }
}))();
