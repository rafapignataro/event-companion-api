import { Customer } from '@prisma/client';

export type CreateCustomerDTO = {
  userId: number;
  avatarColor: string;
}

export type UpdateCustomerDTO = {
  avatarColor: string;
}

export interface CustomersRepository {
  findById(id: number): Promise<any>

  findAll(): Promise<Customer[]>

  search(text: string): Promise<Customer[]>

  create(data: CreateCustomerDTO): Promise<Customer>

  update(id: number, data: UpdateCustomerDTO): Promise<Customer>

  delete(id: number): Promise<void>
}
