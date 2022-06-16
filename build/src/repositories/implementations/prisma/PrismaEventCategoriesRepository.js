"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaEventCategoriesRepository = void 0;
const prisma_1 = require("../../../infra/prisma");
class PrismaEventCategoriesRepository {
    constructor(prismaTransactionClient) {
        this.prismaClient = prisma_1.prisma;
        if (prismaTransactionClient)
            this.prismaClient = prismaTransactionClient;
    }
    async findByCode(code) {
        const eventCategory = await this.prismaClient.eventCategory.findUnique({
            where: {
                code,
            },
        });
        return eventCategory;
    }
    async findAll({ name, code }) {
        const eventCategories = await this.prismaClient.eventCategory.findMany({
            where: {
                name,
                code,
            },
        });
        return eventCategories;
    }
}
exports.PrismaEventCategoriesRepository = PrismaEventCategoriesRepository;
