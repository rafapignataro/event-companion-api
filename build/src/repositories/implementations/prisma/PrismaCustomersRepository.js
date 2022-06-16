"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCustomersRepository = void 0;
const prisma_1 = require("../../../infra/prisma");
class PrismaCustomersRepository {
    constructor(prismaTransactionClient) {
        this.prismaClient = prisma_1.prisma;
        if (prismaTransactionClient)
            this.prismaClient = prismaTransactionClient;
    }
    async findById(id) {
        const customer = await this.prismaClient.customer.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
                visitors: {
                    include: {
                        event: true
                    }
                }
            },
        });
        return customer;
    }
    async findAll() {
        const customers = await this.prismaClient.customer.findMany({
            include: {
                user: true,
            },
        });
        return customers;
    }
    async search(text) {
        const customers = await this.prismaClient.customer.findMany({
            include: {
                user: true,
            },
            where: {
                user: {
                    OR: [{
                            name: {
                                contains: text,
                                mode: 'insensitive'
                            },
                        }, {
                            email: {
                                contains: text,
                                mode: 'insensitive'
                            },
                        }]
                }
            }
        });
        return customers;
    }
    async create(data) {
        const customer = await this.prismaClient.customer.create({
            data,
        });
        return customer;
    }
    async update(id, data) {
        const customer = await this.prismaClient.customer.update({
            where: {
                id,
            },
            data,
        });
        return customer;
    }
    async delete(id) {
        await this.prismaClient.customer.delete({
            where: {
                id,
            },
        });
    }
}
exports.PrismaCustomersRepository = PrismaCustomersRepository;
