import { Request, Response } from 'express';

import { prisma } from '../infra/prisma';

import { BCryptHashProvider } from '../providers/hashProvider/implementations/bcryptHashProvider';

import { PrismaUsersRepository } from '../repositories/users/implementations/PrismaUsersRepository';
import { PrismaEventsRepository } from '../repositories/events/implementations/PrismaEventsRepository';
import { PrismaBrandsRepository } from '../repositories/brands/implementations/PrismaBrandsRepository';

import { CreateUserUseCase } from '../useCases/users/create-user-use-case';
import { CreateBrandUseCase } from '../useCases/brands/create-brand-use-case';
import { UpdateBrandUseCase } from '../useCases/brands/update-brand-use-case';
import { FindBrandByIdUseCase } from '../useCases/brands/find-brand-by-id-use-case';
import { FindAllBrandsUseCase } from '../useCases/brands/find-all-brands-use-case';

export class BrandsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const bcryptHashProvider = new BCryptHashProvider();

    const {
      email, name, password, eventId,
    } = request.body;

    const brand = await prisma.$transaction(async (prismaClient) => {
      const prismaUsersRepository = new PrismaUsersRepository(prismaClient);
      const prismaEventsRepository = new PrismaEventsRepository(prismaClient);
      const prismaBrandsRepository = new PrismaBrandsRepository(prismaClient);

      const createUserUseCase = new CreateUserUseCase(
        prismaUsersRepository,
        bcryptHashProvider,
      );

      const user = await createUserUseCase.execute({ email, name, password });

      const createBrandUseCase = new CreateBrandUseCase(
        prismaUsersRepository,
        prismaEventsRepository,
        prismaBrandsRepository,
      );

      return createBrandUseCase.execute({ userId: user.id, eventId });
    }, { maxWait: 10000, timeout: 10000 });

    return response.json(brand);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const prismaBrandsRepository = new PrismaBrandsRepository(prisma);
    const prismaEventsRepository = new PrismaEventsRepository(prisma);

    const updateBrandUseCase = new UpdateBrandUseCase(
      prismaBrandsRepository,
      prismaEventsRepository,
    );

    const { id } = request.params;
    const { eventId } = request.body;

    await updateBrandUseCase.execute({ id: Number(id), eventId });

    return response.json();
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const prismaBrandsRepository = new PrismaBrandsRepository(prisma);

    const findBrandByIdUseCase = new FindBrandByIdUseCase(
      prismaBrandsRepository,
    );

    const { id } = request.params;

    const brand = await findBrandByIdUseCase.execute({ id: Number(id) });

    return response.json(brand);
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    const prismaBrandsRepository = new PrismaBrandsRepository(prisma);

    const findAllBrandsUseCase = new FindAllBrandsUseCase(
      prismaBrandsRepository,
    );

    const brands = await findAllBrandsUseCase.execute();

    return response.json(brands);
  }
}
