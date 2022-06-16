"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFriendshipUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class UpdateFriendshipUseCase {
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
            throw new Error_1.APIError({
                code: 500,
                message: 'This friendship relation does not exist.',
            });
        }
        await this.friendshipsRepository.update(friendshipRelationExists.id, {
            status,
        });
    }
}
exports.UpdateFriendshipUseCase = UpdateFriendshipUseCase;
