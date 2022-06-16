"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class UpdateCustomerUseCase {
    constructor(usersRepository, customersRepository, userTokenProvider) {
        this.usersRepository = usersRepository;
        this.customersRepository = customersRepository;
        this.userTokenProvider = userTokenProvider;
    }
    async execute({ id, name, email, avatarColor, }) {
        if (!id || !name || !email) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const customer = await this.customersRepository.findById(id);
        if (!customer) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This customer does not exist.',
            });
        }
        if (avatarColor) {
            const isAvatarColorCorrect = avatarColor.length === 7 && avatarColor.includes('#');
            if (!isAvatarColorCorrect) {
                throw new Error_1.APIError({
                    code: 500,
                    message: 'The avatar color passed is wrong. Ex.: #59FFFF',
                });
            }
        }
        await this.usersRepository.update(customer.userId, {
            name,
            email,
        });
        await this.customersRepository.update(id, {
            avatarColor: avatarColor || customer.avatarColor,
        });
        const userPayload = {
            id: customer.userId,
            email,
            name,
            role: 'CUSTOMER',
            customerId: customer.id,
            avatarColor,
            events: customer.visitors.map(visitor => ({
                visitorId: visitor.id,
                eventId: visitor.event.id,
            }))
        };
        const token = this.userTokenProvider.create(userPayload);
        return { token, user: userPayload };
    }
}
exports.UpdateCustomerUseCase = UpdateCustomerUseCase;
