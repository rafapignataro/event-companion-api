"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class CreateUserUseCase {
    constructor(usersRepository, hashProvider) {
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
    }
    async execute({ email, name, password, role }) {
        if (!email || !name || !password) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This email is already in use.',
            });
        }
        if (password.length < 6) {
            throw new Error_1.APIError({
                code: 500,
                message: 'The password must have more than 6 letters.',
            });
        }
        const passwordHash = await this.hashProvider.create(password);
        const user = await this.usersRepository.create({
            email,
            name,
            password: passwordHash,
            role
        });
        return user;
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
