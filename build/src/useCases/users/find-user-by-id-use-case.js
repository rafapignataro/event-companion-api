"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserByIdUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class FindUserByIdUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ id, }) {
        if (!id) {
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
        return user;
    }
}
exports.FindUserByIdUseCase = FindUserByIdUseCase;
