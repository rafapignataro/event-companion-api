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
  findEventByID(id: number): Promise<Event>

  findEvents(): Promise<Event[]>

  createEvent(data: CreateEventDTO): Promise<Event>

  updateEvent(id: number, data: UpdateEventDTO): Promise<Event>

  deleteEvent(id: number): Promise<void>
}
