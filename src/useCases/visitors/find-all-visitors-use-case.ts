import { Visitor } from '@prisma/client';

import { VisitorsRepository } from '../../repositories/visitors/VisitorsRepository';

type FindVisitorsRequest = {
  customerId?: number;
  eventId?: number;
}

export class FindVisitorsUseCase {
  constructor(
    private visitorsRepository: VisitorsRepository,
  ) {}

  public async execute({ customerId, eventId }: FindVisitorsRequest): Promise<Visitor[]> {
    const visitors = await this.visitorsRepository.findAll({
      customerId,
      eventId,
    });

    return visitors;
  }
}
