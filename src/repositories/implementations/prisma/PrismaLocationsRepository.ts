import { Location, PrismaClient } from '@prisma/client';

import { prisma, PrismaTransactionClient } from '../../../infra/prisma';

import {
  LocationsRepository, CreateLocationDTO, UpdateLocationDTO, QueryParamsDTO, FindAllLocationsDTO,
} from '../../LocationsRepository';

export class PrismaLocationsRepository implements LocationsRepository {
  private prismaClient: PrismaClient | PrismaTransactionClient = prisma;

  constructor(prismaTransactionClient?: PrismaTransactionClient) {
    if (prismaTransactionClient) this.prismaClient = prismaTransactionClient;
  }

  public async findById(id: number): Promise<Location> {
    const location = await this.prismaClient.location.findUnique({
      where: {
        id,
      },
      include: {
        locationCategory: true,
        activations: true,
      },
    });

    return location;
  }

  public async findByEventAndBrandId(eventId: number, brandId: number): Promise<Location> {
    const location = await this.prismaClient.location.findFirst({
      where: {
        eventId,
        brandId,
      },
      include: {
        locationCategory: true,
        activations: true,
      },
    });

    return location;
  }

  public async findAll({
    authorized,
    eventId,
    brandId,
  }: QueryParamsDTO): Promise<FindAllLocationsDTO[]> {
    const locations = await this.prismaClient.location.findMany({
      where: {
        eventId,
        brandId,
      },
      include: {
        locationCategory: true,
        activations: {
          where: !authorized ? {
            startDate: {
              lte: new Date().toISOString(),
            },
            endDate: {
              gte: new Date().toISOString(),
            },
          } : {},
          orderBy: {
            startDate: 'asc',
          },
        },
      },
    });

    return locations;
  }

  public async create(data: CreateLocationDTO): Promise<Location> {
    const location = await this.prismaClient.location.create({
      data,
    });

    return location;
  }

  public async update(id: number, data: UpdateLocationDTO): Promise<Location> {
    const location = await this.prismaClient.location.update({
      where: {
        id,
      },
      data,
    });

    return location;
  }

  public async delete(id: number): Promise<void> {
    await this.prismaClient.location.delete({
      where: {
        id,
      },
    });
  }
}
