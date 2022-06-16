"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRoutes = void 0;
const express_1 = require("express");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const LocationsController_1 = require("../controllers/LocationsController");
const locationsController = new LocationsController_1.LocationsController();
const locationRoutes = (0, express_1.Router)();
exports.locationRoutes = locationRoutes;
locationRoutes.use(ensureAuthenticated_1.ensureAuthenticated);
locationRoutes.post('/', locationsController.create);
locationRoutes.put('/:id', locationsController.update);
locationRoutes.delete('/:id', locationsController.delete);
locationRoutes.get('/', locationsController.findAll);
