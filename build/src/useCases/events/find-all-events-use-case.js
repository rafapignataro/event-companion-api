"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllEventsUseCase = void 0;
class FindAllEventsUseCase {
    constructor(eventsRepository) {
        this.eventsRepository = eventsRepository;
    }
    async execute() {
        const events = await this.eventsRepository.findAll();
        return events;
    }
}
exports.FindAllEventsUseCase = FindAllEventsUseCase;
