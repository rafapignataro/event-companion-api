import { Brand } from '@prisma/client';

import { BrandsRepository } from '../../repositories/BrandsRepository';

export class FindAllBrandsUseCase {
  constructor(
    private brandsRepository: BrandsRepository,
  ) {}

  public async execute(): Promise<Brand[]> {
    const brands = await this.brandsRepository.findAll();

    return brands;
  }
}
