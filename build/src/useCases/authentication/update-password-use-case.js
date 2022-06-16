"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class UpdatePasswordUseCase {
    constructor(usersRepository, hashProvider) {
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
    }
    async execute({ userId, oldPassword, newPassword, newPasswordRepeated, }) {
        if (!userId || !oldPassword || !newPassword || !newPasswordRepeated) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This user does not exist.',
            });
        }
        const isPasswordCorrect = await this.hashProvider.compare(oldPassword, user.password);
        if (!isPasswordCorrect) {
            throw new Error_1.APIError({
                code: 500,
                message: 'The old password is not correct.',
            });
        }
        if (newPassword !== newPasswordRepeated) {
            throw new Error_1.APIError({
                code: 500,
                message: 'The new passwords are not equal.',
            });
        }
        if (newPassword.length < 6) {
            throw new Error_1.APIError({
                code: 500,
                message: 'The password must have more than 6 letters.',
            });
        }
        const passwordHash = await this.hashProvider.create(newPassword);
        await this.usersRepository.updatePassword(userId, {
            password: passwordHash,
        });
    }
}
exports.UpdatePasswordUseCase = UpdatePasswordUseCase;
