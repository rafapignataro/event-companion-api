"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAdminsRepository = void 0;
const prisma_1 = require("../../../infra/prisma");
class PrismaAdminsRepository {
    constructor(prismaTransactionClient) {
        this.prismaClient = prisma_1.prisma;
        if (prismaTransactionClient)
            this.prismaClient = prismaTransactionClient;
    }
    async findById(id) {
        const admin = await this.prismaClient.admin.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            },
        });
        return admin;
    }
    async findAll() {
        const admins = await this.prismaClient.admin.findMany({
            include: {
                user: true,
            },
        });
        return admins;
    }
    async create(data) {
        const admin = await this.prismaClient.admin.create({
            data,
        });
        return admin;
    }
    async update(id, data) {
        const admin = await this.prismaClient.admin.update({
            where: {
                id,
            },
            data,
        });
        return admin;
    }
    async delete(id) {
        await this.prismaClient.admin.delete({
            where: {
                id,
            },
        });
    }
}
exports.PrismaAdminsRepository = PrismaAdminsRepository;
