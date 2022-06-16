"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindActivationsUseCase = void 0;
class FindActivationsUseCase {
    constructor(activationsRepository) {
        this.activationsRepository = activationsRepository;
    }
    async execute({ locationId }) {
        const activations = await this.activationsRepository.findAll({
            locationId,
        });
        return activations;
    }
}
exports.FindActivationsUseCase = FindActivationsUseCase;
