import { Location } from '@prisma/client';

import { LocationsRepository } from '../../repositories/LocationsRepository';

type FindLocationsRequest = {
  role: string;
  eventId?: number;
  brandId?: number;
}

export class FindLocationsUseCase {
  constructor(
    private locationsRepository: LocationsRepository,
  ) {}

  public async execute({ role, eventId, brandId }: FindLocationsRequest): Promise<Location[]> {
    const locations = await this.locationsRepository.findAll({
      authorized: role === 'ADMIN' || role === 'BRAND',
      eventId,
      brandId,
    });

    return locations;
  }
}
