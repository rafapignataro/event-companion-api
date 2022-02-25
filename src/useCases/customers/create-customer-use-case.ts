import { Customer } from '@prisma/client';

import { APIError } from '../../helpers/Error';
import { UsersRepository } from '../../repositories/users/UsersRepository';
import { CustomersRepository } from '../../repositories/customers/CustomersRepository';

type CreateCustomerRequest = {
  userId: number;
  avatarColor?: string;
}

export class CreateCustomerUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private customersRepository: CustomersRepository,
  ) {}

  public async execute({
    userId,
    avatarColor,
  }: CreateCustomerRequest): Promise<Customer> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new APIError({
        code: 500,
        message: 'This user does not exist.',
      });
    }

    if (avatarColor) {
      const isAvatarColorCorrect = avatarColor.length === 7 && avatarColor.includes('#');

      if (!isAvatarColorCorrect) {
        throw new APIError({
          code: 500,
          message: 'The avatar color passed is wrong. Ex.: #123456',
        });
      }
    }

    const customer = await this.customersRepository.create({
      userId,
      avatarColor: avatarColor || '#FF59BC',
    });

    return customer;
  }
}
