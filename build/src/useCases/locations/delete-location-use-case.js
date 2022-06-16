"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteLocationUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class DeleteLocationUseCase {
    constructor(locationsRepository, eventsRepository) {
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
        const locationExists = await this.locationsRepository.findById(id);
        if (!locationExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This location does not exist.',
            });
        }
        await this.locationsRepository.delete(locationExists.id);
        await this.eventsRepository.updateVersion(locationExists.eventId);
    }
}
exports.DeleteLocationUseCase = DeleteLocationUseCase;
