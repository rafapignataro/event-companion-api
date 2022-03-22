import { APIError } from '../../helpers/Error';

import { UsersRepository } from '../../repositories/UsersRepository';
import { CustomersRepository } from '../../repositories/CustomersRepository';

type UpdateCustomerRequest = {
  id: number;
  name: string;
  email: string;
  avatarColor?: string;
}

export class UpdateCustomerUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private customersRepository: CustomersRepository,
  ) {}

  public async execute({
    id, name, email, avatarColor,
  }: UpdateCustomerRequest): Promise<void> {
    if (!id || !name || !email) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new APIError({
        code: 500,
        message: 'This customer does not exist.',
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

    await this.usersRepository.update(customer.id, {
      name,
      email,
    });

    await this.customersRepository.update(id, {
      avatarColor: avatarColor || customer.avatarColor,
    });
  }
}
