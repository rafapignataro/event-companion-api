export type CreateUserTokenData = {
  id: number;
  name: string;
  email: string;
}

export interface UserTokenProvider {
  create: (payload: CreateUserTokenData) => Promise<string>;
  validate: (token: string) => Promise<boolean>;
}
