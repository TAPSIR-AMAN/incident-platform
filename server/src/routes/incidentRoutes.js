import express from "express";

import {
    createIncident,
    getIncidents,
    updateIncidentStatus,
} from "../controllers/incidentController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createIncident);

router.get("/", protect, getIncidents);

router.patch(
    "/:id/status",
    protect,
    updateIncidentStatus
);

export default router;