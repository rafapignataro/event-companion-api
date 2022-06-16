"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
const PrismaEventsRepository_1 = require("../repositories/implementations/prisma/PrismaEventsRepository");
const PrismaEventCategoriesRepository_1 = require("../repositories/implementations/prisma/PrismaEventCategoriesRepository");
const create_event_use_case_1 = require("../useCases/events/create-event-use-case");
const update_event_use_case_1 = require("../useCases/events/update-event-use-case");
const find_event_by_id_use_case_1 = require("../useCases/events/find-event-by-id-use-case");
const find_all_events_use_case_1 = require("../useCases/events/find-all-events-use-case");
const fetch_event_summary_use_case_1 = require("../useCases/events/fetch-event-summary-use-case");
class EventsController {
    async create(request, response) {
        const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository();
        const prismaEventCategoriesRepository = new PrismaEventCategoriesRepository_1.PrismaEventCategoriesRepository();
        const createEventUseCase = new create_event_use_case_1.CreateEventUseCase(prismaEventsRepository, prismaEventCategoriesRepository);
        const { name, startDate, endDate, logoURL, eventCategoryCode, } = request.body;
        const event = await createEventUseCase.execute({
            name, startDate, endDate, logoURL, eventCategoryCode,
        });
        return response.json(event);
    }
    async update(request, response) {
        const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository();
        const prismaEventCategoriesRepository = new PrismaEventCategoriesRepository_1.PrismaEventCategoriesRepository();
        const updateEventUseCase = new update_event_use_case_1.UpdateEventUseCase(prismaEventsRepository, prismaEventCategoriesRepository);
        const { id } = request.params;
        const { name, startDate, endDate, logoURL, eventCategoryCode, } = request.body;
        await updateEventUseCase.execute({
            id: Number(id),
            name,
            startDate,
            endDate,
            logoURL,
            eventCategoryCode,
        });
        return response.json();
    }
    async findById(request, response) {
        const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository();
        const findEventByIdUseCase = new find_event_by_id_use_case_1.FindEventByIdUseCase(prismaEventsRepository);
        const { id } = request.params;
        const event = await findEventByIdUseCase.execute({ id: Number(id) });
        return response.json(event);
    }
    async findAll(request, response) {
        const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository();
        const findAllEventsUseCase = new find_all_events_use_case_1.FindAllEventsUseCase(prismaEventsRepository);
        const events = await findAllEventsUseCase.execute();
        return response.json(events);
    }
    async summary(request, response) {
        const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository();
        const findAllEventsUseCase = new fetch_event_summary_use_case_1.FetchEventSummaryUseCase(prismaEventsRepository);
        const { id } = request.params;
        const { version } = request.query;
        const events = await findAllEventsUseCase.execute({
            id: Number(id),
            version: version ? Number(version) : undefined,
        });
        return response.json(events);
    }
}
exports.EventsController = EventsController;
