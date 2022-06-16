"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class UpdateUserUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ id, email, name, }) {
        if (!id || !email || !name) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This user does not exist.',
            });
        }
        const userEmailAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userEmailAlreadyExists && userEmailAlreadyExists.id !== id) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This email is already in use.',
            });
        }
        await this.usersRepository.update(id, {
            name,
            email,
        });
    }
}
exports.UpdateUserUseCase = UpdateUserUseCase;
