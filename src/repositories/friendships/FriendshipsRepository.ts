import { Friendship } from '@prisma/client';

export type CreateFriendshipDTO = {
  status: string;
  customerId: number;
  friendId: number;
}

export type UpdateFriendshipDTO = {
  status: string;
  customerId: number;
  friendId: number;
}

export interface FriendshipsRepository {
  findById(id: number): Promise<Friendship>

  findAll(): Promise<Friendship[]>

  create(data: CreateFriendshipDTO): Promise<Friendship>

  update(id: number, data: UpdateFriendshipDTO): Promise<Friendship>

  delete(id: number): Promise<void>
}
