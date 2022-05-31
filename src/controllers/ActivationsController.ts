import { Request, Response } from 'express';

import { prisma } from '../infra/prisma';

import { PrismaActivationsRepository } from '../repositories/implementations/prisma/PrismaActivationsRepository';
import { PrismaLocationsRepository } from '../repositories/implementations/prisma/PrismaLocationsRepository';

import { CreateActivationUseCase } from '../useCases/activations/create-activation-use-case';
import { DeleteActivationUseCase } from '../useCases/activations/delete-activation-use-case';
import { UpdateActivationUseCase } from '../useCases/activations/update-activation-use-case';
import { FindActivationsUseCase } from '../useCases/activations/find-all-activation-use-case';
import { PrismaEventsRepository } from '../repositories/implementations/prisma/PrismaEventsRepository';

export class ActivationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const activation = await prisma.$transaction(async (prismaClient) => {
      const prismaActivationsRepository = new PrismaActivationsRepository(prismaClient);
      const prismaLocationsRepository = new PrismaLocationsRepository(prismaClient);
      const prismaEventsRepository = new PrismaEventsRepository(prismaClient);

      const createActivationUseCase = new CreateActivationUseCase(
        prismaActivationsRepository,
        prismaLocationsRepository,
        prismaEventsRepository,
      );

      const {
        description, startDate, endDate, locationId,
      } = request.body;

      return createActivationUseCase.execute({
        description, startDate, endDate, locationId,
      });
    }, { maxWait: 10000, timeout: 10000 });

    return response.json(activation);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    await prisma.$transaction(async (prismaClient) => {
      const prismaActivationsRepository = new PrismaActivationsRepository(prismaClient);
      const prismaLocationsRepository = new PrismaLocationsRepository(prismaClient);
      const prismaEventsRepository = new PrismaEventsRepository(prismaClient);

      const updateActivationUseCase = new UpdateActivationUseCase(
        prismaActivationsRepository,
        prismaLocationsRepository,
        prismaEventsRepository,
      );

      const { id } = request.params;
      const {
        description, startDate, endDate, locationId,
      } = request.body;

      await updateActivationUseCase.execute({
        id: Number(id),
        description,
        startDate,
        endDate,
        locationId,
      });
    }, { maxWait: 10000, timeout: 10000 });

    return response.json();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    await prisma.$transaction(async (prismaClient) => {
      const prismaActivationsRepository = new PrismaActivationsRepository(prismaClient);
      const prismaLocationsRepository = new PrismaLocationsRepository(prismaClient);
      const prismaEventsRepository = new PrismaEventsRepository(prismaClient);

      const deleteActivationUseCase = new DeleteActivationUseCase(
        prismaActivationsRepository,
        prismaLocationsRepository,
        prismaEventsRepository,
      );

      const { id } = request.params;

      await deleteActivationUseCase.execute({ id: Number(id) });
    }, { maxWait: 10000, timeout: 10000 });

    return response.json();
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    const prismaActivationsRepository = new PrismaActivationsRepository();

    const findActivationsUseCase = new FindActivationsUseCase(
      prismaActivationsRepository,
    );

    const { locationId } = request.query;

    const activations = await findActivationsUseCase.execute({
      locationId: locationId ? Number(locationId) : undefined,
    });

    return response.json(activations);
  }
}
