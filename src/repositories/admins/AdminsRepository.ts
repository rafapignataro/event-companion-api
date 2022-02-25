import { Admin } from '@prisma/client';

export type CreateAdminDTO = {
  userId: number;
  festivalId: number;
}

export type UpdateAdminDTO = {
  festivalId: number;
}

export interface AdminsRepository {
  findById(id: number): Promise<Admin>

  findAll(): Promise<Admin[]>

  create(data: CreateAdminDTO): Promise<Admin>

  update(id: number, data: UpdateAdminDTO): Promise<Admin>

  delete(id: number): Promise<void>
}
