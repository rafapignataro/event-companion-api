"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const jwtUserTokenProvider_1 = require("../providers/userTokenProvider/implementations/jwtUserTokenProvider");
const bcryptHashProvider_1 = require("../providers/hashProvider/implementations/bcryptHashProvider");
const PrismaUsersRepository_1 = require("../repositories/implementations/prisma/PrismaUsersRepository");
const authenticate_user_use_case_1 = require("../useCases/authentication/authenticate-user-use-case");
const update_password_use_case_1 = require("../useCases/authentication/update-password-use-case");
class AuthenticationController {
    async authenticate(request, response) {
        const prismaUsersRepository = new PrismaUsersRepository_1.PrismaUsersRepository();
        const jwtUserTokenProvider = new jwtUserTokenProvider_1.JwtUserTokenProvider();
        const bcryptHashProvider = new bcryptHashProvider_1.BCryptHashProvider();
        const authenticateUserUseCase = new authenticate_user_use_case_1.AuthenticateUserUseCase(prismaUsersRepository, jwtUserTokenProvider, bcryptHashProvider);
        const { email, password } = request.body;
        const { token, user } = await authenticateUserUseCase.execute({ email, password });
        return response.json({ token, user });
    }
    async updatePassword(request, response) {
        const prismaUsersRepository = new PrismaUsersRepository_1.PrismaUsersRepository();
        const bcryptHashProvider = new bcryptHashProvider_1.BCryptHashProvider();
        const updatePasswordUseCase = new update_password_use_case_1.UpdatePasswordUseCase(prismaUsersRepository, bcryptHashProvider);
        const { userId } = request.params;
        const { oldPassword, newPassword, newPasswordRepeated } = request.body;
        await updatePasswordUseCase.execute({
            userId: Number(userId), oldPassword, newPassword, newPasswordRepeated,
        });
        return response.json();
    }
    async status(request, response) {
        return response.json();
    }
}
exports.AuthenticationController = AuthenticationController;
