import { Event } from '@prisma/client';

export type CreateEventDTO = {
  name: string;
  startDate: Date;
  endDate: Date;
  logoURL?: string;
  eventCategoryId: number;
}

export type UpdateEventDTO = {
  name: string;
  startDate: Date;
  endDate: Date;
  logoURL?: string;
  eventCategoryId: number;
}

export interface EventsRepository {
  findById(id: number): Promise<Event>

  findAll(): Promise<Event[]>

  create(data: CreateEventDTO): Promise<Event>

  update(id: number, data: UpdateEventDTO): Promise<Event>

  delete(id: number): Promise<void>
}
