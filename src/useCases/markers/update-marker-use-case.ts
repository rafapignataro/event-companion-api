import { Marker } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { VisitorsRepository } from '../../repositories/visitors/VisitorsRepository';
import { MarkersRepository } from '../../repositories/markers/MarkersRepository';
import { EventsRepository } from '../../repositories/events/EventsRepository';

type UpdateMarkerRequest = {
  visitorId: number;
  eventId: number;
  latitude: string;
  longitude: string;
}

export class UpdateMarkerUseCase {
  constructor(
    private visitorsRepository: VisitorsRepository,
    private markersRepository: MarkersRepository,
    private eventsRepository: EventsRepository,
  ) {}

  public async execute({
    visitorId,
    eventId,
    latitude,
    longitude,
  }: UpdateMarkerRequest): Promise<void> {
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

    const markerRelationExists = await this.markersRepository.findByVisitorAndEventId(
      visitorId,
      eventId,
    );

    if (!markerRelationExists) {
      throw new APIError({
        code: 500,
        message: 'This visitor does not have a marker in this event.',
      });
    }

    await this.markersRepository.update(markerRelationExists.id, {
      latitude,
      longitude,
    });
  }
}
