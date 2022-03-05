import { Marker } from '@prisma/client';

import { MarkersRepository } from '../../repositories/MarkersRepository';

type FindMarkersRequest = {
  visitorId?: number;
  eventId?: number;
}

export class FindMarkersUseCase {
  constructor(
    private markersRepository: MarkersRepository,
  ) {}

  public async execute({ visitorId, eventId }: FindMarkersRequest): Promise<Marker[]> {
    const markers = await this.markersRepository.findAll({
      eventId,
      visitorId,
    });

    return markers;
  }
}
