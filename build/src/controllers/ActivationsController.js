"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivationsController = void 0;
const prisma_1 = require("../infra/prisma");
const PrismaActivationsRepository_1 = require("../repositories/implementations/prisma/PrismaActivationsRepository");
const PrismaLocationsRepository_1 = require("../repositories/implementations/prisma/PrismaLocationsRepository");
const create_activation_use_case_1 = require("../useCases/activations/create-activation-use-case");
const delete_activation_use_case_1 = require("../useCases/activations/delete-activation-use-case");
const update_activation_use_case_1 = require("../useCases/activations/update-activation-use-case");
const find_all_activation_use_case_1 = require("../useCases/activations/find-all-activation-use-case");
const PrismaEventsRepository_1 = require("../repositories/implementations/prisma/PrismaEventsRepository");
class ActivationsController {
    async create(request, response) {
        const activation = await prisma_1.prisma.$transaction(async (prismaClient) => {
            const prismaActivationsRepository = new PrismaActivationsRepository_1.PrismaActivationsRepository(prismaClient);
            const prismaLocationsRepository = new PrismaLocationsRepository_1.PrismaLocationsRepository(prismaClient);
            const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository(prismaClient);
            const createActivationUseCase = new create_activation_use_case_1.CreateActivationUseCase(prismaActivationsRepository, prismaLocationsRepository, prismaEventsRepository);
            const { description, startDate, endDate, locationId, } = request.body;
            return createActivationUseCase.execute({
                description, startDate, endDate, locationId,
            });
        }, { maxWait: 10000, timeout: 10000 });
        return response.json(activation);
    }
    async update(request, response) {
        await prisma_1.prisma.$transaction(async (prismaClient) => {
            const prismaActivationsRepository = new PrismaActivationsRepository_1.PrismaActivationsRepository(prismaClient);
            const prismaLocationsRepository = new PrismaLocationsRepository_1.PrismaLocationsRepository(prismaClient);
            const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository(prismaClient);
            const updateActivationUseCase = new update_activation_use_case_1.UpdateActivationUseCase(prismaActivationsRepository, prismaLocationsRepository, prismaEventsRepository);
            const { id } = request.params;
            const { description, startDate, endDate, locationId, } = request.body;
            await updateActivationUseCase.execute({
                id: Number(id),
                description,
                startDate,
                endDate,
                locationId,
            });
        }, { maxWait: 10000, timeout: 10000 });
        return response.json();
    }
    async delete(request, response) {
        await prisma_1.prisma.$transaction(async (prismaClient) => {
            const prismaActivationsRepository = new PrismaActivationsRepository_1.PrismaActivationsRepository(prismaClient);
            const prismaLocationsRepository = new PrismaLocationsRepository_1.PrismaLocationsRepository(prismaClient);
            const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository(prismaClient);
            const deleteActivationUseCase = new delete_activation_use_case_1.DeleteActivationUseCase(prismaActivationsRepository, prismaLocationsRepository, prismaEventsRepository);
            const { id } = request.params;
            await deleteActivationUseCase.execute({ id: Number(id) });
        }, { maxWait: 10000, timeout: 10000 });
        return response.json();
    }
    async findAll(request, response) {
        const prismaActivationsRepository = new PrismaActivationsRepository_1.PrismaActivationsRepository();
        const findActivationsUseCase = new find_all_activation_use_case_1.FindActivationsUseCase(prismaActivationsRepository);
        const { locationId } = request.query;
        const activations = await findActivationsUseCase.execute({
            locationId: locationId ? Number(locationId) : undefined,
        });
        return response.json(activations);
    }
}
exports.ActivationsController = ActivationsController;
