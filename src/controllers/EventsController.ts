import { Request, Response } from 'express';

import { prisma } from '../infra/prisma';

import { PrismaEventsRepository } from '../repositories/events/implementations/PrismaEventsRepository';

import { CreateEventUseCase } from '../useCases/events/create-event-use-case';
import { UpdateEventUseCase } from '../useCases/events/update-event-use-case';
import { FindEventByIdUseCase } from '../useCases/events/find-event-by-id-use-case';
import { FindAllEventsUseCase } from '../useCases/events/find-all-events-use-case';

export class EventsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const prismaEventsRepository = new PrismaEventsRepository(prisma);

    const createEventUseCase = new CreateEventUseCase(
      prismaEventsRepository,
    );

    const {
      name, startDate, endDate, logoURL, eventCategoryId,
    } = request.body;

    const event = await createEventUseCase.execute({
      name, startDate, endDate, logoURL, eventCategoryId,
    });

    return response.json(event);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const prismaEventsRepository = new PrismaEventsRepository(prisma);

    const updateEventUseCase = new UpdateEventUseCase(
      prismaEventsRepository,
    );

    const { id } = request.params;
    const {
      name,
      startDate,
      endDate,
      logoURL,
      eventCategoryId,
    } = request.body;

    await updateEventUseCase.execute({
      id: Number(id),
      name,
      startDate,
      endDate,
      logoURL,
      eventCategoryId,
    });

    return response.json();
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const prismaEventsRepository = new PrismaEventsRepository(prisma);

    const findEventByIdUseCase = new FindEventByIdUseCase(
      prismaEventsRepository,
    );

    const { id } = request.params;

    const event = await findEventByIdUseCase.execute({ id: Number(id) });

    return response.json(event);
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    const prismaEventsRepository = new PrismaEventsRepository(prisma);

    const findAllEventsUseCase = new FindAllEventsUseCase(
      prismaEventsRepository,
    );

    const events = await findAllEventsUseCase.execute();

    return response.json(events);
  }
}
