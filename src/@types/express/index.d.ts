import { CreateUserTokenData } from '../../providers/userTokenProvider/UserTokenProvider';

declare global{
  namespace Express {
    interface Request {
      user: CreateUserTokenData | null
    }
  }
}
