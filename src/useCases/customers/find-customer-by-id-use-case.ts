import { Customer } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { CustomersRepository } from '../../repositories/customers/CustomersRepository';

type FindCustomerByIdRequest = {
  id: number;
}

export class FindCustomerByIdUseCase {
  constructor(
    private customersRepository: CustomersRepository,
  ) {}

  public async execute({
    id,
  }: FindCustomerByIdRequest): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new APIError({
        code: 500,
        message: 'This customer does not exist.',
      });
    }

    return customer;
  }
}
