import { Admin } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { AdminsRepository } from '../../repositories/AdminsRepository';

type FindAdminByIdRequest = {
  id: number;
}

export class FindAdminByIdUseCase {
  constructor(
    private adminsRepository: AdminsRepository,
  ) {}

  public async execute({
    id,
  }: FindAdminByIdRequest): Promise<Admin> {
    if (!id) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const admin = await this.adminsRepository.findById(id);

    if (!admin) {
      throw new APIError({
        code: 500,
        message: 'This admin does not exist.',
      });
    }

    return admin;
  }
}
