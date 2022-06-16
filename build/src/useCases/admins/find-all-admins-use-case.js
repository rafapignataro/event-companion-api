"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllAdminsUseCase = void 0;
class FindAllAdminsUseCase {
    constructor(adminsRepository) {
        this.adminsRepository = adminsRepository;
    }
    async execute() {
        const admins = await this.adminsRepository.findAll();
        return admins;
    }
}
exports.FindAllAdminsUseCase = FindAllAdminsUseCase;
