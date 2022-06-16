"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class CreateEventUseCase {
    constructor(eventsRepository, eventCategoriesRepository) {
        this.eventsRepository = eventsRepository;
        this.eventCategoriesRepository = eventCategoriesRepository;
    }
    async execute({ name, startDate, endDate, logoURL, eventCategoryCode, }) {
        if (!name || !startDate || !endDate || !eventCategoryCode) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const locationCategoryExists = await this.eventCategoriesRepository.findByCode(eventCategoryCode);
        if (!locationCategoryExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This event category does not exist.',
            });
        }
        // TODO: Compare dates;
        const event = await this.eventsRepository.create({
            name,
            startDate,
            endDate,
            logoURL,
            eventCategoryId: locationCategoryExists.id,
        });
        return event;
    }
}
exports.CreateEventUseCase = CreateEventUseCase;
