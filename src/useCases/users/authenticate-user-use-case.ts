import { APIError } from '../../helpers/Error';
import { HashProvider } from '../../providers/hashProvider/HashProvider';
import { UserTokenProvider } from '../../providers/userTokenProvider/UserTokenProvider';
import { UsersRepository } from '../../repositories/users/UsersRepository';

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
  ) {}

  public async execute({
    email, password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
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

    const userPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = await this.userTokenProvider.create(userPayload);

    return { token, user: userPayload };
  }
}
