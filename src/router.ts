import { Router } from "express";
import { createAccount } from "./handlers";

const router: Router = Router();

/* Autenticación y Registro */
router.post("/auth/register", createAccount);

export default router;