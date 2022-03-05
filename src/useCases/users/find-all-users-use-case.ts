import { User } from '@prisma/client';

import { UsersRepository } from '../../repositories/UsersRepository';

export class FindAllUsersUseCase {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}
