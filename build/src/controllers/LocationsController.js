"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsController = void 0;
const prisma_1 = require("../infra/prisma");
const PrismaLocationsRepository_1 = require("../repositories/implementations/prisma/PrismaLocationsRepository");
const PrismaEventsRepository_1 = require("../repositories/implementations/prisma/PrismaEventsRepository");
const PrismaBrandsRepository_1 = require("../repositories/implementations/prisma/PrismaBrandsRepository");
const PrismaLocationCategoriesRepository_1 = require("../repositories/implementations/prisma/PrismaLocationCategoriesRepository");
const create_location_use_case_1 = require("../useCases/locations/create-location-use-case");
const delete_location_use_case_1 = require("../useCases/locations/delete-location-use-case");
const update_location_use_case_1 = require("../useCases/locations/update-location-use-case");
const find_all_location_use_case_1 = require("../useCases/locations/find-all-location-use-case");
class LocationsController {
    async create(request, response) {
        const location = await prisma_1.prisma.$transaction(async (prismaClient) => {
            const prismaLocationsRepository = new PrismaLocationsRepository_1.PrismaLocationsRepository(prismaClient);
            const prismaBrandsRepository = new PrismaBrandsRepository_1.PrismaBrandsRepository(prismaClient);
            const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository(prismaClient);
            const prismaLocationCategoriesRepository = new PrismaLocationCategoriesRepository_1.PrismaLocationCategoriesRepository(prismaClient);
            const createLocationUseCase = new create_location_use_case_1.CreateLocationUseCase(prismaLocationsRepository, prismaBrandsRepository, prismaEventsRepository, prismaLocationCategoriesRepository);
            const { name, description, latitude, longitude, eventId, brandId, locationCategoryCode, } = request.body;
            return createLocationUseCase.execute({
                name, description, latitude, longitude, eventId, brandId, locationCategoryCode,
            });
        }, { maxWait: 10000, timeout: 10000 });
        return response.json(location);
    }
    async update(request, response) {
        await prisma_1.prisma.$transaction(async (prismaClient) => {
            const prismaLocationsRepository = new PrismaLocationsRepository_1.PrismaLocationsRepository(prismaClient);
            const prismaBrandsRepository = new PrismaBrandsRepository_1.PrismaBrandsRepository(prismaClient);
            const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository(prismaClient);
            const prismaLocationCategoriesRepository = new PrismaLocationCategoriesRepository_1.PrismaLocationCategoriesRepository(prismaClient);
            const updateLocationUseCase = new update_location_use_case_1.UpdateLocationUseCase(prismaLocationsRepository, prismaEventsRepository, prismaBrandsRepository, prismaLocationCategoriesRepository);
            const { id } = request.params;
            const { name, description, latitude, longitude, eventId, brandId, locationCategoryCode, } = request.body;
            await updateLocationUseCase.execute({
                id: Number(id),
                name,
                description,
                latitude,
                longitude,
                eventId,
                brandId,
                locationCategoryCode,
            });
        }, { maxWait: 10000, timeout: 10000 });
        return response.json();
    }
    async delete(request, response) {
        await prisma_1.prisma.$transaction(async (prismaClient) => {
            const prismaLocationsRepository = new PrismaLocationsRepository_1.PrismaLocationsRepository(prismaClient);
            const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository(prismaClient);
            const deleteLocationUseCase = new delete_location_use_case_1.DeleteLocationUseCase(prismaLocationsRepository, prismaEventsRepository);
            const { id } = request.params;
            await deleteLocationUseCase.execute({ id: Number(id) });
        }, { maxWait: 10000, timeout: 10000 });
        return response.json();
    }
    async findAll(request, response) {
        const prismaLocationsRepository = new PrismaLocationsRepository_1.PrismaLocationsRepository();
        const findLocationsUseCase = new find_all_location_use_case_1.FindLocationsUseCase(prismaLocationsRepository);
        const { user } = request;
        const { eventId, brandId } = request.query;
        const locations = await findLocationsUseCase.execute({
            role: user.role,
            eventId: eventId ? Number(eventId) : undefined,
            brandId: brandId ? Number(brandId) : undefined,
        });
        return response.json(locations);
    }
}
exports.LocationsController = LocationsController;
