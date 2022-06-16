"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindVisitorsUseCase = void 0;
class FindVisitorsUseCase {
    constructor(visitorsRepository) {
        this.visitorsRepository = visitorsRepository;
    }
    async execute({ customerId, eventId }) {
        const visitors = await this.visitorsRepository.findAll({
            customerId,
            eventId,
        });
        return visitors;
    }
}
exports.FindVisitorsUseCase = FindVisitorsUseCase;
