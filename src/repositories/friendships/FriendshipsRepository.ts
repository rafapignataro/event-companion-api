import { Friendship } from '@prisma/client';

export type CreateFriendshipDTO = {
  customerId: number;
  friendId: number;
  status: 'NOT_ACCEPTED' | 'ACCEPTED' | 'REFUSED';
}

export type UpdateFriendshipDTO = {
  status: 'NOT_ACCEPTED' | 'ACCEPTED' | 'REFUSED';
}

export type QueryParamsDTO = {
  customerId?: number
}

export interface FriendshipsRepository {
  findById(id: number): Promise<Friendship>

  findRelation(customerId: number, friendId: number): Promise<Friendship>

  findAll(queryParams: QueryParamsDTO): Promise<Friendship[]>

  create(data: CreateFriendshipDTO): Promise<Friendship>

  update(id: number, data: UpdateFriendshipDTO): Promise<Friendship>

  delete(id: number): Promise<void>
}
