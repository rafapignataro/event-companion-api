import { Event } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { EventCategoriesRepository } from '../../repositories/EventCategoriesRepository';
import { EventsRepository } from '../../repositories/EventsRepository';

type CreateEventRequest = {
  name: string;
  startDate: Date;
  endDate: Date;
  logoURL?: string;
  eventCategoryCode: string;
}

export class CreateEventUseCase {
  constructor(
    private eventsRepository: EventsRepository,
    private eventCategoriesRepository: EventCategoriesRepository,
  ) {}

  public async execute({
    name,
    startDate,
    endDate,
    logoURL,
    eventCategoryCode,
  }: CreateEventRequest): Promise<Event> {
    if (!name || !startDate || !endDate || !eventCategoryCode) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const locationCategoryExists = await this.eventCategoriesRepository.findByCode(
      eventCategoryCode,
    );

    if (!locationCategoryExists) {
      throw new APIError({
        code: 500,
        message: 'This event category does not exist.',
      });
    }

    // TODO: Compare dates;

    const event = await this.eventsRepository.create({
      name,
      startDate,
      endDate,
      logoURL,
      eventCategoryId: locationCategoryExists.id,
    });

    return event;
  }
}
