import { Admin } from '@prisma/client';

import { AdminsRepository } from '../../repositories/admins/AdminsRepository';

export class FindAllAdminsUseCase {
  constructor(
    private adminsRepository: AdminsRepository,
  ) {}

  public async execute(): Promise<Admin[]> {
    const admins = await this.adminsRepository.findAll();

    return admins;
  }
}
