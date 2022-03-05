import { Marker, PrismaClient } from '@prisma/client';

import { prisma, PrismaTransactionClient } from '../../../infra/prisma';

import {
  MarkersRepository, CreateMarkerDTO, UpdateMarkerDTO, QueryParamsDTO,
} from '../../MarkersRepository';

export class PrismaMarkersRepository implements MarkersRepository {
  private prismaClient: PrismaClient | PrismaTransactionClient = prisma;

  constructor(prismaTransactionClient?: PrismaTransactionClient) {
    if (prismaTransactionClient) this.prismaClient = prismaTransactionClient;
  }

  public async findById(id: number): Promise<Marker> {
    const marker = await this.prismaClient.marker.findUnique({
      where: {
        id,
      },
    });

    return marker;
  }

  public async findByVisitorAndEventId(visitorId: number, eventId: number): Promise<Marker> {
    const marker = await this.prismaClient.marker.findFirst({
      where: {
        visitorId,
        eventId,
      },
    });

    return marker;
  }

  public async findAll({ visitorId }: QueryParamsDTO): Promise<Marker[]> {
    const markers = await this.prismaClient.marker.findMany({
      where: {
        visitorId,
      },
    });

    return markers;
  }

  public async create(data: CreateMarkerDTO): Promise<Marker> {
    const marker = await this.prismaClient.marker.create({
      data,
    });

    return marker;
  }

  public async update(id: number, data: UpdateMarkerDTO): Promise<Marker> {
    const marker = await this.prismaClient.marker.update({
      where: {
        id,
      },
      data,
    });

    return marker;
  }

  public async delete(id: number): Promise<void> {
    await this.prismaClient.marker.delete({
      where: {
        id,
      },
    });
  }
}
