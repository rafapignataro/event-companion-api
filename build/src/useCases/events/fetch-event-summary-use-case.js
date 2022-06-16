"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchEventSummaryUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class FetchEventSummaryUseCase {
    constructor(eventsRepository) {
        this.eventsRepository = eventsRepository;
    }
    async execute({ id, version, }) {
        if (!id || !version) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const eventSummary = await this.eventsRepository.summary(id);
        if (!eventSummary) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This event does not exist.',
            });
        }
        if (version > eventSummary.version) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This event version does not exist.',
            });
        }
        if (version === eventSummary.version)
            return null;
        return eventSummary;
    }
}
exports.FetchEventSummaryUseCase = FetchEventSummaryUseCase;
