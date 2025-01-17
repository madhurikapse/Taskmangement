import { Router } from "express";
import { GetAllUsers, getCurrentUser, Login, Logout, Register } from "../controllers/controller.js";

const router = Router();
router.post("/register",Register);
router.post("/login",Login);
router.get('/get-current-user', getCurrentUser)
router.get("/getall", GetAllUsers);
router.post("/logout", Logout);

export default router;