"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindBrandByIdUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class FindBrandByIdUseCase {
    constructor(brandsRepository) {
        this.brandsRepository = brandsRepository;
    }
    async execute({ id, }) {
        if (!id) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const brand = await this.brandsRepository.findById(id);
        if (!brand) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This brand does not exist.',
            });
        }
        return brand;
    }
}
exports.FindBrandByIdUseCase = FindBrandByIdUseCase;
