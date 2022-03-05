import { Marker } from '@prisma/client';

export type CreateMarkerDTO = {
  visitorId: number;
  eventId: number;
  latitude: string;
  longitude: string;
}

export type UpdateMarkerDTO = {
  latitude: string;
  longitude: string;
}

export type QueryParamsDTO = {
  visitorId?: number;
  eventId?: number;
}

export interface MarkersRepository {
  findById(id: number): Promise<Marker>

  findByVisitorAndEventId(visitorId: number, eventId: number): Promise<Marker>

  findAll(queryParams: QueryParamsDTO): Promise<Marker[]>

  create(data: CreateMarkerDTO): Promise<Marker>

  update(id: number, data: UpdateMarkerDTO): Promise<Marker>

  delete(id: number): Promise<void>
}
