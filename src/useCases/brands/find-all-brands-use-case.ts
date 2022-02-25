import { Brand } from '@prisma/client';

import { BrandsRepository } from '../../repositories/brands/BrandsRepository';

export class FindAllBrandsUseCase {
  constructor(
    private brandsRepository: BrandsRepository,
  ) {}

  public async execute(): Promise<Brand[]> {
    const brands = await this.brandsRepository.findAll();

    return brands;
  }
}
