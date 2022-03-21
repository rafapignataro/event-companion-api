import { APIError } from '../../helpers/Error';
import { EventCategoriesRepository } from '../../repositories/EventCategoriesRepository';

import { EventsRepository } from '../../repositories/EventsRepository';

type UpdateEventRequest = {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  logoURL?: string;
  eventCategoryCode: string;
}

export class UpdateEventUseCase {
  constructor(
    private eventsRepository: EventsRepository,
    private eventCategoriesRepository: EventCategoriesRepository,
  ) {}

  public async execute({
    id,
    name,
    startDate,
    endDate,
    logoURL,
    eventCategoryCode,
  }: UpdateEventRequest): Promise<void> {
    if (!id || !name || !startDate || !endDate || !eventCategoryCode) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const event = await this.eventsRepository.findById(id);

    if (!event) {
      throw new APIError({
        code: 500,
        message: 'This event does not exist.',
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

    await this.eventsRepository.update(id, {
      name,
      startDate,
      endDate,
      logoURL,
      eventCategoryId: locationCategoryExists.id,
    });
  }
}
