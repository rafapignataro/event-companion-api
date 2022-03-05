import { Event, PrismaClient } from '@prisma/client';

import { prisma, PrismaTransactionClient } from '../../../infra/prisma';

import {
  EventsRepository, CreateEventDTO, UpdateEventDTO,
} from '../EventsRepository';

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
