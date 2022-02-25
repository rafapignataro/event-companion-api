import { Brand } from '@prisma/client';

import { APIError } from '../../helpers/Error';
import { UsersRepository } from '../../repositories/users/UsersRepository';
import { BrandsRepository } from '../../repositories/brands/BrandsRepository';

type CreateBrandRequest = {
  userId: number;
  festivalId: number;
}

export class CreateBrandUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private brandsRepository: BrandsRepository,
  ) {}

  public async execute({
    userId,
    festivalId,
  }: CreateBrandRequest): Promise<Brand> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new APIError({
        code: 500,
        message: 'This user does not exist.',
      });
    }

    const brand = await this.brandsRepository.create({
      userId,
      festivalId,
    });

    return brand;
  }
}
