import { Brand } from '@prisma/client';
import { prisma } from '../../../infra/prisma';

import {
  BrandsRepository, CreateBrandDTO, UpdateBrandDTO,
} from '../BrandsRepository';

export class PrismaBrandsRepository implements BrandsRepository {
  public async findById(id: number): Promise<Brand> {
    const brand = await prisma.brand.findUnique({
      where: {
        id,
      },
      include: {
        User: true,
      },
    });

    return brand;
  }

  public async findAll(): Promise<Brand[]> {
    const brands = await prisma.brand.findMany({
      include: {
        User: true,
      },
    });

    return brands;
  }

  public async create(data: CreateBrandDTO): Promise<Brand> {
    const brand = await prisma.brand.create({
      data,
    });

    return brand;
  }

  public async update(id: number, data: UpdateBrandDTO): Promise<Brand> {
    const brand = await prisma.brand.update({
      where: {
        id,
      },
      data,
    });

    return brand;
  }

  public async delete(id: number): Promise<void> {
    await prisma.brand.delete({
      where: {
        id,
      },
    });
  }
}
