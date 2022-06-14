import { Brand } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { HashProvider } from '../../providers/hashProvider/HashProvider';

import { UsersRepository } from '../../repositories/UsersRepository';
import { EventsRepository } from '../../repositories/EventsRepository';
import { BrandsRepository } from '../../repositories/BrandsRepository';

type CreateBrandRequest = {
  name: string;
  email: string;
  password: string;
  eventId: number;
}

export class CreateBrandUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private eventsRepository: EventsRepository,
    private brandsRepository: BrandsRepository,
    private hashProvider: HashProvider,
  ) { }

  public async execute({
    name,
    email,
    password,
    eventId,
  }: CreateBrandRequest): Promise<Brand> {
    if (!name || !email || !password || !eventId) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new APIError({
        code: 500,
        message: 'This email is already in use.',
      });
    }

    if (password.length < 6) {
      throw new APIError({
        code: 500,
        message: 'The password must have more than 6 letters.',
      });
    }

    const passwordHash = await this.hashProvider.create(password);

    const event = await this.eventsRepository.findById(eventId);

    if (!event) {
      throw new APIError({
        code: 500,
        message: 'This event does not exist.',
      });
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      role: 'BRAND'
    });

    const brand = await this.brandsRepository.create({
      userId: user.id,
      eventId,
    });

    return brand;
  }
}
