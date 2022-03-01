import { Request, Response } from 'express';

import { prisma } from '../infra/prisma';

import { BCryptHashProvider } from '../providers/hashProvider/implementations/bcryptHashProvider';

import { PrismaUsersRepository } from '../repositories/users/implementations/PrismaUsersRepository';
import { PrismaEventsRepository } from '../repositories/events/implementations/PrismaEventsRepository';
import { PrismaAdminsRepository } from '../repositories/admins/implementations/PrismaAdminsRepository';

import { CreateUserUseCase } from '../useCases/users/create-user-use-case';
import { CreateAdminUseCase } from '../useCases/admins/create-admin-use-case';
import { UpdateAdminUseCase } from '../useCases/admins/update-admin-use-case';
import { FindAdminByIdUseCase } from '../useCases/admins/find-admin-by-id-use-case';
import { FindAllAdminsUseCase } from '../useCases/admins/find-all-admins-use-case';

export class AdminsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const bcryptHashProvider = new BCryptHashProvider();

    const prismaUsersRepository = new PrismaUsersRepository(prisma);
    const prismaEventsRepository = new PrismaEventsRepository(prisma);
    const prismaAdminsRepository = new PrismaAdminsRepository(prisma);

    const {
      email, name, password, eventId,
    } = request.body;

    const createUserUseCase = new CreateUserUseCase(
      prismaUsersRepository,
      bcryptHashProvider,
    );

    const user = await createUserUseCase.execute({ email, name, password });

    const createAdminUseCase = new CreateAdminUseCase(
      prismaUsersRepository,
      prismaEventsRepository,
      prismaAdminsRepository,
    );

    const admin = await createAdminUseCase.execute({ userId: user.id, eventId });

    return response.json(admin);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const prismaAdminsRepository = new PrismaAdminsRepository(prisma);
    const prismaEventsRepository = new PrismaEventsRepository(prisma);

    const updateAdminUseCase = new UpdateAdminUseCase(
      prismaAdminsRepository,
      prismaEventsRepository,
    );

    const { id } = request.params;
    const { eventId } = request.body;

    await updateAdminUseCase.execute({ id: Number(id), eventId });

    return response.json();
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const prismaAdminsRepository = new PrismaAdminsRepository(prisma);

    const findAdminByIdUseCase = new FindAdminByIdUseCase(
      prismaAdminsRepository,
    );

    const { id } = request.params;

    const admin = await findAdminByIdUseCase.execute({ id: Number(id) });

    return response.json(admin);
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    const prismaAdminsRepository = new PrismaAdminsRepository(prisma);

    const findAllAdminsUseCase = new FindAllAdminsUseCase(
      prismaAdminsRepository,
    );

    const admins = await findAllAdminsUseCase.execute();

    return response.json(admins);
  }
}
