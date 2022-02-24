import { Event } from '@prisma/client';

import { EventsRepository } from '../../repositories/events/EventsRepository';

export class FindAllEventsUseCase {
  constructor(
    private eventsRepository: EventsRepository,
  ) {}

  public async execute(): Promise<Event[]> {
    const events = await this.eventsRepository.findEvents();

    return events;
  }
}
