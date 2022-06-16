"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchForCustomersUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class SearchForCustomersUseCase {
    constructor(customersRepository) {
        this.customersRepository = customersRepository;
    }
    async execute({ text }) {
        if (text === null || text === undefined || text === 'null' || text === 'undefined') {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        if (text === '') {
            throw new Error_1.APIError({
                code: 500,
                message: 'Please, provide any information to search.',
            });
        }
        const customers = await this.customersRepository.search(text);
        return customers;
    }
}
exports.SearchForCustomersUseCase = SearchForCustomersUseCase;
