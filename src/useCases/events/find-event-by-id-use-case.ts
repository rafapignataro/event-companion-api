import { Event } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { EventsRepository } from '../../repositories/events/EventsRepository';

type FindEventByIdRequest = {
  id: number;
}

export class FindEventByIdUseCase {
  constructor(
    private eventsRepository: EventsRepository,
  ) {}

  public async execute({
    id,
  }: FindEventByIdRequest): Promise<Event> {
    const event = await this.eventsRepository.findById(id);

    if (!event) {
      throw new APIError({
        code: 500,
        message: 'This event does not exist.',
      });
    }

    return event;
  }
}
