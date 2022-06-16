"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUsersRepository = void 0;
const prisma_1 = require("../../../infra/prisma");
class PrismaUsersRepository {
    constructor(prismaTransactionClient) {
        this.prismaClient = prisma_1.prisma;
        if (prismaTransactionClient)
            this.prismaClient = prismaTransactionClient;
    }
    async findById(id) {
        const user = await this.prismaClient.user.findUnique({
            where: {
                id,
            },
        });
        return user;
    }
    async findByEmail(email) {
        const user = await this.prismaClient.user.findFirst({
            where: {
                email,
            },
            include: {
                admin: true,
                brand: true,
                customer: {
                    include: {
                        visitors: {
                            include: {
                                event: true,
                            }
                        }
                    }
                }
            }
        });
        return user;
    }
    async findAll() {
        const users = await this.prismaClient.user.findMany();
        return users;
    }
    async create(data) {
        const user = await this.prismaClient.user.create({
            data,
        });
        return user;
    }
    async update(id, data) {
        const user = await this.prismaClient.user.update({
            where: {
                id,
            },
            data,
        });
        return user;
    }
    async updatePassword(id, data) {
        const user = await this.prismaClient.user.update({
            where: {
                id,
            },
            data,
        });
        return user;
    }
    async delete(id) {
        await this.prismaClient.user.delete({
            where: {
                id,
            },
        });
    }
}
exports.PrismaUsersRepository = PrismaUsersRepository;
