import { Event } from '@prisma/client';
import { prisma } from '../../../infra/prisma';

import {
  EventsRepository, CreateEventDTO, UpdateEventDTO,
} from '../EventsRepository';

export class PrismaEventsRepository implements EventsRepository {
  public async findById(id: number): Promise<Event> {
    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    return event;
  }

  public async findAll(): Promise<Event[]> {
    const events = await prisma.event.findMany();

    return events;
  }

  public async create(data: CreateEventDTO): Promise<Event> {
    const event = await prisma.event.create({
      data,
    });

    return event;
  }

  public async update(id: number, data: UpdateEventDTO): Promise<Event> {
    const event = await prisma.event.update({
      where: {
        id,
      },
      data,
    });

    return event;
  }

  public async delete(id: number): Promise<void> {
    await prisma.event.delete({
      where: {
        id,
      },
    });
  }
}
