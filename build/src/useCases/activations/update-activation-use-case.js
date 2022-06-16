"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateActivationUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class UpdateActivationUseCase {
    constructor(activationsRepository, locationsRepository, eventsRepository) {
        this.activationsRepository = activationsRepository;
        this.locationsRepository = locationsRepository;
        this.eventsRepository = eventsRepository;
    }
    async execute({ id, description, startDate, endDate, locationId, }) {
        if (!id || !description || !startDate || !endDate || !locationId) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const activationExists = await this.activationsRepository.findById(id);
        if (!activationExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This activation does not exist.',
            });
        }
        const locationExists = await this.locationsRepository.findById(locationId);
        if (!locationExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This location does not exist.',
            });
        }
        await this.activationsRepository.update(activationExists.id, {
            description,
            startDate,
            endDate,
        });
        const location = await this.locationsRepository.findById(locationId);
        await this.eventsRepository.updateVersion(location.eventId);
    }
}
exports.UpdateActivationUseCase = UpdateActivationUseCase;
