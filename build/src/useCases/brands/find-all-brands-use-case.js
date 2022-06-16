"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllBrandsUseCase = void 0;
class FindAllBrandsUseCase {
    constructor(brandsRepository) {
        this.brandsRepository = brandsRepository;
    }
    async execute() {
        const brands = await this.brandsRepository.findAll();
        return brands;
    }
}
exports.FindAllBrandsUseCase = FindAllBrandsUseCase;
