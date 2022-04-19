import { APIError } from '../../helpers/Error';

import { LocationsRepository } from '../../repositories/LocationsRepository';
import { EventsRepository } from '../../repositories/EventsRepository';

type DeleteLocationRequest = {
  id: number;
}

export class DeleteLocationUseCase {
  constructor(
    private locationsRepository: LocationsRepository,
    private eventsRepository: EventsRepository,
  ) {}

  public async execute({
    id,
  }: DeleteLocationRequest): Promise<void> {
    if (!id) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const locationExists = await this.locationsRepository.findById(id);

    if (!locationExists) {
      throw new APIError({
        code: 500,
        message: 'This location does not exist.',
      });
    }

    await this.locationsRepository.delete(locationExists.id);

    await this.eventsRepository.updateVersion(locationExists.eventId);
  }
}
