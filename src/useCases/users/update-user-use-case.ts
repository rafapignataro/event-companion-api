import { APIError } from '../../helpers/Error';

import { UsersRepository } from '../../repositories/users/UsersRepository';

type UpdateUserRequest = {
  id: number;
  email: string;
  name: string
}

export class UpdateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  public async execute({
    id, email, name,
  }: UpdateUserRequest): Promise<void> {
    const user = await this.usersRepository.findUserByID(id);

    if (!user) {
      throw new APIError({
        code: 500,
        message: 'This user does not exist.',
      });
    }

    const userEmailAlreadyExists = await this.usersRepository.findUserByEmail(email);

    if (userEmailAlreadyExists && userEmailAlreadyExists.id !== id) {
      throw new APIError({
        code: 500,
        message: 'This email is already in use.',
      });
    }

    await this.usersRepository.updateUser(id, {
      name,
      email,
    });
  }
}
