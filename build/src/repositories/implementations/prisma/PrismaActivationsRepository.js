"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaActivationsRepository = void 0;
const prisma_1 = require("../../../infra/prisma");
class PrismaActivationsRepository {
    constructor(prismaTransactionClient) {
        this.prismaClient = prisma_1.prisma;
        if (prismaTransactionClient)
            this.prismaClient = prismaTransactionClient;
    }
    async findById(id) {
        const activation = await this.prismaClient.activation.findUnique({
            where: {
                id,
            },
        });
        return activation;
    }
    async findAll({ locationId }) {
        const activations = await this.prismaClient.activation.findMany({
            where: { locationId },
        });
        return activations;
    }
    async create(data) {
        const activation = await this.prismaClient.activation.create({
            data,
        });
        return activation;
    }
    async update(id, data) {
        const activation = await this.prismaClient.activation.update({
            where: {
                id,
            },
            data,
        });
        return activation;
    }
    async delete(id) {
        await this.prismaClient.activation.delete({
            where: {
                id,
            },
        });
    }
}
exports.PrismaActivationsRepository = PrismaActivationsRepository;
