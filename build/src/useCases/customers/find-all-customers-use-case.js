"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllCustomersUseCase = void 0;
class FindAllCustomersUseCase {
    constructor(customersRepository) {
        this.customersRepository = customersRepository;
    }
    async execute() {
        const customers = await this.customersRepository.findAll();
        return customers;
    }
}
exports.FindAllCustomersUseCase = FindAllCustomersUseCase;
