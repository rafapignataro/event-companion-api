"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllUsersUseCase = void 0;
class FindAllUsersUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute() {
        const users = await this.usersRepository.findAll();
        return users;
    }
}
exports.FindAllUsersUseCase = FindAllUsersUseCase;
