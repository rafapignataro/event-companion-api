import { APIError } from '../../helpers/Error';

import { BrandsRepository } from '../../repositories/brands/BrandsRepository';
import { EventsRepository } from '../../repositories/events/EventsRepository';

type UpdateBrandRequest = {
  id: number;
  eventId: number;
}

export class UpdateBrandUseCase {
  constructor(
    private brandsRepository: BrandsRepository,
    private eventsRepository: EventsRepository,
  ) {}

  public async execute({
    id, eventId,
  }: UpdateBrandRequest): Promise<void> {
    const brand = await this.brandsRepository.findById(id);

    if (!brand) {
      throw new APIError({
        code: 500,
        message: 'This brand does not exist.',
      });
    }

    const event = await this.eventsRepository.findById(id);

    if (!event) {
      throw new APIError({
        code: 500,
        message: 'This event does not exist.',
      });
    }

    await this.brandsRepository.update(id, {
      eventId,
    });
  }
}
