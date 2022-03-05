import { APIError } from '../../helpers/Error';

import { UsersRepository } from '../../repositories/users/UsersRepository';
import { AdminsRepository } from '../../repositories/admins/AdminsRepository';
import { EventsRepository } from '../../repositories/events/EventsRepository';

type UpdateAdminRequest = {
  id: number;
  name: string;
  email: string;
  eventId: number;
}

export class UpdateAdminUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private adminsRepository: AdminsRepository,
    private eventsRepository: EventsRepository,
  ) {}

  public async execute({
    id, name, email, eventId,
  }: UpdateAdminRequest): Promise<void> {
    if (!id || !name || !email || !eventId) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const admin = await this.adminsRepository.findById(id);

    if (!admin) {
      throw new APIError({
        code: 500,
        message: 'This admin does not exist.',
      });
    }

    const userEmailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userEmailAlreadyExists && userEmailAlreadyExists.id !== id) {
      throw new APIError({
        code: 500,
        message: 'This email is already in use.',
      });
    }

    const event = await this.eventsRepository.findById(eventId);

    if (!event) {
      throw new APIError({
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
