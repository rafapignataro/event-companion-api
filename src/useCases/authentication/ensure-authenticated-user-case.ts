import { APIError } from '../../helpers/Error';

import { UserTokenProvider } from '../../providers/userTokenProvider/UserTokenProvider';

type EnsureAuthenticatedRequest = {
  token: string
}

export class EnsureAuthenticatedUseCase {
  constructor(
    private userTokenProvider: UserTokenProvider,
  ) {}

  public async execute({
    token,
  }: EnsureAuthenticatedRequest): Promise<void> {
    if (!token) {
      throw new APIError({
        code: 401,
        message: 'Not authenticated.',
      });
    }

    const isAuthenticated = this.userTokenProvider.validate(token);

    if (!isAuthenticated) {
      throw new APIError({
        code: 401,
        message: 'Not authenticated.',
      });
    }
  }
}
