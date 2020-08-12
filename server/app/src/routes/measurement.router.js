import { Router } from "express";

import MeasurementControllers from "../controllers/measurement.controller";

const router = Router();

router.get("/sensors", MeasurementControllers.getFiveEachMeasurements);

router.get("/average", (req, res) => res.send(`<h1>Average!</h1>`));

export default router;
