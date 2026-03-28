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

export const postCrearUsuario = async (
  nombre,
  documento,
  carnet,
  email,
  contrasenia,
) => {
  try {
    const query = `INSERT INTO doc.usuarios (nombre, documento, carnet, email, contrasenia, bloqueado, ultimo_login, activo) 
    VALUES ($1, $2, $3, $4, $5, 'N', null,'A') RETURNING *;`;

    const result = await pool.query(query, [
      nombre,
      documento,
      carnet,
      email,
      contrasenia,
    ]);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const actualizarUsuario = async (usuario) => {
  const query = `UPDATE doc.usuarios SET nombre=$1, documento=$2, carnet=$3, email=$4 , contrasenia=$5 
  WHERE id_usuario = $6 RETURNING *;`;

  try {
    const result = await pool.query(query, usuario);

    if (result.rowCount === 0)
      throw new Error("Usuario no encontrado");

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const eliminarUsuario = async (id_usuario) => {
  try {
    const usuarioEliminar = await pool.query(
      "SELECT * FROM doc.usuarios WHERE id_usuario=$1",
      [id_usuario],
    );

    if (usuarioEliminar.rowCount === 0)
      throw new Error("Usuario no encontrado");

    const result = await pool.query(
      "DELETE FROM doc.usuarios WHERE id_usuario=$1",
      [id_usuario],
    );

    return {
      message: "Usuario eliminado correctamente",
      usuario: usuarioEliminar.rows[0],
    };
  } catch (error) {
    return { error: error.message };
  }
};
