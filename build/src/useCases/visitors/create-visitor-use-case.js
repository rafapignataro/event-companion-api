"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVisitorUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class CreateVisitorUseCase {
    constructor(customersRepository, visitorsRepository, eventsRepository) {
        this.customersRepository = customersRepository;
        this.visitorsRepository = visitorsRepository;
        this.eventsRepository = eventsRepository;
    }
    async execute({ customerId, eventId, }) {
        if (!customerId || !eventId) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const customerExists = await this.customersRepository.findById(customerId);
        if (!customerExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This customer does not exist.',
            });
        }
        const eventExists = await this.eventsRepository.findById(eventId);
        if (!eventExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This event does not exist.',
            });
        }
        const visitorRelationExists = await this.visitorsRepository.findByCustomerAndEventId(customerId, eventId);
        if (visitorRelationExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This customer is already in this event.',
            });
        }
        const visitor = await this.visitorsRepository.create({
            customerId,
            eventId,
        });
        return visitor;
    }
}
exports.CreateVisitorUseCase = CreateVisitorUseCase;
