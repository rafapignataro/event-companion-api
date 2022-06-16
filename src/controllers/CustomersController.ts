import { Request, Response } from 'express';

import { prisma } from '../infra/prisma';

import { BCryptHashProvider } from '../providers/hashProvider/implementations/bcryptHashProvider';

import { PrismaUsersRepository } from '../repositories/implementations/prisma/PrismaUsersRepository';
import { PrismaCustomersRepository } from '../repositories/implementations/prisma/PrismaCustomersRepository';

import { CreateCustomerUseCase } from '../useCases/customers/create-customer-use-case';
import { UpdateCustomerUseCase } from '../useCases/customers/update-customer-use-case';
import { FindCustomerByIdUseCase } from '../useCases/customers/find-customer-by-id-use-case';
import { FindAllCustomersUseCase } from '../useCases/customers/find-all-customers-use-case';
import { SearchForCustomersUseCase } from '../useCases/customers/search-for-customer.use-case';
import { JwtUserTokenProvider } from '../providers/userTokenProvider/implementations/jwtUserTokenProvider';

export class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const bcryptHashProvider = new BCryptHashProvider();

    const {
      email, name, password, passwordRepeated, avatarColor,
    } = request.body;

    const customer = await prisma.$transaction(async (prismaClient) => {
      const prismaUsersRepository = new PrismaUsersRepository(prismaClient);
      const prismaCustomersRepository = new PrismaCustomersRepository(prismaClient);

      const createCustomerUseCase = new CreateCustomerUseCase(
        prismaUsersRepository,
        prismaCustomersRepository,
        bcryptHashProvider,
      );

      return createCustomerUseCase.execute({
        name, email, password, passwordRepeated, avatarColor,
      });
    }, { maxWait: 10000, timeout: 10000 });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, avatarColor } = request.body;

    const customer = await prisma.$transaction(async (prismaClient) => {
      const prismaUsersRepository = new PrismaUsersRepository(prismaClient);
      const prismaCustomersRepository = new PrismaCustomersRepository(prismaClient);
      const jwtUserTokenProvider = new JwtUserTokenProvider();

      const updateCustomerUseCase = new UpdateCustomerUseCase(
        prismaUsersRepository,
        prismaCustomersRepository,
        jwtUserTokenProvider
      );

      return updateCustomerUseCase.execute({
        id: Number(id), name, email, avatarColor,
      });
    }, { maxWait: 10000, timeout: 10000 });

    return response.json(customer);
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const prismaCustomersRepository = new PrismaCustomersRepository();

    const findCustomerByIdUseCase = new FindCustomerByIdUseCase(
      prismaCustomersRepository,
    );

    const { id } = request.params;

    const customer = await findCustomerByIdUseCase.execute({ id: Number(id) });

    return response.json(customer);
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    const prismaCustomersRepository = new PrismaCustomersRepository();

    const findAllCustomersUseCase = new FindAllCustomersUseCase(
      prismaCustomersRepository,
    );

    const customers = await findAllCustomersUseCase.execute();

    return response.json(customers);
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const prismaCustomersRepository = new PrismaCustomersRepository();

    const searchForCustomersUseCase = new SearchForCustomersUseCase(
      prismaCustomersRepository,
    );

    const { text } = request.query;

    const customers = await searchForCustomersUseCase.execute({ text: String(text) });

    return response.json(customers);
  }
}
