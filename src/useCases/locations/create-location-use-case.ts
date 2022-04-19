import { Location } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { LocationsRepository } from '../../repositories/LocationsRepository';
import { EventsRepository } from '../../repositories/EventsRepository';
import { BrandsRepository } from '../../repositories/BrandsRepository';
import { LocationCategoriesRepository } from '../../repositories/LocationCategoriesRepository';

type CreateLocationRequest = {
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  eventId: number;
  brandId?: number;
  locationCategoryCode: string;
}

export class CreateLocationUseCase {
  constructor(
    private locationsRepository: LocationsRepository,
    private brandsRepository: BrandsRepository,
    private eventsRepository: EventsRepository,
    private locationCategoriesRepository: LocationCategoriesRepository,
  ) {}

  public async execute({
    name,
    description,
    latitude,
    longitude,
    eventId,
    brandId,
    locationCategoryCode,
  }: CreateLocationRequest): Promise<Location> {
    if (!name || !eventId || !locationCategoryCode || !latitude || !longitude) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const eventExists = await this.eventsRepository.findById(eventId);

    if (!eventExists) {
      throw new APIError({
        code: 500,
        message: 'This event does not exist.',
      });
    }

    const locationCategoryExists = await this.locationCategoriesRepository.findByCode(
      locationCategoryCode,
    );

    if (!locationCategoryExists) {
      throw new APIError({
        code: 500,
        message: 'This location category does not exist.',
      });
    }

    if (brandId) {
      const brandExists = await this.brandsRepository.findById(brandId);

      if (!brandExists) {
        throw new APIError({
          code: 500,
          message: 'This brand does not exist.',
        });
      }
    }

    const location = await this.locationsRepository.create({
      name,
      description,
      latitude,
      longitude,
      eventId,
      brandId,
      locationCategoryId: locationCategoryExists.id,
    });

    await this.eventsRepository.updateVersion(eventId);

    return location;
  }
}
