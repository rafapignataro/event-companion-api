import { EventCategory, PrismaClient } from '@prisma/client';

import { prisma, PrismaTransactionClient } from '../../../infra/prisma';

import {
  EventCategoriesRepository,
  QueryParamsDTO,
} from '../../EventCategoriesRepository';

export class PrismaEventCategoriesRepository implements EventCategoriesRepository {
  private prismaClient: PrismaClient | PrismaTransactionClient = prisma;

  constructor(prismaTransactionClient?: PrismaTransactionClient) {
    if (prismaTransactionClient) this.prismaClient = prismaTransactionClient;
  }

  public async findByCode(code: string): Promise<EventCategory> {
    const eventCategory = await this.prismaClient.eventCategory.findUnique({
      where: {
        code,
      },
    });

    return eventCategory;
  }

  public async findAll({ name, code }: QueryParamsDTO): Promise<EventCategory[]> {
    const eventCategories = await this.prismaClient.eventCategory.findMany({
      where: {
        name,
        code,
      },
    });

    return eventCategories;
  }
}
