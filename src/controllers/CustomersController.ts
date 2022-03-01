import { Request, Response } from 'express';

import { prisma } from '../infra/prisma';

import { BCryptHashProvider } from '../providers/hashProvider/implementations/bcryptHashProvider';

import { PrismaUsersRepository } from '../repositories/users/implementations/PrismaUsersRepository';
import { PrismaCustomersRepository } from '../repositories/customers/implementations/PrismaCustomersRepository';

import { CreateUserUseCase } from '../useCases/users/create-user-use-case';
import { CreateCustomerUseCase } from '../useCases/customers/create-customer-use-case';
import { UpdateCustomerUseCase } from '../useCases/customers/update-customer-use-case';
import { FindCustomerByIdUseCase } from '../useCases/customers/find-customer-by-id-use-case';
import { FindAllCustomersUseCase } from '../useCases/customers/find-all-customers-use-case';

export class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const bcryptHashProvider = new BCryptHashProvider();

    const {
      email, name, password, avatarColor,
    } = request.body;

    const customer = await prisma.$transaction(async (prismaClient) => {
      const prismaUsersRepository = new PrismaUsersRepository(prismaClient);
      const prismaCustomersRepository = new PrismaCustomersRepository(prismaClient);

      const createUserUseCase = new CreateUserUseCase(
        prismaUsersRepository,
        bcryptHashProvider,
      );

      const user = await createUserUseCase.execute({ email, name, password });

      const createCustomerUseCase = new CreateCustomerUseCase(
        prismaUsersRepository,
        prismaCustomersRepository,
      );

      return createCustomerUseCase.execute({ userId: user.id, avatarColor });
    }, { maxWait: 10000, timeout: 10000 });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const prismaCustomersRepository = new PrismaCustomersRepository(prisma);

    const updateCustomerUseCase = new UpdateCustomerUseCase(
      prismaCustomersRepository,
    );

    const { id } = request.params;
    const { avatarColor } = request.body;

    await updateCustomerUseCase.execute({ id: Number(id), avatarColor });

    return response.json();
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const prismaCustomersRepository = new PrismaCustomersRepository(prisma);

    const findCustomerByIdUseCase = new FindCustomerByIdUseCase(
      prismaCustomersRepository,
    );

    const { id } = request.params;

    const customer = await findCustomerByIdUseCase.execute({ id: Number(id) });

    return response.json(customer);
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    const prismaCustomersRepository = new PrismaCustomersRepository(prisma);

    const findAllCustomersUseCase = new FindAllCustomersUseCase(
      prismaCustomersRepository,
    );

    const customers = await findAllCustomersUseCase.execute();

    return response.json(customers);
  }
}
