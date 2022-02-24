import { User } from '@prisma/client';

import { UsersRepository } from '../../repositories/users/UsersRepository';

export class FindAllUsersUseCase {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const user = await this.usersRepository.findUsers();

    return user;
  }
}
