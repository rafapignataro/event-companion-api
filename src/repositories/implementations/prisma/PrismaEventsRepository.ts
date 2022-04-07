import { Event, PrismaClient } from '@prisma/client';

import { prisma, PrismaTransactionClient } from '../../../infra/prisma';

import {
  EventsRepository, CreateEventDTO, UpdateEventDTO, EventSummaryDTO,
} from '../../EventsRepository';

export class PrismaEventsRepository implements EventsRepository {
  private prismaClient: PrismaClient | PrismaTransactionClient = prisma;

  constructor(prismaTransactionClient?: PrismaTransactionClient) {
    if (prismaTransactionClient) this.prismaClient = prismaTransactionClient;
  }

  public async findById(id: number): Promise<Event> {
    const event = await this.prismaClient.event.findUnique({
      where: {
        id,
      },
    });

    return event;
  }

  public async findAll(): Promise<Event[]> {
    const events = await this.prismaClient.event.findMany();

    return events;
  }

  public async summary(id: number): Promise<EventSummaryDTO> {
    const event = await this.prismaClient.event.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        version: true,
        brands: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        locations: {
          select: {
            id: true,
            name: true,
            description: true,
            latitude: true,
            longitude: true,
            locationCategory: {
              select: {
                code: true,
                name: true,
              },
            },
            activations: {
              select: {
                id: true,
                name: true,
                description: true,
                startDate: true,
                endDate: true,
              },
            },
          },
        },
      },
    });

    return event;
  }

  public async create(data: CreateEventDTO): Promise<Event> {
    const event = await this.prismaClient.event.create({
      data,
    });

    return event;
  }

  public async update(id: number, data: UpdateEventDTO): Promise<Event> {
    const event = await this.prismaClient.event.update({
      where: {
        id,
      },
      data,
    });

    return event;
  }

  public async delete(id: number): Promise<void> {
    await this.prismaClient.event.delete({
      where: {
        id,
      },
    });
  }
}
