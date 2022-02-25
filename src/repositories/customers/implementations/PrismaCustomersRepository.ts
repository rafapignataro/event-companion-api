import { Customer } from '@prisma/client';
import { prisma } from '../../../infra/prisma';

import {
  CustomersRepository, CreateCustomerDTO, UpdateCustomerDTO,
} from '../CustomersRepository';

export class PrismaCustomersRepository implements CustomersRepository {
  public async findById(id: number): Promise<Customer> {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findAll(): Promise<Customer[]> {
    const customers = await prisma.customer.findMany();

    return customers;
  }

  public async create(data: CreateCustomerDTO): Promise<Customer> {
    const customer = await prisma.customer.create({
      data,
    });

    return customer;
  }

  public async update(id: number, data: UpdateCustomerDTO): Promise<Customer> {
    const customer = await prisma.customer.update({
      where: {
        id,
      },
      data,
    });

    return customer;
  }

  public async delete(id: number): Promise<void> {
    await prisma.customer.delete({
      where: {
        id,
      },
    });
  }
}
