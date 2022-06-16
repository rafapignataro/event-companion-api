"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBrandUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class CreateBrandUseCase {
    constructor(usersRepository, eventsRepository, brandsRepository, hashProvider) {
        this.usersRepository = usersRepository;
        this.eventsRepository = eventsRepository;
        this.brandsRepository = brandsRepository;
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
            role: 'BRAND'
        });
        const brand = await this.brandsRepository.create({
            userId: user.id,
            eventId,
        });
        return brand;
    }
}
exports.CreateBrandUseCase = CreateBrandUseCase;
