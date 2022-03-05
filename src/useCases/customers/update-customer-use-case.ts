import { APIError } from '../../helpers/Error';

import { CustomersRepository } from '../../repositories/customers/CustomersRepository';

type UpdateCustomerRequest = {
  id: number;
  avatarColor: string;
}

export class UpdateCustomerUseCase {
  constructor(
    private customersRepository: CustomersRepository,
  ) {}

  public async execute({
    id, avatarColor,
  }: UpdateCustomerRequest): Promise<void> {
    if (!id || !avatarColor) {
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

    const isAvatarColorCorrect = avatarColor.length === 7 && avatarColor.includes('#');

    if (!isAvatarColorCorrect) {
      throw new APIError({
        code: 500,
        message: 'The avatar color passed is wrong. Ex.: #123456',
      });
    }

    await this.customersRepository.update(id, {
      avatarColor,
    });
  }
}
