"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindFriendshipsUseCase = void 0;
class FindFriendshipsUseCase {
    constructor(friendshipsRepository) {
        this.friendshipsRepository = friendshipsRepository;
    }
    async execute({ customerId }) {
        const friendships = await this.friendshipsRepository.findAll({
            customerId,
        });
        return friendships;
    }
}
exports.FindFriendshipsUseCase = FindFriendshipsUseCase;
