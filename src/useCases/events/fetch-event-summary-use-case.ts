import { APIError } from '../../helpers/Error';

import { EventsRepository, EventSummaryDTO } from '../../repositories/EventsRepository';

type FetchEventSummaryRequest = {
  id: number;
  version: number;
}

export class FetchEventSummaryUseCase {
  constructor(
    private eventsRepository: EventsRepository,
  ) {}

  public async execute({
    id,
    version,
  }: FetchEventSummaryRequest): Promise<EventSummaryDTO | null> {
    if (!id || !version) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const eventSummary = await this.eventsRepository.summary(id);

    if (!eventSummary) {
      throw new APIError({
        code: 500,
        message: 'This event does not exist.',
      });
    }

    if (version > eventSummary.version) {
      throw new APIError({
        code: 500,
        message: 'This event version does not exist.',
      });
    }

    if (version === eventSummary.version) return null;

    return eventSummary;
  }
}
