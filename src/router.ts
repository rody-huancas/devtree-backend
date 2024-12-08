import { Router } from "express";
import { body } from "express-validator";

import { createAccount, login } from "./handlers";
import { handleInputErrors } from "./middlewares/validation";

const router: Router = Router();

/* Autenticación y Registro */
router.post("/auth/register",
  body("handle")
    .notEmpty()
    .withMessage("El handle no puede ir vacío"),
  body("name")
    .notEmpty()
    .withMessage("El nombre no puede ir vacío"),
  body("email")
    .isEmail()
    .withMessage("E-mail no válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe contener como mínimo 8 caracteres"),
  handleInputErrors,
  createAccount
);

router.post("/auth/login", 
  body("email")
    .isEmail()
    .withMessage("E-mail no válido"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatorio"),
  handleInputErrors,
  login
);

export default router;
