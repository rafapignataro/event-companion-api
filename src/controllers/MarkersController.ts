import { Request, Response } from 'express';

import { prisma } from '../infra/prisma';

import { PrismaMarkersRepository } from '../repositories/markers/implementations/PrismaMarkersRepository';
import { PrismaVisitorsRepository } from '../repositories/visitors/implementations/PrismaVisitorsRepository';
import { PrismaEventsRepository } from '../repositories/events/implementations/PrismaEventsRepository';

import { CreateMarkerUseCase } from '../useCases/markers/create-marker-use-case';
import { UpdateMarkerUseCase } from '../useCases/markers/update-marker-use-case';
import { FindMarkersUseCase } from '../useCases/markers/find-all-markers-use-case';

export class MarkersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const prismaVisitorsRepository = new PrismaVisitorsRepository(prisma);
    const prismaMarkersRepository = new PrismaMarkersRepository(prisma);
    const prismaEventsRepository = new PrismaEventsRepository(prisma);

    const createMarkerUseCase = new CreateMarkerUseCase(
      prismaVisitorsRepository,
      prismaMarkersRepository,
      prismaEventsRepository,
    );

    const {
      visitorId, eventId, latitude, longitude,
    } = request.body;

    const marker = await createMarkerUseCase.execute({
      visitorId, eventId, latitude, longitude,
    });

    return response.json(marker);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const prismaVisitorsRepository = new PrismaVisitorsRepository(prisma);
    const prismaMarkersRepository = new PrismaMarkersRepository(prisma);
    const prismaEventsRepository = new PrismaEventsRepository(prisma);

    const updateMarkerUseCase = new UpdateMarkerUseCase(
      prismaVisitorsRepository,
      prismaMarkersRepository,
      prismaEventsRepository,
    );

    const {
      visitorId, eventId, latitude, longitude,
    } = request.body;

    await updateMarkerUseCase.execute({
      visitorId, eventId, latitude, longitude,
    });

    return response.json();
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    const prismaMarkersRepository = new PrismaMarkersRepository(prisma);

    const findMarkersUseCase = new FindMarkersUseCase(
      prismaMarkersRepository,
    );

    const { visitorId, eventId } = request.query;

    const markers = await findMarkersUseCase.execute({
      visitorId: visitorId ? Number(visitorId) : undefined,
      eventId: eventId ? Number(eventId) : undefined,
    });

    return response.json(markers);
  }
}
