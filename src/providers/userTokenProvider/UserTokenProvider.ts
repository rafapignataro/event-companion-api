export type CreateUserTokenData = {
  id: number;
  name: string;
  email: string;
  role: string;
  customerId?: number;
  avatarColor?: string;
  events?: {
    visitorId: number;
    eventId: number;
  }[]
}

export type DecodeTokenData = {
  [key: string]: number | string;
}

export interface UserTokenProvider {
  create: (payload: CreateUserTokenData) => string;
  validate: (token: string) => boolean;
  decode: (token: string) => DecodeTokenData;
}
