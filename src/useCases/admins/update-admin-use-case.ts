import { APIError } from '../../helpers/Error';

import { AdminsRepository } from '../../repositories/admins/AdminsRepository';
import { EventsRepository } from '../../repositories/events/EventsRepository';

type UpdateAdminRequest = {
  id: number;
  eventId: number;
}

export class UpdateAdminUseCase {
  constructor(
    private adminsRepository: AdminsRepository,
    private eventsRepository: EventsRepository,
  ) {}

  public async execute({
    id, eventId,
  }: UpdateAdminRequest): Promise<void> {
    if (!id || !eventId) {
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

    const event = await this.eventsRepository.findById(eventId);

    if (!event) {
      throw new APIError({
        code: 500,
        message: 'This event does not exist.',
      });
    }

    await this.adminsRepository.update(id, {
      eventId,
    });
  }
}
