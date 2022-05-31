import { Activation } from '@prisma/client';

export type CreateActivationDTO = {
  description: string;
  startDate: Date;
  endDate: Date;
  locationId: number;
}

export type UpdateActivationDTO = {
  description: string;
  startDate: Date;
  endDate: Date;
}

export type QueryParamsDTO = {
  locationId?: number;
}

export interface ActivationsRepository {
  findById(id: number): Promise<Activation>

  findAll(queryParams: QueryParamsDTO): Promise<Activation[]>

  create(data: CreateActivationDTO): Promise<Activation>

  update(id: number, data: UpdateActivationDTO): Promise<Activation>

  delete(id: number): Promise<void>
}
