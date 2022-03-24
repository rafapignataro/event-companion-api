import { Router } from 'express';

import { authenticationRoutes } from './authenticationRoutes';
import { customerRoutes } from './customerRoutes';
import { adminRoutes } from './adminRoutes';
import { brandRoutes } from './brandRoutes';
import { eventRoutes } from './eventRoutes';
import { friendshipRoutes } from './friendshipRoutes';
import { visitorRoutes } from './visitorRoutes';
import { markerRoutes } from './markerRoutes';
import { locationRoutes } from './locationRoutes';
import { activationRoutes } from './activationRoutes';

const routes = Router();

routes.use('/auth', authenticationRoutes);
routes.use('/customers', customerRoutes);
routes.use('/admins', adminRoutes);
routes.use('/brands', brandRoutes);
routes.use('/events', eventRoutes);
routes.use('/friendships', friendshipRoutes);
routes.use('/visitors', visitorRoutes);
routes.use('/markers', markerRoutes);
routes.use('/locations', locationRoutes);
routes.use('/activations', activationRoutes);

export { routes };
