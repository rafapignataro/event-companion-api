"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLocationUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class CreateLocationUseCase {
    constructor(locationsRepository, brandsRepository, eventsRepository, locationCategoriesRepository) {
        this.locationsRepository = locationsRepository;
        this.brandsRepository = brandsRepository;
        this.eventsRepository = eventsRepository;
        this.locationCategoriesRepository = locationCategoriesRepository;
    }
    async execute({ name, description, latitude, longitude, eventId, brandId, locationCategoryCode, }) {
        if (!name || !eventId || !locationCategoryCode || !latitude || !longitude) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const eventExists = await this.eventsRepository.findById(eventId);
        if (!eventExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This event does not exist.',
            });
        }
        const locationCategoryExists = await this.locationCategoriesRepository.findByCode(locationCategoryCode);
        if (!locationCategoryExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This location category does not exist.',
            });
        }
        if (brandId) {
            const brandExists = await this.brandsRepository.findById(brandId);
            if (!brandExists) {
                throw new Error_1.APIError({
                    code: 500,
                    message: 'This brand does not exist.',
                });
            }
        }
        const location = await this.locationsRepository.create({
            name,
            description,
            latitude,
            longitude,
            eventId,
            brandId,
            locationCategoryId: locationCategoryExists.id,
        });
        await this.eventsRepository.updateVersion(eventId);
        return location;
    }
}
exports.CreateLocationUseCase = CreateLocationUseCase;
