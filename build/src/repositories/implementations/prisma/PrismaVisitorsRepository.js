"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaVisitorsRepository = void 0;
const prisma_1 = require("../../../infra/prisma");
class PrismaVisitorsRepository {
    constructor(prismaTransactionClient) {
        this.prismaClient = prisma_1.prisma;
        if (prismaTransactionClient)
            this.prismaClient = prismaTransactionClient;
    }
    async findById(id) {
        const visitor = await this.prismaClient.visitor.findUnique({
            where: {
                id,
            },
        });
        return visitor;
    }
    async findByCustomerAndEventId(customerId, eventId) {
        const visitor = await this.prismaClient.visitor.findFirst({
            where: {
                customerId,
                eventId,
            },
        });
        return visitor;
    }
    async findAll({ customerId }) {
        const visitors = await this.prismaClient.visitor.findMany({
            where: {
                customerId,
            },
        });
        return visitors;
    }
    async findAllByCustomerIdteste(id) {
        const visitors = await this.prismaClient.visitor.findMany({
            where: {
                customerId: id,
            },
        });
        return visitors;
    }
    async create(data) {
        const visitor = await this.prismaClient.visitor.create({
            data,
        });
        return visitor;
    }
    async update(id, data) {
        const visitor = await this.prismaClient.visitor.update({
            where: {
                id,
            },
            data,
        });
        return visitor;
    }
    async delete(id) {
        await this.prismaClient.visitor.delete({
            where: {
                id,
            },
        });
    }
}
exports.PrismaVisitorsRepository = PrismaVisitorsRepository;
