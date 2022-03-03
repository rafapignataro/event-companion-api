import { Request, Response } from 'express';

import { prisma } from '../infra/prisma';

import { PrismaVisitorsRepository } from '../repositories/visitors/implementations/PrismaVisitorsRepository';
import { PrismaCustomersRepository } from '../repositories/customers/implementations/PrismaCustomersRepository';
import { PrismaEventsRepository } from '../repositories/events/implementations/PrismaEventsRepository';

import { CreateVisitorUseCase } from '../useCases/visitors/create-visitor-use-case';
import { FindVisitorsUseCase } from '../useCases/visitors/find-all-visitors-use-case';

export class VisitorsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const prismaCustomersRepository = new PrismaCustomersRepository(prisma);
    const prismaVisitorsRepository = new PrismaVisitorsRepository(prisma);
    const prismaEventsRepository = new PrismaEventsRepository(prisma);

    const createVisitorUseCase = new CreateVisitorUseCase(
      prismaCustomersRepository,
      prismaVisitorsRepository,
      prismaEventsRepository,
    );

    const { customerId, eventId } = request.body;

    const visitor = await createVisitorUseCase.execute({ customerId, eventId });

    return response.json(visitor);
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    const prismaVisitorsRepository = new PrismaVisitorsRepository(prisma);

    const findVisitorsUseCase = new FindVisitorsUseCase(
      prismaVisitorsRepository,
    );

    const { customerId, eventId } = request.query;

    const users = await findVisitorsUseCase.execute({
      customerId: customerId ? Number(customerId) : undefined,
      eventId: eventId ? Number(eventId) : undefined,
    });

    return response.json(users);
  }
}
