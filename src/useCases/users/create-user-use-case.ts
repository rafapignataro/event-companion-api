import { User } from '@prisma/client';

import { APIError } from '../../helpers/Error';
import { HashProvider } from '../../providers/hashProvider/HashProvider';
import { UsersRepository } from '../../repositories/users/UsersRepository';

type CreateUserRequest = {
  email: string;
  name: string
  password: string;
}

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: HashProvider,
  ) {}

  public async execute({
    email, name, password,
  }: CreateUserRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findUserByEmail(email);

    if (userAlreadyExists) {
      throw new APIError({
        code: 500,
        message: 'This email is already in use.',
      });
    }

    if (password.length < 6) {
      throw new APIError({
        code: 500,
        message: 'The password must have more than 6 letters.',
      });
    }

    const passwordHash = await this.hashProvider.create(password);

    const user = await this.usersRepository.createUser({
      email,
      name,
      password: passwordHash,
    });

    return user;
  }
}
