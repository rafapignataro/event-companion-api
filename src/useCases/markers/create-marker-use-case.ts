import { Marker } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { VisitorsRepository } from '../../repositories/visitors/VisitorsRepository';
import { MarkersRepository } from '../../repositories/markers/MarkersRepository';
import { EventsRepository } from '../../repositories/events/EventsRepository';

type CreateMarkerRequest = {
  visitorId: number;
  eventId: number;
  latitude: string;
  longitude: string;
}

export class CreateMarkerUseCase {
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
  }: CreateMarkerRequest): Promise<Marker> {
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

    if (markerRelationExists) {
      throw new APIError({
        code: 500,
        message: 'This visitor already has a marker in this event.',
      });
    }

    const marker = await this.markersRepository.create({
      visitorId,
      eventId,
      latitude,
      longitude,
    });

    return marker;
  }
}
