"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class CreateCustomerUseCase {
    constructor(usersRepository, customersRepository, hashProvider) {
        this.usersRepository = usersRepository;
        this.customersRepository = customersRepository;
        this.hashProvider = hashProvider;
    }
    async execute({ name, email, password, passwordRepeated, avatarColor, }) {
        if (!name || !email || !password) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        if (password !== passwordRepeated) {
            throw new Error_1.APIError({
                code: 500,
                message: 'The passwords provided must be the same.'
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
        if (avatarColor) {
            const isAvatarColorCorrect = avatarColor.length === 7 && avatarColor.includes('#');
            if (!isAvatarColorCorrect) {
                throw new Error_1.APIError({
                    code: 500,
                    message: 'The avatar color passed is wrong. Ex.: #59FFFF',
                });
            }
        }
        const user = await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            role: 'CUSTOMER',
        });
        const customer = await this.customersRepository.create({
            userId: user.id,
            avatarColor: avatarColor || '#59FFFF',
        });
        return customer;
    }
}
exports.CreateCustomerUseCase = CreateCustomerUseCase;
