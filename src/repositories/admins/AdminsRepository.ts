import { Admin } from '@prisma/client';

export type CreateAdminDTO = {
  userId: number;
  eventId: number;
}

export type UpdateAdminDTO = {
  eventId: number;
}

export interface AdminsRepository {
  findById(id: number): Promise<Admin>

  findAll(): Promise<Admin[]>

  create(data: CreateAdminDTO): Promise<Admin>

  update(id: number, data: UpdateAdminDTO): Promise<Admin>

  delete(id: number): Promise<void>
}
