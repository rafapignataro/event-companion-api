import { Activation } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { ActivationsRepository } from '../../repositories/ActivationsRepository';
import { LocationsRepository } from '../../repositories/LocationsRepository';

type CreateActivationRequest = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  locationId: number;
}

export class CreateActivationUseCase {
  constructor(
    private activationsRepository: ActivationsRepository,
    private locationsRepository: LocationsRepository,
  ) {}

  public async execute({
    name,
    description,
    startDate,
    endDate,
    locationId,
  }: CreateActivationRequest): Promise<Activation> {
    if (!name || !description || !startDate || !endDate || !locationId) {
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
      name,
      description,
      startDate,
      endDate,
      locationId,
    });

    return activation;
  }
}
