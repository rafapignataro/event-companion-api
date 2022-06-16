"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindEventByIdUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class FindEventByIdUseCase {
    constructor(eventsRepository) {
        this.eventsRepository = eventsRepository;
    }
    async execute({ id, }) {
        if (!id) {
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
        return event;
    }
}
exports.FindEventByIdUseCase = FindEventByIdUseCase;
