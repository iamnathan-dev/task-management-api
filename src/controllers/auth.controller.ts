import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { full_name, email, password } = req.body;

    const user = await AuthService.register(full_name, email, password);

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    const status = error.statusCode || 400;
    res.status(status).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await AuthService.login(email, password);

    res.status(200).json({ token, user });
  } catch (error: any) {
    const status = error.statusCode || 400;
    res.status(status).json({ error: error.message });
  }
};
