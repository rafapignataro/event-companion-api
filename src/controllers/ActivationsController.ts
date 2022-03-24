import { Request, Response } from 'express';

import { PrismaActivationsRepository } from '../repositories/implementations/prisma/PrismaActivationsRepository';
import { PrismaLocationsRepository } from '../repositories/implementations/prisma/PrismaLocationsRepository';

import { CreateActivationUseCase } from '../useCases/activations/create-activation-use-case';
import { DeleteActivationUseCase } from '../useCases/activations/delete-activation-use-case';
import { UpdateActivationUseCase } from '../useCases/activations/update-activation-use-case';
import { FindActivationsUseCase } from '../useCases/activations/find-all-activation-use-case';

export class ActivationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const prismaActivationsRepository = new PrismaActivationsRepository();
    const prismaLocationsRepository = new PrismaLocationsRepository();

    const createActivationUseCase = new CreateActivationUseCase(
      prismaActivationsRepository,
      prismaLocationsRepository,
    );

    const {
      name, description, startDate, endDate, locationId,
    } = request.body;

    const activation = await createActivationUseCase.execute({
      name, description, startDate, endDate, locationId,
    });

    return response.json(activation);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const prismaActivationsRepository = new PrismaActivationsRepository();
    const prismaLocationsRepository = new PrismaLocationsRepository();

    const updateActivationUseCase = new UpdateActivationUseCase(
      prismaActivationsRepository,
      prismaLocationsRepository,
    );

    const { id } = request.params;
    const {
      name, description, startDate, endDate, locationId,
    } = request.body;

    await updateActivationUseCase.execute({
      id: Number(id),
      name,
      description,
      startDate,
      endDate,
      locationId,
    });

    return response.json();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const prismaActivationsRepository = new PrismaActivationsRepository();

    const deleteActivationUseCase = new DeleteActivationUseCase(
      prismaActivationsRepository,
    );

    const { id } = request.params;

    await deleteActivationUseCase.execute({ id: Number(id) });

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
