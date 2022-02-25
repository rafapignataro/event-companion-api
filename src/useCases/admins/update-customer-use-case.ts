import { APIError } from '../../helpers/Error';

import { AdminsRepository } from '../../repositories/admins/AdminsRepository';

type UpdateAdminRequest = {
  id: number;
  festivalId: number;
}

export class UpdateAdminUseCase {
  constructor(
    private adminsRepository: AdminsRepository,
  ) {}

  public async execute({
    id, festivalId,
  }: UpdateAdminRequest): Promise<void> {
    const admin = await this.adminsRepository.findById(id);

    if (!admin) {
      throw new APIError({
        code: 500,
        message: 'This admin does not exist.',
      });
    }

    await this.adminsRepository.update(id, {
      festivalId,
    });
  }
}
