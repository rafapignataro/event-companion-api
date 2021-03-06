import { Customer } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { HashProvider } from '../../providers/hashProvider/HashProvider';

import { UsersRepository } from '../../repositories/UsersRepository';
import { CustomersRepository } from '../../repositories/CustomersRepository';

type CreateCustomerRequest = {
  name: string;
  email: string;
  password: string;
  passwordRepeated: string;
  avatarColor?: string;
}

export class CreateCustomerUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private customersRepository: CustomersRepository,
    private hashProvider: HashProvider,
  ) { }

  public async execute({
    name,
    email,
    password,
    passwordRepeated,
    avatarColor,
  }: CreateCustomerRequest): Promise<Customer> {
    if (!name || !email || !password) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    if (password !== passwordRepeated) {
      throw new APIError({
        code: 500,
        message: 'The passwords provided must be the same.'
      })
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

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

    if (avatarColor) {
      const isAvatarColorCorrect = avatarColor.length === 7 && avatarColor.includes('#');

      if (!isAvatarColorCorrect) {
        throw new APIError({
          code: 500,
          message: 'The avatar color passed is wrong. Ex.: #59FFFF',
        });
      }
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      role: 'CUSTOMER',
    });

    const customer = await this.customersRepository.create({
      userId: user.id,
      avatarColor: avatarColor || '#59FFFF',
    });

    return customer;
  }
}