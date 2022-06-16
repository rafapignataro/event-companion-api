"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendshipsController = void 0;
const PrismaFriendshipsRepository_1 = require("../repositories/implementations/prisma/PrismaFriendshipsRepository");
const PrismaCustomersRepository_1 = require("../repositories/implementations/prisma/PrismaCustomersRepository");
const create_friendship_use_case_1 = require("../useCases/friendships/create-friendship-use-case");
const update_friendship_use_case_1 = require("../useCases/friendships/update-friendship-use-case");
const find_all_friendships_use_case_1 = require("../useCases/friendships/find-all-friendships-use-case");
class FriendshipsController {
    async create(request, response) {
        const prismaCustomersRepository = new PrismaCustomersRepository_1.PrismaCustomersRepository();
        const prismaFriendshipsRepository = new PrismaFriendshipsRepository_1.PrismaFriendshipsRepository();
        const createFriendshipUseCase = new create_friendship_use_case_1.CreateFriendshipUseCase(prismaCustomersRepository, prismaFriendshipsRepository);
        const { customerId, friendId, status } = request.body;
        const friendship = await createFriendshipUseCase.execute({ customerId, friendId, status });
        return response.json(friendship);
    }
    async update(request, response) {
        const prismaCustomersRepository = new PrismaCustomersRepository_1.PrismaCustomersRepository();
        const prismaFriendshipsRepository = new PrismaFriendshipsRepository_1.PrismaFriendshipsRepository();
        const updateFriendshipUseCase = new update_friendship_use_case_1.UpdateFriendshipUseCase(prismaCustomersRepository, prismaFriendshipsRepository);
        const { customerId, friendId, status } = request.body;
        await updateFriendshipUseCase.execute({ customerId, friendId, status });
        return response.json();
    }
    async findAll(request, response) {
        const prismaFriendshipsRepository = new PrismaFriendshipsRepository_1.PrismaFriendshipsRepository();
        const findFriendshipsUseCase = new find_all_friendships_use_case_1.FindFriendshipsUseCase(prismaFriendshipsRepository);
        const { customerId } = request.query;
        const users = await findFriendshipsUseCase.execute({
            customerId: customerId ? Number(customerId) : undefined,
        });
        return response.json(users);
    }
}
exports.FriendshipsController = FriendshipsController;
