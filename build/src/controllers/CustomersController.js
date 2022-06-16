"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersController = void 0;
const prisma_1 = require("../infra/prisma");
const bcryptHashProvider_1 = require("../providers/hashProvider/implementations/bcryptHashProvider");
const PrismaUsersRepository_1 = require("../repositories/implementations/prisma/PrismaUsersRepository");
const PrismaCustomersRepository_1 = require("../repositories/implementations/prisma/PrismaCustomersRepository");
const create_customer_use_case_1 = require("../useCases/customers/create-customer-use-case");
const update_customer_use_case_1 = require("../useCases/customers/update-customer-use-case");
const find_customer_by_id_use_case_1 = require("../useCases/customers/find-customer-by-id-use-case");
const find_all_customers_use_case_1 = require("../useCases/customers/find-all-customers-use-case");
const search_for_customer_use_case_1 = require("../useCases/customers/search-for-customer.use-case");
const jwtUserTokenProvider_1 = require("../providers/userTokenProvider/implementations/jwtUserTokenProvider");
class CustomersController {
    async create(request, response) {
        const bcryptHashProvider = new bcryptHashProvider_1.BCryptHashProvider();
        const { email, name, password, passwordRepeated, avatarColor, } = request.body;
        const customer = await prisma_1.prisma.$transaction(async (prismaClient) => {
            const prismaUsersRepository = new PrismaUsersRepository_1.PrismaUsersRepository(prismaClient);
            const prismaCustomersRepository = new PrismaCustomersRepository_1.PrismaCustomersRepository(prismaClient);
            const createCustomerUseCase = new create_customer_use_case_1.CreateCustomerUseCase(prismaUsersRepository, prismaCustomersRepository, bcryptHashProvider);
            return createCustomerUseCase.execute({
                name, email, password, passwordRepeated, avatarColor,
            });
        }, { maxWait: 10000, timeout: 10000 });
        return response.json(customer);
    }
    async update(request, response) {
        const { id } = request.params;
        const { name, email, avatarColor } = request.body;
        const customer = await prisma_1.prisma.$transaction(async (prismaClient) => {
            const prismaUsersRepository = new PrismaUsersRepository_1.PrismaUsersRepository(prismaClient);
            const prismaCustomersRepository = new PrismaCustomersRepository_1.PrismaCustomersRepository(prismaClient);
            const jwtUserTokenProvider = new jwtUserTokenProvider_1.JwtUserTokenProvider();
            const updateCustomerUseCase = new update_customer_use_case_1.UpdateCustomerUseCase(prismaUsersRepository, prismaCustomersRepository, jwtUserTokenProvider);
            return updateCustomerUseCase.execute({
                id: Number(id), name, email, avatarColor,
            });
        }, { maxWait: 10000, timeout: 10000 });
        return response.json(customer);
    }
    async findById(request, response) {
        const prismaCustomersRepository = new PrismaCustomersRepository_1.PrismaCustomersRepository();
        const findCustomerByIdUseCase = new find_customer_by_id_use_case_1.FindCustomerByIdUseCase(prismaCustomersRepository);
        const { id } = request.params;
        const customer = await findCustomerByIdUseCase.execute({ id: Number(id) });
        return response.json(customer);
    }
    async findAll(request, response) {
        const prismaCustomersRepository = new PrismaCustomersRepository_1.PrismaCustomersRepository();
        const findAllCustomersUseCase = new find_all_customers_use_case_1.FindAllCustomersUseCase(prismaCustomersRepository);
        const customers = await findAllCustomersUseCase.execute();
        return response.json(customers);
    }
    async search(request, response) {
        const prismaCustomersRepository = new PrismaCustomersRepository_1.PrismaCustomersRepository();
        const searchForCustomersUseCase = new search_for_customer_use_case_1.SearchForCustomersUseCase(prismaCustomersRepository);
        const { text } = request.query;
        const customers = await searchForCustomersUseCase.execute({ text: String(text) });
        return response.json(customers);
    }
}
exports.CustomersController = CustomersController;
