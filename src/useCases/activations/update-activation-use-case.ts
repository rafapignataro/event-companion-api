import { APIError } from '../../helpers/Error';

import { ActivationsRepository } from '../../repositories/ActivationsRepository';
import { LocationsRepository } from '../../repositories/LocationsRepository';

type UpdateActivationRequest = {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  locationId: number;
}

export class UpdateActivationUseCase {
  constructor(
    private activationsRepository: ActivationsRepository,
    private locationsRepository: LocationsRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    startDate,
    endDate,
    locationId,
  }: UpdateActivationRequest): Promise<void> {
    if (!id || !name || !description || !startDate || !endDate || !locationId) {
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

    const locationExists = await this.locationsRepository.findById(id);

    if (!locationExists) {
      throw new APIError({
        code: 500,
        message: 'This location does not exist.',
      });
    }

    await this.activationsRepository.update(activationExists.id, {
      name,
      description,
      startDate,
      endDate,
    });
  }
}
