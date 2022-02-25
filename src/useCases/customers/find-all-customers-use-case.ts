import { Customer } from '@prisma/client';

import { CustomersRepository } from '../../repositories/customers/CustomersRepository';

export class FindAllCustomersUseCase {
  constructor(
    private customersRepository: CustomersRepository,
  ) {}

  public async execute(): Promise<Customer[]> {
    const customers = await this.customersRepository.findAll();

    return customers;
  }
}
