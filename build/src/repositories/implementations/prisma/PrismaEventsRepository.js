"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaEventsRepository = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../infra/prisma");
class PrismaEventsRepository {
    constructor(prismaTransactionClient) {
        this.prismaClient = prisma_1.prisma;
        if (prismaTransactionClient)
            this.prismaClient = prismaTransactionClient;
    }
    async findById(id) {
        const event = await this.prismaClient.event.findUnique({
            where: {
                id,
            },
            include: {
                eventCategory: true,
            },
        });
        return event;
    }
    async findAll() {
        const events = await this.prismaClient.event.findMany({
            include: {
                eventCategory: true,
            },
        });
        return events;
    }
    async summary(id) {
        const event = await this.prismaClient.event.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                version: true,
                brands: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
                locations: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        latitude: true,
                        longitude: true,
                        locationCategory: {
                            select: {
                                code: true,
                                name: true,
                            },
                        },
                        activations: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                startDate: true,
                                endDate: true,
                            },
                        },
                    },
                },
            },
        });
        return event;
    }
    async create(data) {
        const event = await this.prismaClient.event.create({
            data,
            include: {
                eventCategory: true,
            },
        });
        return event;
    }
    async update(id, data) {
        const event = await this.prismaClient.event.update({
            where: {
                id,
            },
            data,
            include: {
                eventCategory: true,
            },
        });
        return event;
    }
    async updateVersion(id) {
        await this.prismaClient.$queryRaw(client_1.Prisma.sql `update "events" set version = version + 1 where id = ${id}`);
    }
    async delete(id) {
        await this.prismaClient.event.delete({
            where: {
                id,
            },
        });
    }
}
exports.PrismaEventsRepository = PrismaEventsRepository;
