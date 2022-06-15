import { APIError } from '../../helpers/Error';

import { VisitorsRepository } from '../../repositories/VisitorsRepository';
import { MarkersRepository } from '../../repositories/MarkersRepository';
import { EventsRepository } from '../../repositories/EventsRepository';

type DeleteMarkerRequest = {
  id: number;
}

export class DeleteMarkerUseCase {
  constructor(
    private visitorsRepository: VisitorsRepository,
    private markersRepository: MarkersRepository,
    private eventsRepository: EventsRepository,
  ) { }

  public async execute({ id }: DeleteMarkerRequest): Promise<void> {
    if (!id) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const visitorEventMarker = await this.markersRepository.findById(id);

    if (!visitorEventMarker) {
      throw new APIError({
        code: 500,
        message: 'This marker does not exist.',
      });
    }

    await this.markersRepository.delete(visitorEventMarker.id);
  }
}
