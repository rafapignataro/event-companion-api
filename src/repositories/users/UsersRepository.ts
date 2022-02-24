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
  findUserByID(id: number): Promise<User>

  findUserByEmail(email: string): Promise<User>

  findUsers(): Promise<User[]>

  createUser(data: CreateUserDTO): Promise<User>

  updateUser(id: number, data: UpdateUserDTO): Promise<User>

  updatePassword(id: number, data: UpdatePasswordDTO): Promise<User>

  deleteUser(id: number): Promise<void>
}
