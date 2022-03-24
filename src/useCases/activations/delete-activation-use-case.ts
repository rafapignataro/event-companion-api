import { APIError } from '../../helpers/Error';

import { ActivationsRepository } from '../../repositories/ActivationsRepository';

type DeleteActivationRequest = {
  id: number;
}

export class DeleteActivationUseCase {
  constructor(
    private activationsRepository: ActivationsRepository,
  ) {}

  public async execute({
    id,
  }: DeleteActivationRequest): Promise<void> {
    if (!id) {
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

    await this.activationsRepository.delete(activationExists.id);
  }
}
