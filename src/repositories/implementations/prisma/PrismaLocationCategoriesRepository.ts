import { LocationCategory, PrismaClient } from '@prisma/client';

import { prisma, PrismaTransactionClient } from '../../../infra/prisma';

import {
  LocationCategoriesRepository,
  QueryParamsDTO,
} from '../../LocationCategoriesRepository';

export class PrismaLocationCategoriesRepository implements LocationCategoriesRepository {
  private prismaClient: PrismaClient | PrismaTransactionClient = prisma;

  constructor(prismaTransactionClient?: PrismaTransactionClient) {
    if (prismaTransactionClient) this.prismaClient = prismaTransactionClient;
  }

  public async findByCode(code: string): Promise<LocationCategory> {
    const locationCategory = await this.prismaClient.locationCategory.findUnique({
      where: {
        code,
      },
    });

    return locationCategory;
  }

  public async findAll({ name, code }: QueryParamsDTO): Promise<LocationCategory[]> {
    const locationCategories = await this.prismaClient.locationCategory.findMany({
      where: {
        name,
        code,
      },
    });

    return locationCategories;
  }
}
