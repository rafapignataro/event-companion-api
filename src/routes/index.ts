import { Router } from 'express';

import { userRoutes } from './userRoutes';
import { eventsRoutes } from './eventsRoutes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/events', eventsRoutes);

export { routes };
