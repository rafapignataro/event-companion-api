"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMarkerUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class UpdateMarkerUseCase {
    constructor(visitorsRepository, markersRepository, eventsRepository) {
        this.visitorsRepository = visitorsRepository;
        this.markersRepository = markersRepository;
        this.eventsRepository = eventsRepository;
    }
    async execute({ visitorId, eventId, latitude, longitude, }) {
        if (!visitorId || !eventId || !latitude || !longitude) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const visitorExists = await this.visitorsRepository.findById(visitorId);
        if (!visitorExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This visitor does not exist.',
            });
        }
        const eventExists = await this.eventsRepository.findById(eventId);
        if (!eventExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This event does not exist.',
            });
        }
        const visitorEventMarker = await this.markersRepository.findByVisitorAndEventId(visitorId, eventId);
        if (!visitorEventMarker) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This visitor does not have a marker in this event.',
            });
        }
        await this.markersRepository.update(visitorEventMarker.id, {
            latitude,
            longitude,
        });
    }
}
exports.UpdateMarkerUseCase = UpdateMarkerUseCase;
