"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindLocationsUseCase = void 0;
class FindLocationsUseCase {
    constructor(locationsRepository) {
        this.locationsRepository = locationsRepository;
    }
    async execute({ role, eventId, brandId }) {
        const locations = await this.locationsRepository.findAll({
            authorized: role === 'ADMIN' || role === 'BRAND',
            eventId,
            brandId,
        });
        return locations;
    }
}
exports.FindLocationsUseCase = FindLocationsUseCase;
