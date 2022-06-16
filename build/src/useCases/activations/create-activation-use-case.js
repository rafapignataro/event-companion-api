"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateActivationUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class CreateActivationUseCase {
    constructor(activationsRepository, locationsRepository, eventsRepository) {
        this.activationsRepository = activationsRepository;
        this.locationsRepository = locationsRepository;
        this.eventsRepository = eventsRepository;
    }
    async execute({ description, startDate, endDate, locationId, }) {
        if (!description || !startDate || !endDate || !locationId) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const locationExists = await this.locationsRepository.findById(locationId);
        if (!locationExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This location does not exist.',
            });
        }
        const activation = await this.activationsRepository.create({
            description,
            startDate,
            endDate,
            locationId,
        });
        const location = await this.locationsRepository.findById(locationId);
        await this.eventsRepository.updateVersion(location.eventId);
        return activation;
    }
}
exports.CreateActivationUseCase = CreateActivationUseCase;
