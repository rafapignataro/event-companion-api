import { Location } from '@prisma/client';

import { LocationsRepository } from '../../repositories/LocationsRepository';

type FindLocationsRequest = {
  eventId?: number;
  brandId?: number;
}

export class FindLocationsUseCase {
  constructor(
    private locationsRepository: LocationsRepository,
  ) {}

  public async execute({ eventId, brandId }: FindLocationsRequest): Promise<Location[]> {
    const locations = await this.locationsRepository.findAll({
      eventId,
      brandId,
    });

    return locations;
  }
}
