import { Router } from "express";

const router: Router = Router();

/* Autenticación y Registro */
router.post("/auth/register", (req, res) => {
  res.send("first")
})

export default router;
