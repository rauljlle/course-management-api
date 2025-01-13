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
exports.MongoDBConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AuthService_1 = require("../modules/login/auth/AuthService");
const UserRepository_1 = require("../modules/login/user/UserRepository");
class MongoDBConnection {
    constructor() {
        this.connected = false;
    }
    static getInstance() {
        if (!MongoDBConnection.instance) {
            MongoDBConnection.instance = new MongoDBConnection();
        }
        return MongoDBConnection.instance;
    }
    connect(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connected)
                return;
            try {
                yield mongoose_1.default.connect(uri);
                this.connected = true;
                const ur = new UserRepository_1.UserRepository;
                const as = new AuthService_1.AuthService(ur);
                yield as.register({ email: "admin@admin.com",
                    name: "admin",
                    username: "admin",
                    password: "admin" });
                console.log("Connected to MongoDB");
            }
            catch (error) {
                console.error("Failed to connect to MongoDB", error);
                process.exit(1);
            }
        });
    }
    disconnect() {
        if (this.connected) {
            mongoose_1.default.disconnect();
            this.connected = false;
            console.log("Disconnected from MongoDB");
        }
    }
}
exports.MongoDBConnection = MongoDBConnection;
