import { Marker } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { VisitorsRepository } from '../../repositories/VisitorsRepository';
import { MarkersRepository } from '../../repositories/MarkersRepository';
import { EventsRepository } from '../../repositories/EventsRepository';

type CreateMarkerRequest = {
  visitorId: number;
  eventId: number;
  latitude: number;
  longitude: number;
}

export class CreateMarkerUseCase {
  constructor(
    private visitorsRepository: VisitorsRepository,
    private markersRepository: MarkersRepository,
    private eventsRepository: EventsRepository,
  ) { }

  public async execute({
    visitorId,
    eventId,
    latitude,
    longitude,
  }: CreateMarkerRequest): Promise<Marker> {
    if (!visitorId || !eventId || !latitude || !longitude) {
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
    console.log(visitorId, eventId)

    const visitorHasMarker = await this.markersRepository.findByVisitorAndEventId(
      visitorId,
      eventId,
    );

    console.log('visitorHasMarker', visitorHasMarker)

    if (visitorHasMarker) await this.markersRepository.delete(visitorHasMarker.id);

    const marker = await this.markersRepository.create({
      visitorId,
      eventId,
      latitude,
      longitude,
    });

    return marker;
  }
}
