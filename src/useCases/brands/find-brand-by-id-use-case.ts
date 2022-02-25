import { Brand } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { BrandsRepository } from '../../repositories/brands/BrandsRepository';

type FindBrandByIdRequest = {
  id: number;
}

export class FindBrandByIdUseCase {
  constructor(
    private brandsRepository: BrandsRepository,
  ) {}

  public async execute({
    id,
  }: FindBrandByIdRequest): Promise<Brand> {
    const brand = await this.brandsRepository.findById(id);

    if (!brand) {
      throw new APIError({
        code: 500,
        message: 'This brand does not exist.',
      });
    }

    return brand;
  }
}
