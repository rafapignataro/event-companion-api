import { Visitor } from '@prisma/client';

export type CreateVisitorDTO = {
  customerId: number;
  eventId: number;
}

export type UpdateVisitorDTO = {
  [key: string]: string
}

export type QueryParamsDTO = {
  customerId?: number;
  eventId?: number;
}

export interface VisitorsRepository {
  findById(id: number): Promise<Visitor>

  findByCustomerAndEventId(customerId: number, eventId: number): Promise<Visitor>

  findAll(queryParams: QueryParamsDTO): Promise<Visitor[]>

  create(data: CreateVisitorDTO): Promise<Visitor>

  update(id: number, data: UpdateVisitorDTO): Promise<Visitor>

  delete(id: number): Promise<void>
}
