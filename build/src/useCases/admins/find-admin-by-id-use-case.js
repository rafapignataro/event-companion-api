"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAdminByIdUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class FindAdminByIdUseCase {
    constructor(adminsRepository) {
        this.adminsRepository = adminsRepository;
    }
    async execute({ id, }) {
        if (!id) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const admin = await this.adminsRepository.findById(id);
        if (!admin) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This admin does not exist.',
            });
        }
        return admin;
    }
}
exports.FindAdminByIdUseCase = FindAdminByIdUseCase;
