import { Customer, PrismaClient } from '@prisma/client';
import { prisma, PrismaTransactionClient } from '../../../infra/prisma';

import {
  CustomersRepository, CreateCustomerDTO, UpdateCustomerDTO,
} from '../../CustomersRepository';

export class PrismaCustomersRepository implements CustomersRepository {
  private prismaClient: PrismaClient | PrismaTransactionClient = prisma;

  constructor(prismaTransactionClient?: PrismaTransactionClient) {
    if (prismaTransactionClient) this.prismaClient = prismaTransactionClient;
  }

  public async findById(id: number): Promise<Customer> {
    const customer = await this.prismaClient.customer.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        visitors: {
          include: {
            event: true
          }
        }
      },
    });

    return customer;
  }

  public async findAll(): Promise<Customer[]> {
    const customers = await this.prismaClient.customer.findMany({
      include: {
        user: true,
      },
    });

    return customers;
  }

  public async search(text: string): Promise<Customer[]> {
    const customers = await this.prismaClient.customer.findMany({
      include: {
        user: true,
      },
      where: {
        user: {
          OR: [{
            name: {
              contains: text,
              mode: 'insensitive'
            },
          }, {
            email: {
              contains: text,
              mode: 'insensitive'
            },
          }]
        }
      }
    });

    return customers;
  }

  public async create(data: CreateCustomerDTO): Promise<Customer> {
    const customer = await this.prismaClient.customer.create({
      data,
    });

    return customer;
  }

  public async update(id: number, data: UpdateCustomerDTO): Promise<Customer> {
    const customer = await this.prismaClient.customer.update({
      where: {
        id,
      },
      data,
    });

    return customer;
  }

  public async delete(id: number): Promise<void> {
    await this.prismaClient.customer.delete({
      where: {
        id,
      },
    });
  }
}
