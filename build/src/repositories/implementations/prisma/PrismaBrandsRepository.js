"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaBrandsRepository = void 0;
const prisma_1 = require("../../../infra/prisma");
class PrismaBrandsRepository {
    constructor(prismaTransactionClient) {
        this.prismaClient = prisma_1.prisma;
        if (prismaTransactionClient)
            this.prismaClient = prismaTransactionClient;
    }
    async findById(id) {
        const brand = await this.prismaClient.brand.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            },
        });
        return brand;
    }
    async findAll() {
        const brands = await this.prismaClient.brand.findMany({
            include: {
                user: true,
            },
        });
        return brands;
    }
    async create(data) {
        const brand = await this.prismaClient.brand.create({
            data,
        });
        return brand;
    }
    async update(id, data) {
        const brand = await this.prismaClient.brand.update({
            where: {
                id,
            },
            data,
        });
        return brand;
    }
    async delete(id) {
        await this.prismaClient.brand.delete({
            where: {
                id,
            },
        });
    }
}
exports.PrismaBrandsRepository = PrismaBrandsRepository;
