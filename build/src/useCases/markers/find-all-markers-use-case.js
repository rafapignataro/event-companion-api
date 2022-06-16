"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindMarkersUseCase = void 0;
class FindMarkersUseCase {
    constructor(markersRepository) {
        this.markersRepository = markersRepository;
    }
    async execute({ visitorId, eventId }) {
        const markers = await this.markersRepository.findAll({
            eventId,
            visitorId,
        });
        return markers;
    }
}
exports.FindMarkersUseCase = FindMarkersUseCase;
