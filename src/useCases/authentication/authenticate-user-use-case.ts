import { APIError } from '../../helpers/Error';

import { HashProvider } from '../../providers/hashProvider/HashProvider';
import { CreateUserTokenData, UserTokenProvider } from '../../providers/userTokenProvider/UserTokenProvider';

import { UsersRepository } from '../../repositories/UsersRepository';

type AuthenticateUserRequest = {
  email: string;
  password: string;
}

type AuthenticateUserResponse = {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  }
}

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private userTokenProvider: UserTokenProvider,
    private hashProvider: HashProvider,
  ) { }

  public async execute({
    email, password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    if (!email || !password) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new APIError({
        code: 401,
        message: 'Email or password are incorrect.',
      });
    }

    const isPasswordCorret = await this.hashProvider.compare(password, user.password);

    if (!isPasswordCorret) {
      throw new APIError({
        code: 401,
        message: 'Email or password are incorrect.',
      });
    }

    const userPayload: CreateUserTokenData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    if (user.role === 'CUSTOMER') {
      userPayload.customerId = user.customer.id;
      userPayload.avatarColor = user.customer.avatarColor;
    }

    const token = this.userTokenProvider.create(userPayload);

    return { token, user: userPayload };
  }
}
