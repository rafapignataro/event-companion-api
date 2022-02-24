import { Event } from '@prisma/client';

import { EventsRepository } from '../../repositories/events/EventsRepository';

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
    // TODO: Compare dates;

    const event = await this.eventsRepository.createEvent({
      name,
      startDate,
      endDate,
      logoURL,
      eventCategoryId,
    });

    return event;
  }
}
