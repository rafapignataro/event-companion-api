import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { FriendshipsController } from '../controllers/FriendshipsController';

const friendshipsController = new FriendshipsController();

const friendshipRoutes = Router();

friendshipRoutes.use(ensureAuthenticated);

friendshipRoutes.post('/', friendshipsController.create);

friendshipRoutes.put('/', friendshipsController.update);

friendshipRoutes.get('/', friendshipsController.findAll);

export { friendshipRoutes };
