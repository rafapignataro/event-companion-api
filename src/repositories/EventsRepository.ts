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

export type EventSummaryDTO = {
  id: number;
  version: number;
  brands: {
    id: number;
    user: {
      id: number;
      name: string;
      email: string;
    };
  }[];
  locations: {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    locationCategory: {
      code: string;
      name: string;
    };
    activations: {
      id: number;
      name: string;
      description: string;
      startDate: Date;
      endDate: Date;
    }[];
  }[];
}

export interface EventsRepository {
  findById(id: number): Promise<Event>

  findAll(): Promise<Event[]>

  summary(id: number): Promise<EventSummaryDTO>

  create(data: CreateEventDTO): Promise<Event>

  update(id: number, data: UpdateEventDTO): Promise<Event>

  updateVersion(id: number): Promise<void>

  delete(id: number): Promise<void>
}
