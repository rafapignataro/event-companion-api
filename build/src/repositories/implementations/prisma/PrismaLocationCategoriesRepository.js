"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaLocationCategoriesRepository = void 0;
const prisma_1 = require("../../../infra/prisma");
class PrismaLocationCategoriesRepository {
    constructor(prismaTransactionClient) {
        this.prismaClient = prisma_1.prisma;
        if (prismaTransactionClient)
            this.prismaClient = prismaTransactionClient;
    }
    async findByCode(code) {
        const locationCategory = await this.prismaClient.locationCategory.findUnique({
            where: {
                code,
            },
        });
        return locationCategory;
    }
    async findAll({ name, code }) {
        const locationCategories = await this.prismaClient.locationCategory.findMany({
            where: {
                name,
                code,
            },
        });
        return locationCategories;
    }
}
exports.PrismaLocationCategoriesRepository = PrismaLocationCategoriesRepository;
