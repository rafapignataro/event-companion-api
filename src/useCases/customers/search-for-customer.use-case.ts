import { Customer } from '@prisma/client';
import { APIError } from '../../helpers/Error';

import { CustomersRepository } from '../../repositories/CustomersRepository';

type SearchForCustomers = {
  text: string;
}

export class SearchForCustomersUseCase {
  constructor(
    private customersRepository: CustomersRepository,
  ) { }

  public async execute({ text }: SearchForCustomers): Promise<Customer[]> {
    if (text === null || text === undefined || text === 'null' || text === 'undefined') {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    if (text === '') {
      throw new APIError({
        code: 500,
        message: 'Please, provide any information to search.',
      });
    }

    const customers = await this.customersRepository.search(text);

    return customers;
  }
}
