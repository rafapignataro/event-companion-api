import { APIError } from '../../helpers/Error';

import { LocationsRepository } from '../../repositories/LocationsRepository';
import { EventsRepository } from '../../repositories/EventsRepository';
import { BrandsRepository } from '../../repositories/BrandsRepository';
import { LocationCategoriesRepository } from '../../repositories/LocationCategoriesRepository';

type UpdateLocationRequest = {
  id: number;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  eventId: number;
  brandId?: number;
  locationCategoryCode: string;
}

export class UpdateLocationUseCase {
  constructor(
    private locationsRepository: LocationsRepository,
    private eventsRepository: EventsRepository,
    private brandsRepository: BrandsRepository,
    private locationCategoriesRepository: LocationCategoriesRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    latitude,
    longitude,
    eventId,
    brandId,
    locationCategoryCode,
  }: UpdateLocationRequest): Promise<void> {
    if (!id || !name || !eventId || !locationCategoryCode || !latitude || !longitude) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const locationExists = await this.locationsRepository.findById(id);

    if (!locationExists) {
      throw new APIError({
        code: 500,
        message: 'This location does not exist.',
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

    if (brandId || brandId === null) {
      if (brandId) {
        const brandExists = await this.brandsRepository.findById(brandId);

        if (!brandExists) {
          throw new APIError({
            code: 500,
            message: 'This brand does not exist.',
          });
        }
      }
    }

    await this.locationsRepository.update(locationExists.id, {
      name,
      description,
      latitude,
      longitude,
      eventId,
      brandId,
      locationCategoryId: locationCategoryExists.id,
    });

    await this.eventsRepository.updateVersion(eventId);
  }
}
