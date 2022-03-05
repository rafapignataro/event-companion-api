import { APIError } from '../../helpers/Error';

import { UsersRepository } from '../../repositories/UsersRepository';
import { BrandsRepository } from '../../repositories/BrandsRepository';
import { EventsRepository } from '../../repositories/EventsRepository';

type UpdateBrandRequest = {
  id: number;
  name: string;
  email: string;
  eventId: number;
}

export class UpdateBrandUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private brandsRepository: BrandsRepository,
    private eventsRepository: EventsRepository,
  ) {}

  public async execute({
    id, name, email, eventId,
  }: UpdateBrandRequest): Promise<void> {
    if (!id || !name || !email || !eventId) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const brand = await this.brandsRepository.findById(id);

    if (!brand) {
      throw new APIError({
        code: 500,
        message: 'This brand does not exist.',
      });
    }

    const event = await this.eventsRepository.findById(id);

    if (!event) {
      throw new APIError({
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
