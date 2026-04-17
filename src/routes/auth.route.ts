import { Router } from "express";
import { register, login } from "../controllers/auth/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

export default authRoutes;
