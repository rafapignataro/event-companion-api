import { Brand } from '@prisma/client';

import { APIError } from '../../helpers/Error';
import { UsersRepository } from '../../repositories/users/UsersRepository';
import { EventsRepository } from '../../repositories/events/EventsRepository';
import { BrandsRepository } from '../../repositories/brands/BrandsRepository';

type CreateBrandRequest = {
  userId: number;
  eventId: number;
}

export class CreateBrandUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private eventsRepository: EventsRepository,
    private brandsRepository: BrandsRepository,
  ) {}

  public async execute({
    userId,
    eventId,
  }: CreateBrandRequest): Promise<Brand> {
    if (!userId || !eventId) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new APIError({
        code: 500,
        message: 'This user does not exist.',
      });
    }

    const event = await this.eventsRepository.findById(eventId);

    if (!event) {
      throw new APIError({
        code: 500,
        message: 'This event does not exist.',
      });
    }

    const brand = await this.brandsRepository.create({
      userId,
      eventId,
    });

    return brand;
  }
}
