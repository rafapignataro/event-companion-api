import { Router } from 'express';

import { userRoutes } from './userRoutes';
import { customerRoutes } from './customerRoutes';
import { adminRoutes } from './adminRoutes';
import { brandRoutes } from './brandRoutes';
import { eventsRoutes } from './eventsRoutes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/customers', customerRoutes);
routes.use('/admins', adminRoutes);
routes.use('/brands', brandRoutes);
routes.use('/events', eventsRoutes);

export { routes };
