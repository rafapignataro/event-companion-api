"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandsController = void 0;
const prisma_1 = require("../infra/prisma");
const bcryptHashProvider_1 = require("../providers/hashProvider/implementations/bcryptHashProvider");
const PrismaUsersRepository_1 = require("../repositories/implementations/prisma/PrismaUsersRepository");
const PrismaEventsRepository_1 = require("../repositories/implementations/prisma/PrismaEventsRepository");
const PrismaBrandsRepository_1 = require("../repositories/implementations/prisma/PrismaBrandsRepository");
const create_brand_use_case_1 = require("../useCases/brands/create-brand-use-case");
const update_brand_use_case_1 = require("../useCases/brands/update-brand-use-case");
const find_brand_by_id_use_case_1 = require("../useCases/brands/find-brand-by-id-use-case");
const find_all_brands_use_case_1 = require("../useCases/brands/find-all-brands-use-case");
class BrandsController {
    async create(request, response) {
        const bcryptHashProvider = new bcryptHashProvider_1.BCryptHashProvider();
        const { email, name, password, eventId, } = request.body;
        const brand = await prisma_1.prisma.$transaction(async (prismaClient) => {
            const prismaUsersRepository = new PrismaUsersRepository_1.PrismaUsersRepository(prismaClient);
            const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository(prismaClient);
            const prismaBrandsRepository = new PrismaBrandsRepository_1.PrismaBrandsRepository(prismaClient);
            const createBrandUseCase = new create_brand_use_case_1.CreateBrandUseCase(prismaUsersRepository, prismaEventsRepository, prismaBrandsRepository, bcryptHashProvider);
            return createBrandUseCase.execute({
                email, name, password, eventId,
            });
        }, { maxWait: 10000, timeout: 10000 });
        return response.json(brand);
    }
    async update(request, response) {
        const { id } = request.params;
        const { name, email, eventId } = request.body;
        await prisma_1.prisma.$transaction(async (prismaClient) => {
            const prismaUsersRepository = new PrismaUsersRepository_1.PrismaUsersRepository(prismaClient);
            const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository(prismaClient);
            const prismaBrandsRepository = new PrismaBrandsRepository_1.PrismaBrandsRepository(prismaClient);
            const updateBrandUseCase = new update_brand_use_case_1.UpdateBrandUseCase(prismaUsersRepository, prismaBrandsRepository, prismaEventsRepository);
            await updateBrandUseCase.execute({
                id: Number(id),
                name,
                email,
                eventId,
            });
        }, { maxWait: 10000, timeout: 10000 });
        return response.json();
    }
    async findById(request, response) {
        const prismaBrandsRepository = new PrismaBrandsRepository_1.PrismaBrandsRepository();
        const findBrandByIdUseCase = new find_brand_by_id_use_case_1.FindBrandByIdUseCase(prismaBrandsRepository);
        const { id } = request.params;
        const brand = await findBrandByIdUseCase.execute({ id: Number(id) });
        return response.json(brand);
    }
    async findAll(request, response) {
        const prismaBrandsRepository = new PrismaBrandsRepository_1.PrismaBrandsRepository();
        const findAllBrandsUseCase = new find_all_brands_use_case_1.FindAllBrandsUseCase(prismaBrandsRepository);
        const brands = await findAllBrandsUseCase.execute();
        return response.json(brands);
    }
}
exports.BrandsController = BrandsController;
