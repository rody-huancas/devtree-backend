import type { Request, Response } from "express";
import User from "../models/User";

export const createAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      const error = new Error("El Usuario ya está registrado");
      res.status(409).json({ error: error.message });
      return;
    }

    const user = new User(req.body);
    await user.save();

    res.status(201).send("Creado correctamente");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
