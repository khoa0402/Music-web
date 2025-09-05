import { Router } from "express";
import { protectRoute, requiredAdmin } from "../middleware/auth.middleware.js";
import { getStatus } from "../controller/status.controller.js";

const router = Router();

router.get("/", protectRoute, requiredAdmin, getStatus);

export default router;
