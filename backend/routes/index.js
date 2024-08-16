import { Router } from "express";
import AuthRoutes from "./auth.route.js"
import TaskRoutes from "./task.route.js"

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/task", TaskRoutes);

export default router;
