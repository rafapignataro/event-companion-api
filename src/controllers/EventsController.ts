import { Request, Response } from 'express';

import { PrismaEventsRepository } from '../repositories/implementations/prisma/PrismaEventsRepository';
import { PrismaEventCategoriesRepository } from '../repositories/implementations/prisma/PrismaEventCategoriesRepository';

import { CreateEventUseCase } from '../useCases/events/create-event-use-case';
import { UpdateEventUseCase } from '../useCases/events/update-event-use-case';
import { FindEventByIdUseCase } from '../useCases/events/find-event-by-id-use-case';
import { FindAllEventsUseCase } from '../useCases/events/find-all-events-use-case';

export class EventsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const prismaEventsRepository = new PrismaEventsRepository();
    const prismaEventCategoriesRepository = new PrismaEventCategoriesRepository();

    const createEventUseCase = new CreateEventUseCase(
      prismaEventsRepository,
      prismaEventCategoriesRepository,
    );

    const {
      name, startDate, endDate, logoURL, eventCategoryCode,
    } = request.body;

    const event = await createEventUseCase.execute({
      name, startDate, endDate, logoURL, eventCategoryCode,
    });

    return response.json(event);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const prismaEventsRepository = new PrismaEventsRepository();
    const prismaEventCategoriesRepository = new PrismaEventCategoriesRepository();

    const updateEventUseCase = new UpdateEventUseCase(
      prismaEventsRepository,
      prismaEventCategoriesRepository,
    );

    const { id } = request.params;
    const {
      name,
      startDate,
      endDate,
      logoURL,
      eventCategoryCode,
    } = request.body;

    await updateEventUseCase.execute({
      id: Number(id),
      name,
      startDate,
      endDate,
      logoURL,
      eventCategoryCode,
    });

    return response.json();
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const prismaEventsRepository = new PrismaEventsRepository();

    const findEventByIdUseCase = new FindEventByIdUseCase(
      prismaEventsRepository,
    );

    const { id } = request.params;

    const event = await findEventByIdUseCase.execute({ id: Number(id) });

    return response.json(event);
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    const prismaEventsRepository = new PrismaEventsRepository();

    const findAllEventsUseCase = new FindAllEventsUseCase(
      prismaEventsRepository,
    );

    const events = await findAllEventsUseCase.execute();

    return response.json(events);
  }
}
