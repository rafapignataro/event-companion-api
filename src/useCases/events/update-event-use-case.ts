import { APIError } from '../../helpers/Error';

import { EventsRepository } from '../../repositories/events/EventsRepository';

type UpdateEventRequest = {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  logoURL?: string;
  eventCategoryId: number;
}

export class UpdateEventUseCase {
  constructor(
    private eventsRepository: EventsRepository,
  ) {}

  public async execute({
    id,
    name,
    startDate,
    endDate,
    logoURL,
    eventCategoryId,
  }: UpdateEventRequest): Promise<void> {
    const event = await this.eventsRepository.findEventByID(id);

    if (!event) {
      throw new APIError({
        code: 500,
        message: 'This event does not exist.',
      });
    }

    await this.eventsRepository.updateEvent(id, {
      name,
      startDate,
      endDate,
      logoURL,
      eventCategoryId,
    });
  }
}
