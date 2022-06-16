"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnsureAuthenticatedUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class EnsureAuthenticatedUseCase {
    constructor(userTokenProvider) {
        this.userTokenProvider = userTokenProvider;
    }
    async execute({ token, }) {
        if (!token) {
            throw new Error_1.APIError({
                code: 401,
                message: 'Not authenticated.',
            });
        }
        const isAuthenticated = this.userTokenProvider.validate(token);
        if (!isAuthenticated) {
            throw new Error_1.APIError({
                code: 401,
                message: 'Not authenticated.',
            });
        }
    }
}
exports.EnsureAuthenticatedUseCase = EnsureAuthenticatedUseCase;
