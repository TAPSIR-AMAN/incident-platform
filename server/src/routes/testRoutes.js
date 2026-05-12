import express from "express";

import { protect } from "../middlewares/authMiddleware.js";

import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
    "/admin",
    protect,
    authorize("ADMIN"),
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Admin",
            user: req.user,
        });
    }
);

export default router;