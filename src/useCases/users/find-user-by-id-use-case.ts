import { User } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { UsersRepository } from '../../repositories/users/UsersRepository';

type FindUserByIdRequest = {
  id: number;
}

export class FindUserByIdUseCase {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  public async execute({
    id,
  }: FindUserByIdRequest): Promise<User> {
    const user = await this.usersRepository.findUserByID(id);

    if (!user) {
      throw new APIError({
        code: 500,
        message: 'This user does not exist.',
      });
    }

    return user;
  }
}
