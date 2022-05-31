import { Activation } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { ActivationsRepository } from '../../repositories/ActivationsRepository';
import { LocationsRepository } from '../../repositories/LocationsRepository';
import { EventsRepository } from '../../repositories/EventsRepository';

type CreateActivationRequest = {
  description: string;
  startDate: Date;
  endDate: Date;
  locationId: number;
}

export class CreateActivationUseCase {
  constructor(
    private activationsRepository: ActivationsRepository,
    private locationsRepository: LocationsRepository,
    private eventsRepository: EventsRepository,
  ) { }

  public async execute({
    description,
    startDate,
    endDate,
    locationId,
  }: CreateActivationRequest): Promise<Activation> {
    if (!description || !startDate || !endDate || !locationId) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const locationExists = await this.locationsRepository.findById(locationId);

    if (!locationExists) {
      throw new APIError({
        code: 500,
        message: 'This location does not exist.',
      });
    }

    const activation = await this.activationsRepository.create({
      description,
      startDate,
      endDate,
      locationId,
    });

    const location = await this.locationsRepository.findById(locationId);

    await this.eventsRepository.updateVersion(location.eventId);

    return activation;
  }
}
