import { Brand, PrismaClient } from '@prisma/client';
import { prisma, PrismaTransactionClient } from '../../../infra/prisma';

import {
  BrandsRepository, CreateBrandDTO, UpdateBrandDTO,
} from '../BrandsRepository';

export class PrismaBrandsRepository implements BrandsRepository {
  private prismaClient: PrismaClient | PrismaTransactionClient = prisma;

  constructor(prismaTransactionClient?: PrismaTransactionClient) {
    if (prismaTransactionClient) this.prismaClient = prismaTransactionClient;
  }

  public async findById(id: number): Promise<Brand> {
    const brand = await this.prismaClient.brand.findUnique({
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
    const brands = await this.prismaClient.brand.findMany({
      include: {
        User: true,
      },
    });

    return brands;
  }

  public async create(data: CreateBrandDTO): Promise<Brand> {
    const brand = await this.prismaClient.brand.create({
      data,
    });

    return brand;
  }

  public async update(id: number, data: UpdateBrandDTO): Promise<Brand> {
    const brand = await this.prismaClient.brand.update({
      where: {
        id,
      },
      data,
    });

    return brand;
  }

  public async delete(id: number): Promise<void> {
    await this.prismaClient.brand.delete({
      where: {
        id,
      },
    });
  }
}
