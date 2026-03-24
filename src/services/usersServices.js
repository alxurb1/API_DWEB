import { pool } from "../db.js";

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM doc.usuarios");

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM doc.usuarios WHERE email = $1`,
      [email],
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBuscarNombre = async (nombre) => {
  const buscar = `%${nombre}`;

  const result = await pool.query(
    "SELECT * FROM doc.usuarios WHERE nombre LIKE $1",
    [buscar],
  );

  return result.rows;
};
