"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdminUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class CreateAdminUseCase {
    constructor(usersRepository, eventsRepository, adminsRepository, hashProvider) {
        this.usersRepository = usersRepository;
        this.eventsRepository = eventsRepository;
        this.adminsRepository = adminsRepository;
        this.hashProvider = hashProvider;
    }
    async execute({ name, email, password, eventId, }) {
        if (!name || !email || !password || !eventId) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This email is already in use.',
            });
        }
        if (password.length < 6) {
            throw new Error_1.APIError({
                code: 500,
                message: 'The password must have more than 6 letters.',
            });
        }
        const passwordHash = await this.hashProvider.create(password);
        const event = await this.eventsRepository.findById(eventId);
        if (!event) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This event does not exist.',
            });
        }
        const user = await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            role: 'ADMIN'
        });
        const admin = await this.adminsRepository.create({
            userId: user.id,
            eventId,
        });
        return admin;
    }
}
exports.CreateAdminUseCase = CreateAdminUseCase;
