"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFriendshipUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class CreateFriendshipUseCase {
    constructor(customersRepository, friendshipsRepository) {
        this.customersRepository = customersRepository;
        this.friendshipsRepository = friendshipsRepository;
    }
    async execute({ customerId, friendId, status, }) {
        if (!customerId || !friendId || !status) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        if (customerId === friendId) {
            throw new Error_1.APIError({
                code: 500,
                message: 'A friendship must have different participants.',
            });
        }
        if (status !== 'NOT_ACCEPTED' && status !== 'ACCEPTED' && status !== 'REFUSED') {
            throw new Error_1.APIError({
                code: 500,
                message: 'This status does not exist.',
            });
        }
        const customerExists = await this.customersRepository.findById(customerId);
        if (!customerExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This customer does not exist.',
            });
        }
        const friendExists = await this.customersRepository.findById(friendId);
        if (!friendExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This friend does not exist.',
            });
        }
        const friendshipRelationExists = await this.friendshipsRepository.findRelation(customerId, friendId);
        if (!friendshipRelationExists) {
            const friendship = await this.friendshipsRepository.create({
                status,
                customerId,
                friendId,
            });
            return friendship;
        }
        if (friendshipRelationExists.status === 'REFUSED') {
            await this.friendshipsRepository.delete(friendshipRelationExists.id);
            const friendship = await this.friendshipsRepository.create({
                status,
                customerId,
                friendId,
            });
            return friendship;
        }
        if (friendshipRelationExists.status === 'ACCEPTED') {
            throw new Error_1.APIError({
                code: 500,
                message: 'You already have a friendship this this person.',
            });
        }
        if (friendshipRelationExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'You have already sent a request to this person.',
            });
        }
    }
}
exports.CreateFriendshipUseCase = CreateFriendshipUseCase;
