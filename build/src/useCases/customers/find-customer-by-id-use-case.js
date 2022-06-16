"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindCustomerByIdUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class FindCustomerByIdUseCase {
    constructor(customersRepository) {
        this.customersRepository = customersRepository;
    }
    async execute({ id, }) {
        if (!id) {
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
        return customer;
    }
}
exports.FindCustomerByIdUseCase = FindCustomerByIdUseCase;
