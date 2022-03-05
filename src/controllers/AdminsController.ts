import { Request, Response } from 'express';

import { prisma } from '../infra/prisma';

import { BCryptHashProvider } from '../providers/hashProvider/implementations/bcryptHashProvider';

import { PrismaUsersRepository } from '../repositories/users/implementations/PrismaUsersRepository';
import { PrismaEventsRepository } from '../repositories/events/implementations/PrismaEventsRepository';
import { PrismaAdminsRepository } from '../repositories/admins/implementations/PrismaAdminsRepository';

import { CreateAdminUseCase } from '../useCases/admins/create-admin-use-case';
import { UpdateAdminUseCase } from '../useCases/admins/update-admin-use-case';
import { FindAdminByIdUseCase } from '../useCases/admins/find-admin-by-id-use-case';
import { FindAllAdminsUseCase } from '../useCases/admins/find-all-admins-use-case';

export class AdminsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const bcryptHashProvider = new BCryptHashProvider();

    const {
      email, name, password, eventId,
    } = request.body;

    const admin = await prisma.$transaction(async (prismaClient) => {
      const prismaUsersRepository = new PrismaUsersRepository(prismaClient);
      const prismaEventsRepository = new PrismaEventsRepository(prismaClient);
      const prismaAdminsRepository = new PrismaAdminsRepository(prismaClient);

      const createAdminUseCase = new CreateAdminUseCase(
        prismaUsersRepository,
        prismaEventsRepository,
        prismaAdminsRepository,
        bcryptHashProvider,
      );

      return createAdminUseCase.execute({
        name,
        email,
        password,
        eventId,
      });
    }, { maxWait: 10000, timeout: 10000 });

    return response.json(admin);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, eventId } = request.body;

    await prisma.$transaction(async (prismaClient) => {
      const prismaUsersRepository = new PrismaUsersRepository(prismaClient);
      const prismaEventsRepository = new PrismaEventsRepository(prismaClient);
      const prismaAdminsRepository = new PrismaAdminsRepository(prismaClient);

      const updateAdminUseCase = new UpdateAdminUseCase(
        prismaUsersRepository,
        prismaAdminsRepository,
        prismaEventsRepository,
      );

      await updateAdminUseCase.execute({
        id: Number(id), name, email, eventId,
      });
    }, { maxWait: 10000, timeout: 10000 });

    return response.json();
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const prismaAdminsRepository = new PrismaAdminsRepository();

    const findAdminByIdUseCase = new FindAdminByIdUseCase(
      prismaAdminsRepository,
    );

    const { id } = request.params;

    const admin = await findAdminByIdUseCase.execute({ id: Number(id) });

    return response.json(admin);
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    const prismaAdminsRepository = new PrismaAdminsRepository();

    const findAllAdminsUseCase = new FindAllAdminsUseCase(
      prismaAdminsRepository,
    );

    const admins = await findAllAdminsUseCase.execute();

    return response.json(admins);
  }
}
