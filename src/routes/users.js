import { Router } from "express";

import {
  getAllUsers,
  getUserByEmail,
  getBuscarNombre,
} from "../services/usersServices.js";

const router = Router();

router.get("/", getAllUsers);

router.get("/buscarPorEmail/:email", getUserByEmail);

router.get("/buscarPorNombre/:nombre", async (req, res) => {
  const { nombre } = req.params;
  try {
    const allUsersByName = await getBuscarNombre(nombre);
    res.json(allUsersByName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
