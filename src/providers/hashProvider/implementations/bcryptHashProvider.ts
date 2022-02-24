import bcryptjs from 'bcryptjs';

import { HashProvider } from '../HashProvider';

export class BCryptHashProvider implements HashProvider {
  public async create(string: string) {
    return bcryptjs.hash(string, 16);
  }

  public async compare(string: string, hash: string): Promise<boolean> {
    return bcryptjs.compare(string, hash);
  }
}
