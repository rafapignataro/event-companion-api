import { Admin } from '@prisma/client';

import { APIError } from '../../helpers/Error';
import { UsersRepository } from '../../repositories/users/UsersRepository';
import { AdminsRepository } from '../../repositories/admins/AdminsRepository';

type CreateAdminRequest = {
  userId: number;
  festivalId: number;
}

export class CreateAdminUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private adminsRepository: AdminsRepository,
  ) {}

  public async execute({
    userId,
    festivalId,
  }: CreateAdminRequest): Promise<Admin> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new APIError({
        code: 500,
        message: 'This user does not exist.',
      });
    }

    const admin = await this.adminsRepository.create({
      userId,
      festivalId,
    });

    return admin;
  }
}
