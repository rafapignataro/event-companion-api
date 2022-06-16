"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorsController = void 0;
const PrismaVisitorsRepository_1 = require("../repositories/implementations/prisma/PrismaVisitorsRepository");
const PrismaCustomersRepository_1 = require("../repositories/implementations/prisma/PrismaCustomersRepository");
const PrismaEventsRepository_1 = require("../repositories/implementations/prisma/PrismaEventsRepository");
const create_visitor_use_case_1 = require("../useCases/visitors/create-visitor-use-case");
const find_all_visitors_use_case_1 = require("../useCases/visitors/find-all-visitors-use-case");
class VisitorsController {
    async create(request, response) {
        const prismaCustomersRepository = new PrismaCustomersRepository_1.PrismaCustomersRepository();
        const prismaVisitorsRepository = new PrismaVisitorsRepository_1.PrismaVisitorsRepository();
        const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository();
        const createVisitorUseCase = new create_visitor_use_case_1.CreateVisitorUseCase(prismaCustomersRepository, prismaVisitorsRepository, prismaEventsRepository);
        const { customerId, eventId } = request.body;
        const visitor = await createVisitorUseCase.execute({ customerId, eventId });
        return response.json(visitor);
    }
    async findAll(request, response) {
        const prismaVisitorsRepository = new PrismaVisitorsRepository_1.PrismaVisitorsRepository();
        const findVisitorsUseCase = new find_all_visitors_use_case_1.FindVisitorsUseCase(prismaVisitorsRepository);
        const { customerId, eventId } = request.query;
        const users = await findVisitorsUseCase.execute({
            customerId: customerId ? Number(customerId) : undefined,
            eventId: eventId ? Number(eventId) : undefined,
        });
        return response.json(users);
    }
}
exports.VisitorsController = VisitorsController;
