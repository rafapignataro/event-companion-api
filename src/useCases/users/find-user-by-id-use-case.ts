import { User } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { UsersRepository } from '../../repositories/UsersRepository';

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
    if (!id) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new APIError({
        code: 500,
        message: 'This user does not exist.',
      });
    }

    return user;
  }
}
