import { Request, Response } from 'express';

import { PrismaLocationsRepository } from '../repositories/implementations/prisma/PrismaLocationsRepository';
import { PrismaEventsRepository } from '../repositories/implementations/prisma/PrismaEventsRepository';
import { PrismaBrandsRepository } from '../repositories/implementations/prisma/PrismaBrandsRepository';
import { PrismaLocationCategoriesRepository } from '../repositories/implementations/prisma/PrismaLocationCategoriesRepository';

import { CreateLocationUseCase } from '../useCases/locations/create-location-use-case';
import { DeleteLocationUseCase } from '../useCases/locations/delete-location-use-case';
import { UpdateLocationUseCase } from '../useCases/locations/update-location-use-case';
import { FindLocationsUseCase } from '../useCases/locations/find-all-location-use-case';

export class LocationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const prismaLocationsRepository = new PrismaLocationsRepository();
    const prismaBrandsRepository = new PrismaBrandsRepository();
    const prismaEventsRepository = new PrismaEventsRepository();
    const prismaLocationCategoriesRepository = new PrismaLocationCategoriesRepository();

    const createLocationUseCase = new CreateLocationUseCase(
      prismaLocationsRepository,
      prismaBrandsRepository,
      prismaEventsRepository,
      prismaLocationCategoriesRepository,
    );

    const {
      name, description, latitude, longitude, eventId, brandId, locationCategoryCode,
    } = request.body;

    const location = await createLocationUseCase.execute({
      name, description, latitude, longitude, eventId, brandId, locationCategoryCode,
    });

    return response.json(location);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const prismaLocationsRepository = new PrismaLocationsRepository();
    const prismaEventsRepository = new PrismaEventsRepository();
    const prismaBrandsRepository = new PrismaBrandsRepository();
    const prismaLocationCategoriesRepository = new PrismaLocationCategoriesRepository();

    const updateLocationUseCase = new UpdateLocationUseCase(
      prismaLocationsRepository,
      prismaEventsRepository,
      prismaBrandsRepository,
      prismaLocationCategoriesRepository,
    );

    const { id } = request.params;
    const {
      name, description, latitude, longitude, eventId, brandId, locationCategoryCode,
    } = request.body;

    await updateLocationUseCase.execute({
      id: Number(id),
      name,
      description,
      latitude,
      longitude,
      eventId,
      brandId,
      locationCategoryCode,
    });

    return response.json();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const prismaLocationsRepository = new PrismaLocationsRepository();

    const deleteLocationUseCase = new DeleteLocationUseCase(
      prismaLocationsRepository,
    );

    const { id } = request.params;

    await deleteLocationUseCase.execute({ id: Number(id) });

    return response.json();
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    const prismaLocationsRepository = new PrismaLocationsRepository();

    const findLocationsUseCase = new FindLocationsUseCase(
      prismaLocationsRepository,
    );

    const { user } = request;
    const { eventId, brandId } = request.query;

    const locations = await findLocationsUseCase.execute({
      role: user.role,
      eventId: eventId ? Number(eventId) : undefined,
      brandId: brandId ? Number(brandId) : undefined,
    });

    return response.json(locations);
  }
}
