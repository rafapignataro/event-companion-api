import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { EventsController } from '../controllers/EventsController';

const eventsController = new EventsController();

const eventsRoutes = Router();

eventsRoutes.use(ensureAuthenticated);

eventsRoutes.post('/', eventsController.create);

eventsRoutes.put('/:id', eventsController.update);

eventsRoutes.get('/:id', eventsController.findById);

eventsRoutes.get('/', eventsController.findAll);

export { eventsRoutes };
