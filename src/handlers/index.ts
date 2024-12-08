import type { Request, Response } from "express";

import User from "../models/User";
import { hashPassword } from "../utils/auth";

export const createAccount = async ( req: Request, res: Response ) => {
  try {
    const { email, password } = req.body;
    
    const slugModule = await import('slug');
    const slug = slugModule.default;

    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new Error("El Usuario con ese Email ya está registrado");
      res.status(409).json({ error: error.message });
      return;
    }

    const handle = slug(req.body.handle, '');
    const handleExists = await User.findOne({ handle });
    if (handleExists) {
      const error = new Error("Nombre de Usuario no disponible");
      res.status(409).json({ error: error.message });
      return;
    }

    const user    = new User(req.body);
    user.password = await hashPassword(password);
    user.handle   = handle;

    await user.save();

    res.status(201).send("Creado correctamente");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
