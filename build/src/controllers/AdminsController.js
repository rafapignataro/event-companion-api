"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsController = void 0;
const prisma_1 = require("../infra/prisma");
const bcryptHashProvider_1 = require("../providers/hashProvider/implementations/bcryptHashProvider");
const PrismaUsersRepository_1 = require("../repositories/implementations/prisma/PrismaUsersRepository");
const PrismaEventsRepository_1 = require("../repositories/implementations/prisma/PrismaEventsRepository");
const PrismaAdminsRepository_1 = require("../repositories/implementations/prisma/PrismaAdminsRepository");
const create_admin_use_case_1 = require("../useCases/admins/create-admin-use-case");
const update_admin_use_case_1 = require("../useCases/admins/update-admin-use-case");
const find_admin_by_id_use_case_1 = require("../useCases/admins/find-admin-by-id-use-case");
const find_all_admins_use_case_1 = require("../useCases/admins/find-all-admins-use-case");
class AdminsController {
    async create(request, response) {
        const bcryptHashProvider = new bcryptHashProvider_1.BCryptHashProvider();
        const { email, name, password, eventId, } = request.body;
        const admin = await prisma_1.prisma.$transaction(async (prismaClient) => {
            const prismaUsersRepository = new PrismaUsersRepository_1.PrismaUsersRepository(prismaClient);
            const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository(prismaClient);
            const prismaAdminsRepository = new PrismaAdminsRepository_1.PrismaAdminsRepository(prismaClient);
            const createAdminUseCase = new create_admin_use_case_1.CreateAdminUseCase(prismaUsersRepository, prismaEventsRepository, prismaAdminsRepository, bcryptHashProvider);
            return createAdminUseCase.execute({
                name,
                email,
                password,
                eventId,
            });
        }, { maxWait: 10000, timeout: 10000 });
        return response.json(admin);
    }
    async update(request, response) {
        const { id } = request.params;
        const { name, email, eventId } = request.body;
        await prisma_1.prisma.$transaction(async (prismaClient) => {
            const prismaUsersRepository = new PrismaUsersRepository_1.PrismaUsersRepository(prismaClient);
            const prismaEventsRepository = new PrismaEventsRepository_1.PrismaEventsRepository(prismaClient);
            const prismaAdminsRepository = new PrismaAdminsRepository_1.PrismaAdminsRepository(prismaClient);
            const updateAdminUseCase = new update_admin_use_case_1.UpdateAdminUseCase(prismaUsersRepository, prismaAdminsRepository, prismaEventsRepository);
            await updateAdminUseCase.execute({
                id: Number(id), name, email, eventId,
            });
        }, { maxWait: 10000, timeout: 10000 });
        return response.json();
    }
    async findById(request, response) {
        const prismaAdminsRepository = new PrismaAdminsRepository_1.PrismaAdminsRepository();
        const findAdminByIdUseCase = new find_admin_by_id_use_case_1.FindAdminByIdUseCase(prismaAdminsRepository);
        const { id } = request.params;
        const admin = await findAdminByIdUseCase.execute({ id: Number(id) });
        return response.json(admin);
    }
    async findAll(request, response) {
        const prismaAdminsRepository = new PrismaAdminsRepository_1.PrismaAdminsRepository();
        const findAllAdminsUseCase = new find_all_admins_use_case_1.FindAllAdminsUseCase(prismaAdminsRepository);
        const admins = await findAllAdminsUseCase.execute();
        return response.json(admins);
    }
}
exports.AdminsController = AdminsController;
