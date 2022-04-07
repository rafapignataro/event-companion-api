import JWT, { sign, verify, JwtPayload } from 'jsonwebtoken';

import { CreateUserTokenData, UserTokenProvider } from '../UserTokenProvider';

export class JwtUserTokenProvider implements UserTokenProvider {
  private secretKey: string;

  constructor() {
    this.secretKey = process.env.JWT_SECRET || '';
  }

  public create(data: CreateUserTokenData) {
    const token = sign(data, this.secretKey, {
      subject: String(data.id),
      expiresIn: '60m',
    });

    return token;
  }

  public validate(token: string) {
    try {
      verify(token, this.secretKey);

      return true;
    } catch {
      return false;
    }
  }

  public decode(token: string) {
    const decoded = JWT.decode(token, {
      json: true,
    });

    return decoded;
  }
}
