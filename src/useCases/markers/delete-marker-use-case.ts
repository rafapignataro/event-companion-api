import { APIError } from '../../helpers/Error';

import { VisitorsRepository } from '../../repositories/VisitorsRepository';
import { MarkersRepository } from '../../repositories/MarkersRepository';
import { EventsRepository } from '../../repositories/EventsRepository';

type DeleteMarkerRequest = {
  visitorId: number;
  eventId: number;
}

export class DeleteMarkerUseCase {
  constructor(
    private visitorsRepository: VisitorsRepository,
    private markersRepository: MarkersRepository,
    private eventsRepository: EventsRepository,
  ) {}

  public async execute({
    visitorId,
    eventId,
  }: DeleteMarkerRequest): Promise<void> {
    if (!visitorId || !eventId) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const visitorExists = await this.visitorsRepository.findById(visitorId);

    if (!visitorExists) {
      throw new APIError({
        code: 500,
        message: 'This visitor does not exist.',
      });
    }

    const eventExists = await this.eventsRepository.findById(eventId);

    if (!eventExists) {
      throw new APIError({
        code: 500,
        message: 'This event does not exist.',
      });
    }

    const visitorEventMarker = await this.markersRepository.findByVisitorAndEventId(
      visitorId,
      eventId,
    );

    if (!visitorEventMarker) {
      throw new APIError({
        code: 500,
        message: 'This visitor does not have a marker in this event.',
      });
    }

    await this.markersRepository.delete(visitorEventMarker.id);
  }
}
