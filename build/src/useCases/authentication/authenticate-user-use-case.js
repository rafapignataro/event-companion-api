"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class AuthenticateUserUseCase {
    constructor(usersRepository, userTokenProvider, hashProvider) {
        this.usersRepository = usersRepository;
        this.userTokenProvider = userTokenProvider;
        this.hashProvider = hashProvider;
    }
    async execute({ email, password, }) {
        if (!email || !password) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new Error_1.APIError({
                code: 401,
                message: 'Email or password are incorrect.',
            });
        }
        const isPasswordCorret = await this.hashProvider.compare(password, user.password);
        if (!isPasswordCorret) {
            throw new Error_1.APIError({
                code: 401,
                message: 'Email or password are incorrect.',
            });
        }
        const userPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
        if (user.role === 'CUSTOMER') {
            userPayload.customerId = user.customer.id;
            userPayload.avatarColor = user.customer.avatarColor;
            userPayload.events = user.customer.visitors.map(visitor => ({
                visitorId: visitor.id,
                eventId: visitor.event.id,
            }));
        }
        const token = this.userTokenProvider.create(userPayload);
        return { token, user: userPayload };
    }
}
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;
