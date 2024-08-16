import { Router } from "express";
import {  AllTasks, createtask, DeleteTask, UpdateTask, YourAddedTasks } from "../controllers/controller.js";
import { checkIsUserValid } from "../middlewares/all.middleware.js";

const router = Router();
router.post("/addtask",checkIsUserValid,createtask);
router.get("/AllTasks",checkIsUserValid,AllTasks);
router.put('/task/update/:id',checkIsUserValid, UpdateTask);
router.delete('/task/delete/:id',checkIsUserValid, DeleteTask);
router.post("/your-added-tasks",checkIsUserValid, YourAddedTasks);

export default router;