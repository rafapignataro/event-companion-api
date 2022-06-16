"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMarkerUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class DeleteMarkerUseCase {
    constructor(visitorsRepository, markersRepository, eventsRepository) {
        this.visitorsRepository = visitorsRepository;
        this.markersRepository = markersRepository;
        this.eventsRepository = eventsRepository;
    }
    async execute({ id }) {
        if (!id) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const visitorEventMarker = await this.markersRepository.findById(id);
        if (!visitorEventMarker) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This marker does not exist.',
            });
        }
        await this.markersRepository.delete(visitorEventMarker.id);
    }
}
exports.DeleteMarkerUseCase = DeleteMarkerUseCase;
