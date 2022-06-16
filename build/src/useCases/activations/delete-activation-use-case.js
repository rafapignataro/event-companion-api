"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteActivationUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class DeleteActivationUseCase {
    constructor(activationsRepository, locationsRepository, eventsRepository) {
        this.activationsRepository = activationsRepository;
        this.locationsRepository = locationsRepository;
        this.eventsRepository = eventsRepository;
    }
    async execute({ id, }) {
        if (!id) {
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
        await this.activationsRepository.delete(activationExists.id);
        const location = await this.locationsRepository.findById(activationExists.locationId);
        await this.eventsRepository.updateVersion(location.eventId);
    }
}
exports.DeleteActivationUseCase = DeleteActivationUseCase;
