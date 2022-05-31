import { APIError } from '../../helpers/Error';

import { ActivationsRepository } from '../../repositories/ActivationsRepository';
import { EventsRepository } from '../../repositories/EventsRepository';
import { LocationsRepository } from '../../repositories/LocationsRepository';

type UpdateActivationRequest = {
  id: number;
  description: string;
  startDate: Date;
  endDate: Date;
  locationId: number;
}

export class UpdateActivationUseCase {
  constructor(
    private activationsRepository: ActivationsRepository,
    private locationsRepository: LocationsRepository,
    private eventsRepository: EventsRepository,
  ) { }

  public async execute({
    id,
    description,
    startDate,
    endDate,
    locationId,
  }: UpdateActivationRequest): Promise<void> {
    if (!id || !description || !startDate || !endDate || !locationId) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const activationExists = await this.activationsRepository.findById(id);

    if (!activationExists) {
      throw new APIError({
        code: 500,
        message: 'This activation does not exist.',
      });
    }

    const locationExists = await this.locationsRepository.findById(locationId);

    if (!locationExists) {
      throw new APIError({
        code: 500,
        message: 'This location does not exist.',
      });
    }

    await this.activationsRepository.update(activationExists.id, {
      description,
      startDate,
      endDate,
    });

    const location = await this.locationsRepository.findById(locationId);

    await this.eventsRepository.updateVersion(location.eventId);
  }
}
