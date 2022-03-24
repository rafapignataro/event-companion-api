import { Activation } from '@prisma/client';

import { ActivationsRepository } from '../../repositories/ActivationsRepository';

type FindActivationsRequest = {
  locationId?: number;
}

export class FindActivationsUseCase {
  constructor(
    private activationsRepository: ActivationsRepository,
  ) {}

  public async execute({ locationId }: FindActivationsRequest): Promise<Activation[]> {
    const activations = await this.activationsRepository.findAll({
      locationId,
    });

    return activations;
  }
}
