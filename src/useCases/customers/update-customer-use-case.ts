import { APIError } from '../../helpers/Error';

import { UsersRepository } from '../../repositories/UsersRepository';
import { CustomersRepository } from '../../repositories/CustomersRepository';
import { CreateUserTokenData } from '../../providers/userTokenProvider/UserTokenProvider';
import { JwtUserTokenProvider } from '../../providers/userTokenProvider/implementations/jwtUserTokenProvider';

type UpdateCustomerRequest = {
  id: number;
  name: string;
  email: string;
  avatarColor?: string;
}

type UpdateCustomerResponse = {
  token: string,
  user: CreateUserTokenData
}

export class UpdateCustomerUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private customersRepository: CustomersRepository,
    private userTokenProvider: JwtUserTokenProvider,
  ) { }

  public async execute({
    id, name, email, avatarColor,
  }: UpdateCustomerRequest): Promise<UpdateCustomerResponse> {
    if (!id || !name || !email) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new APIError({
        code: 500,
        message: 'This customer does not exist.',
      });
    }

    if (avatarColor) {
      const isAvatarColorCorrect = avatarColor.length === 7 && avatarColor.includes('#');

      if (!isAvatarColorCorrect) {
        throw new APIError({
          code: 500,
          message: 'The avatar color passed is wrong. Ex.: #59FFFF',
        });
      }
    }

    await this.usersRepository.update(customer.userId, {
      name,
      email,
    });

    await this.customersRepository.update(id, {
      avatarColor: avatarColor || customer.avatarColor,
    });

    const userPayload: CreateUserTokenData = {
      id: customer.userId,
      email,
      name,
      role: 'CUSTOMER',
      customerId: customer.id,
      avatarColor,
      events: customer.visitors.map(visitor => ({
        visitorId: visitor.id,
        eventId: visitor.event.id,
      }))
    };

    const token = this.userTokenProvider.create(userPayload);

    return { token, user: userPayload };
  }
}
