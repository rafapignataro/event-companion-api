import { Location } from '@prisma/client';

export type CreateLocationDTO = {
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  eventId: number;
  brandId?: number;
  locationCategoryId: number;
}

export type UpdateLocationDTO = {
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  eventId: number;
  brandId?: number;
  locationCategoryId: number;
}

export type QueryParamsDTO = {
  eventId?: number;
  brandId?: number;
}

export interface LocationsRepository {
  findById(id: number): Promise<Location>

  findByEventAndBrandId(eventId: number, brandId: number): Promise<Location>

  findAll(queryParams: QueryParamsDTO): Promise<Location[]>

  create(data: CreateLocationDTO): Promise<Location>

  update(id: number, data: UpdateLocationDTO): Promise<Location>

  delete(id: number): Promise<void>
}
