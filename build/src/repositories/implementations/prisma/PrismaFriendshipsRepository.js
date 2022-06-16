"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaFriendshipsRepository = void 0;
const prisma_1 = require("../../../infra/prisma");
class PrismaFriendshipsRepository {
    constructor(prismaTransactionClient) {
        this.prismaClient = prisma_1.prisma;
        if (prismaTransactionClient)
            this.prismaClient = prismaTransactionClient;
    }
    async findById(id) {
        const friendship = await this.prismaClient.friendship.findUnique({
            where: {
                id,
            },
        });
        return friendship;
    }
    async findRelation(customerId, friendId) {
        const friendship = await this.prismaClient.friendship.findFirst({
            where: {
                customerId,
                friendId,
            },
        });
        if (friendship)
            return friendship;
        const friendshipReversed = await this.prismaClient.friendship.findFirst({
            where: {
                customerId: friendId,
                friendId: customerId,
            },
        });
        return friendshipReversed;
    }
    async findAll({ customerId }) {
        const friendships = await this.prismaClient.friendship.findMany({
            where: {
                OR: [
                    {
                        customerId,
                    },
                    {
                        friendId: customerId,
                    }
                ]
            },
            include: {
                customer: {
                    include: {
                        user: true
                    }
                },
                friend: {
                    include: {
                        user: true
                    }
                },
            }
        });
        return friendships;
    }
    async findAllByCustomerId(id) {
        const friendships = await this.prismaClient.friendship.findMany({
            where: {
                customerId: id,
            },
        });
        return friendships;
    }
    async create(data) {
        const friendship = await this.prismaClient.friendship.create({
            data,
        });
        return friendship;
    }
    async update(id, data) {
        const friendship = await this.prismaClient.friendship.update({
            where: {
                id,
            },
            data,
        });
        return friendship;
    }
    async delete(id) {
        await this.prismaClient.friendship.delete({
            where: {
                id,
            },
        });
    }
}
exports.PrismaFriendshipsRepository = PrismaFriendshipsRepository;
