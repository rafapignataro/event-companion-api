import { LocationCategory } from '@prisma/client';

export type CreateLocationCategoryDTO = {
  name: string;
  code: string;
}

export type UpdateLocationCategoryDTO = {
  name: string;
  code: string;
}

export type QueryParamsDTO = {
  name?: string;
  code?: string;
}

export interface LocationCategoriesRepository {
  findByCode(string: string): Promise<LocationCategory>

  findAll(queryParams: QueryParamsDTO): Promise<LocationCategory[]>
}
