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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const JWTUtil_1 = require("../../../utils/JWTUtil");
const PasswordUtil_1 = require("../../../utils/PasswordUtil");
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    login(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(loginData.email);
            if (!user || !(yield PasswordUtil_1.PasswordUtils.comparePasswords(loginData.password, user.password))) {
                throw new Error("Invalid email or password");
            }
            return JWTUtil_1.JWTUtils.generateToken({ id: user._id, email: user.email });
        });
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUserEmail = yield this.userRepository.findByEmail(userData.email);
            if (existingUserEmail) {
                throw new Error("Email already in use");
            }
            const existingUsername = yield this.userRepository.findByUsername(userData.username);
            if (existingUsername) {
                throw new Error("Username already in use");
            }
            const hashedPassword = yield PasswordUtil_1.PasswordUtils.hashPassword(userData.password);
            const user = yield this.userRepository.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
            return JWTUtil_1.JWTUtils.generateToken({ id: user._id, email: user.email });
        });
    }
}
exports.AuthService = AuthService;
