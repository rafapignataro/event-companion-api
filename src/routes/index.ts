import { Router } from 'express';

import { userRoutes } from './userRoutes';
import { customerRoutes } from './customerRoutes';
import { eventsRoutes } from './eventsRoutes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/customers', customerRoutes);
routes.use('/events', eventsRoutes);

export { routes };
