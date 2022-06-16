"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BCryptHashProvider = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class BCryptHashProvider {
    async create(string) {
        return bcryptjs_1.default.hash(string, 16);
    }
    async compare(string, hash) {
        return bcryptjs_1.default.compare(string, hash);
    }
}
exports.BCryptHashProvider = BCryptHashProvider;
