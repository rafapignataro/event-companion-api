import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { EventsController } from '../controllers/EventsController';

const eventsController = new EventsController();

const eventsRoutes = Router();

eventsRoutes.use(ensureAuthenticated);

eventsRoutes.post('/', eventsController.createEvent);

eventsRoutes.put('/:id', eventsController.updateEvent);

eventsRoutes.get('/:id', eventsController.findEventById);

eventsRoutes.get('/', eventsController.findAllEvents);

export { eventsRoutes };
