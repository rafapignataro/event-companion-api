import { User } from '@prisma/client';

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
}

export type UpdateUserDTO = {
  name: string;
  email: string;
}

export type UpdatePasswordDTO = {
  password: string;
}

export interface UsersRepository {
  findById(id: number): Promise<User>

  findByEmail(email: string): Promise<User>

  findAll(): Promise<User[]>

  create(data: CreateUserDTO): Promise<User>

  update(id: number, data: UpdateUserDTO): Promise<User>

  updatePassword(id: number, data: UpdatePasswordDTO): Promise<User>

  delete(id: number): Promise<void>
}
