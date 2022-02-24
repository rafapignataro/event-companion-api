import { APIError } from '../../helpers/Error';

import { UserTokenProvider } from '../../providers/userTokenProvider/UserTokenProvider';

type EnsureUserAuthenticatedRequest = {
  token: string
}

export class EnsureUserAuthenticatedUseCase {
  constructor(
    private userTokenProvider: UserTokenProvider,
  ) {}

  public async execute({
    token,
  }: EnsureUserAuthenticatedRequest): Promise<void> {
    if (!token) {
      throw new APIError({
        code: 401,
        message: 'Token is missing.',
      });
    }

    try {
      this.userTokenProvider.validate(token);
    } catch {
      throw new APIError({
        code: 401,
        message: 'Token is invalid.',
      });
    }
  }
}
