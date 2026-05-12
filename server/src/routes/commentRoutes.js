import express from "express";

import {
    addComment,
    getIncidentTimeline,
} from "../controllers/commentController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
    "/:id/comments",
    protect,
    addComment
);

router.get(
    "/:id/timeline",
    protect,
    getIncidentTimeline
);

export default router;