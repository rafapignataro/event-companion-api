import { Admin } from '@prisma/client';

import { APIError } from '../../helpers/Error';
import { UsersRepository } from '../../repositories/users/UsersRepository';
import { EventsRepository } from '../../repositories/events/EventsRepository';
import { AdminsRepository } from '../../repositories/admins/AdminsRepository';

type CreateAdminRequest = {
  userId: number;
  eventId: number;
}

export class CreateAdminUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private eventsRepository: EventsRepository,
    private adminsRepository: AdminsRepository,
  ) {}

  public async execute({
    userId,
    eventId,
  }: CreateAdminRequest): Promise<Admin> {
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

    const admin = await this.adminsRepository.create({
      userId,
      eventId,
    });

    return admin;
  }
}
