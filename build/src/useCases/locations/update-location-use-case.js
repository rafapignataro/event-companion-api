"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLocationUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class UpdateLocationUseCase {
    constructor(locationsRepository, eventsRepository, brandsRepository, locationCategoriesRepository) {
        this.locationsRepository = locationsRepository;
        this.eventsRepository = eventsRepository;
        this.brandsRepository = brandsRepository;
        this.locationCategoriesRepository = locationCategoriesRepository;
    }
    async execute({ id, name, description, latitude, longitude, eventId, brandId, locationCategoryCode, }) {
        if (!id || !name || !eventId || !locationCategoryCode || !latitude || !longitude) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const locationExists = await this.locationsRepository.findById(id);
        if (!locationExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This location does not exist.',
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
        if (brandId || brandId === null) {
            if (brandId) {
                const brandExists = await this.brandsRepository.findById(brandId);
                if (!brandExists) {
                    throw new Error_1.APIError({
                        code: 500,
                        message: 'This brand does not exist.',
                    });
                }
            }
        }
        await this.locationsRepository.update(locationExists.id, {
            name,
            description,
            latitude,
            longitude,
            eventId,
            brandId,
            locationCategoryId: locationCategoryExists.id,
        });
        await this.eventsRepository.updateVersion(eventId);
    }
}
exports.UpdateLocationUseCase = UpdateLocationUseCase;
