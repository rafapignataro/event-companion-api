import { Request, Response } from 'express';

import { PrismaVisitorsRepository } from '../repositories/implementations/prisma/PrismaVisitorsRepository';
import { PrismaCustomersRepository } from '../repositories/implementations/prisma/PrismaCustomersRepository';
import { PrismaEventsRepository } from '../repositories/implementations/prisma/PrismaEventsRepository';

import { CreateVisitorUseCase } from '../useCases/visitors/create-visitor-use-case';
import { FindVisitorsUseCase } from '../useCases/visitors/find-all-visitors-use-case';

export class VisitorsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const prismaCustomersRepository = new PrismaCustomersRepository();
    const prismaVisitorsRepository = new PrismaVisitorsRepository();
    const prismaEventsRepository = new PrismaEventsRepository();

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
    const prismaVisitorsRepository = new PrismaVisitorsRepository();

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
