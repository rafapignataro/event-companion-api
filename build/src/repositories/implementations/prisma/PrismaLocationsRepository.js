"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaLocationsRepository = void 0;
const prisma_1 = require("../../../infra/prisma");
class PrismaLocationsRepository {
    constructor(prismaTransactionClient) {
        this.prismaClient = prisma_1.prisma;
        if (prismaTransactionClient)
            this.prismaClient = prismaTransactionClient;
    }
    async findById(id) {
        const location = await this.prismaClient.location.findUnique({
            where: {
                id,
            },
            include: {
                locationCategory: true,
                activations: true,
            },
        });
        return location;
    }
    async findByEventAndBrandId(eventId, brandId) {
        const location = await this.prismaClient.location.findFirst({
            where: {
                eventId,
                brandId,
            },
            include: {
                locationCategory: true,
                activations: true,
            },
        });
        return location;
    }
    async findAll({ authorized, eventId, brandId, }) {
        const locations = await this.prismaClient.location.findMany({
            where: {
                eventId,
                brandId,
            },
            include: {
                locationCategory: true,
                activations: {
                    where: !authorized ? {
                        startDate: {
                            lte: new Date().toISOString(),
                        },
                        endDate: {
                            gte: new Date().toISOString(),
                        },
                    } : {},
                    orderBy: {
                        startDate: 'asc',
                    },
                },
            },
        });
        return locations;
    }
    async create(data) {
        const location = await this.prismaClient.location.create({
            data,
        });
        return location;
    }
    async update(id, data) {
        const location = await this.prismaClient.location.update({
            where: {
                id,
            },
            data,
        });
        return location;
    }
    async delete(id) {
        await this.prismaClient.location.delete({
            where: {
                id,
            },
        });
    }
}
exports.PrismaLocationsRepository = PrismaLocationsRepository;
