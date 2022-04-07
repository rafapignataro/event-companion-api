import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { EventsController } from '../controllers/EventsController';

const eventsController = new EventsController();

const eventRoutes = Router();

eventRoutes.use(ensureAuthenticated);

eventRoutes.post('/', eventsController.create);

eventRoutes.put('/:id', eventsController.update);

eventRoutes.get('/:id', eventsController.findById);

eventRoutes.get('/:id/summary', eventsController.summary);

eventRoutes.get('/', eventsController.findAll);

export { eventRoutes };
