"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdminUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class UpdateAdminUseCase {
    constructor(usersRepository, adminsRepository, eventsRepository) {
        this.usersRepository = usersRepository;
        this.adminsRepository = adminsRepository;
        this.eventsRepository = eventsRepository;
    }
    async execute({ id, name, email, eventId, }) {
        if (!id || !name || !email || !eventId) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const admin = await this.adminsRepository.findById(id);
        if (!admin) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This admin does not exist.',
            });
        }
        const userEmailAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userEmailAlreadyExists && userEmailAlreadyExists.id !== id) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This email is already in use.',
            });
        }
        const event = await this.eventsRepository.findById(eventId);
        if (!event) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This event does not exist.',
            });
        }
        await this.usersRepository.update(admin.userId, {
            name,
            email,
        });
        await this.adminsRepository.update(id, {
            eventId,
        });
    }
}
exports.UpdateAdminUseCase = UpdateAdminUseCase;
