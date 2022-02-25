import { APIError } from '../../helpers/Error';

import { BrandsRepository } from '../../repositories/brands/BrandsRepository';

type UpdateBrandRequest = {
  id: number;
  festivalId: number;
}

export class UpdateBrandUseCase {
  constructor(
    private brandsRepository: BrandsRepository,
  ) {}

  public async execute({
    id, festivalId,
  }: UpdateBrandRequest): Promise<void> {
    const brand = await this.brandsRepository.findById(id);

    if (!brand) {
      throw new APIError({
        code: 500,
        message: 'This brand does not exist.',
      });
    }

    await this.brandsRepository.update(id, {
      festivalId,
    });
  }
}
