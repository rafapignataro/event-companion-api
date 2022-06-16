"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const Error_1 = require("../helpers/Error");
const jwtUserTokenProvider_1 = require("../providers/userTokenProvider/implementations/jwtUserTokenProvider");
const ensure_authenticated_user_case_1 = require("../useCases/authentication/ensure-authenticated-user-case");
async function ensureAuthenticated(request, response, next) {
    const jwtUserTokenProvider = new jwtUserTokenProvider_1.JwtUserTokenProvider();
    const ensureAuthenticatedUseCase = new ensure_authenticated_user_case_1.EnsureAuthenticatedUseCase(jwtUserTokenProvider);
    const bearerToken = request.headers.authorization;
    if (!bearerToken) {
        throw new Error_1.APIError({
            code: 401,
            message: 'Not authenticated.',
        });
    }
    const [, token] = bearerToken.split(' ');
    await ensureAuthenticatedUseCase.execute({ token });
    const payload = jwtUserTokenProvider.decode(token);
    request.user = {
        id: payload.id,
        email: payload.email,
        name: payload.name,
        role: payload.role,
    };
    return next();
}
exports.ensureAuthenticated = ensureAuthenticated;
