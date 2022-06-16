"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkersController = void 0;
const PrismaMarkersRepository_1 = require("../repositories/implementations/prisma/PrismaMarkersRepository");
const PrismaVisitorsRepository_1 = require("../repositories/implementations/prisma/PrismaVisitorsRepository");
const PrismaEventsRepository_1 = require("../repositories/implementations/prisma/PrismaEventsRepository");
const create_marker_use_case_1 = require("../useCases/markers/create-marker-use-case");
const delete_marker_use_case_1 = require("../useCases/markers/delete-marker-use-case");
const update_marker_use_case_1 = require("../useCases/markers/update-marker-use-case");
const find_all_markers_use_case_1 = require("../useCases/markers/find-all-markers-use-case");
class MarkersController {
    async create(request, response) {
        const prismaVisitorsRepository = new PrismaVisitorsRepository_1.PrismaVisitorsRepository();
        const prismaMarkersRepository = new PrismaMarkersRepository_1.PrismaMarkersRepository();
        const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository();
        const createMarkerUseCase = new create_marker_use_case_1.CreateMarkerUseCase(prismaVisitorsRepository, prismaMarkersRepository, prismaEventsRepository);
        const { visitorId, eventId, latitude, longitude, } = request.body;
        const marker = await createMarkerUseCase.execute({
            visitorId, eventId, latitude, longitude,
        });
        return response.json(marker);
    }
    async update(request, response) {
        const prismaVisitorsRepository = new PrismaVisitorsRepository_1.PrismaVisitorsRepository();
        const prismaMarkersRepository = new PrismaMarkersRepository_1.PrismaMarkersRepository();
        const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository();
        const updateMarkerUseCase = new update_marker_use_case_1.UpdateMarkerUseCase(prismaVisitorsRepository, prismaMarkersRepository, prismaEventsRepository);
        const { visitorId, eventId, latitude, longitude, } = request.body;
        await updateMarkerUseCase.execute({
            visitorId, eventId, latitude, longitude,
        });
        return response.json();
    }
    async delete(request, response) {
        const prismaVisitorsRepository = new PrismaVisitorsRepository_1.PrismaVisitorsRepository();
        const prismaMarkersRepository = new PrismaMarkersRepository_1.PrismaMarkersRepository();
        const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository();
        const deleteMarkerUseCase = new delete_marker_use_case_1.DeleteMarkerUseCase(prismaVisitorsRepository, prismaMarkersRepository, prismaEventsRepository);
        const { id } = request.params;
        await deleteMarkerUseCase.execute({ id: Number(id) });
        return response.json();
    }
    async findAll(request, response) {
        const prismaMarkersRepository = new PrismaMarkersRepository_1.PrismaMarkersRepository();
        const findMarkersUseCase = new find_all_markers_use_case_1.FindMarkersUseCase(prismaMarkersRepository);
        const { visitorId, eventId } = request.query;
        const markers = await findMarkersUseCase.execute({
            visitorId: visitorId ? Number(visitorId) : undefined,
            eventId: eventId ? Number(eventId) : undefined,
        });
        return response.json(markers);
    }
}
exports.MarkersController = MarkersController;
