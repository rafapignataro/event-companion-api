import { Event } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { EventsRepository } from '../../repositories/EventsRepository';

type CreateEventRequest = {
  name: string;
  startDate: Date;
  endDate: Date;
  logoURL?: string;
  eventCategoryId: number;
}

export class CreateEventUseCase {
  constructor(
    private eventsRepository: EventsRepository,
  ) {}

  public async execute({
    name,
    startDate,
    endDate,
    logoURL,
    eventCategoryId,
  }: CreateEventRequest): Promise<Event> {
    if (!name || !startDate || !endDate || !eventCategoryId) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    // TODO: Compare dates;

    const event = await this.eventsRepository.create({
      name,
      startDate,
      endDate,
      logoURL,
      eventCategoryId,
    });

    return event;
  }
}
