import { Visitor } from '@prisma/client';

import { APIError } from '../../helpers/Error';

import { CustomersRepository } from '../../repositories/customers/CustomersRepository';
import { VisitorsRepository } from '../../repositories/visitors/VisitorsRepository';
import { EventsRepository } from '../../repositories/events/EventsRepository';

type CreateVisitorRequest = {
  customerId: number;
  eventId: number;
}

export class CreateVisitorUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private visitorsRepository: VisitorsRepository,
    private eventsRepository: EventsRepository,
  ) {}

  public async execute({
    customerId,
    eventId,
  }: CreateVisitorRequest): Promise<Visitor> {
    if (!customerId || !eventId) {
      throw new APIError({
        code: 500,
        message: 'There are missing parameters.',
      });
    }

    const customerExists = await this.customersRepository.findById(customerId);

    if (!customerExists) {
      throw new APIError({
        code: 500,
        message: 'This customer does not exist.',
      });
    }

    const eventExists = await this.eventsRepository.findById(eventId);

    if (!eventExists) {
      throw new APIError({
        code: 500,
        message: 'This event does not exist.',
      });
    }

    const visitorRelationExists = await this.visitorsRepository.findByCustomerAndEventId(
      customerId,
      eventId,
    );

    if (visitorRelationExists) {
      throw new APIError({
        code: 500,
        message: 'This customer is already in this event.',
      });
    }

    const visitor = await this.visitorsRepository.create({
      customerId,
      eventId,
    });

    return visitor;
  }
}
