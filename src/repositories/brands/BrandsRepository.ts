import { Brand } from '@prisma/client';

export type CreateBrandDTO = {
  userId: number;
  eventId: number;
}

export type UpdateBrandDTO = {
  eventId: number;
}

export interface BrandsRepository {
  findById(id: number): Promise<Brand>

  findAll(): Promise<Brand[]>

  create(data: CreateBrandDTO): Promise<Brand>

  update(id: number, data: UpdateBrandDTO): Promise<Brand>

  delete(id: number): Promise<void>
}
