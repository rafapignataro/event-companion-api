"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBrandUseCase = void 0;
const Error_1 = require("../../helpers/Error");
class UpdateBrandUseCase {
    constructor(usersRepository, brandsRepository, eventsRepository) {
        this.usersRepository = usersRepository;
        this.brandsRepository = brandsRepository;
        this.eventsRepository = eventsRepository;
    }
    async execute({ id, name, email, eventId, }) {
        if (!id || !name || !email || !eventId) {
            throw new Error_1.APIError({
                code: 500,
                message: 'There are missing parameters.',
            });
        }
        const brand = await this.brandsRepository.findById(id);
        if (!brand) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This brand does not exist.',
            });
        }
        const event = await this.eventsRepository.findById(id);
        if (!event) {
            throw new Error_1.APIError({
                code: 500,
                message: 'This event does not exist.',
            });
        }
        await this.usersRepository.update(brand.userId, {
            name,
            email,
        });
        await this.brandsRepository.update(id, {
            eventId,
        });
    }
}
exports.UpdateBrandUseCase = UpdateBrandUseCase;
