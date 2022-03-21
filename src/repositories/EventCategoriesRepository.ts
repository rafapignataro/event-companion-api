import { EventCategory } from '@prisma/client';

export type CreateEventCategoryDTO = {
  name: string;
  code: string;
}

export type UpdateEventCategoryDTO = {
  name: string;
  code: string;
}

export type QueryParamsDTO = {
  name?: string;
  code?: string;
}

export interface EventCategoriesRepository {
  findByCode(string: string): Promise<EventCategory>

  findAll(queryParams: QueryParamsDTO): Promise<EventCategory[]>
}
