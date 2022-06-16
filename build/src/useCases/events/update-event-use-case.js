"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEventUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class UpdateEventUseCase {
    constructor(eventsRepository, eventCategoriesRepository) {
        this.eventsRepository = eventsRepository;
        this.eventCategoriesRepository = eventCategoriesRepository;
    }
    async execute({ id, name, startDate, endDate, logoURL, eventCategoryCode, }) {
        if (!id || !name || !startDate || !endDate || !eventCategoryCode) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const event = await this.eventsRepository.findById(id);
        if (!event) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This event does not exist.',
            });
        }
        const locationCategoryExists = await this.eventCategoriesRepository.findByCode(eventCategoryCode);
        if (!locationCategoryExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This event category does not exist.',
            });
        }
        await this.eventsRepository.update(id, {
            name,
            startDate,
            endDate,
            logoURL,
            eventCategoryId: locationCategoryExists.id,
        });
    }
}
exports.UpdateEventUseCase = UpdateEventUseCase;
