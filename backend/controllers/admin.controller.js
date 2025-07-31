import pool from '../db/db-connection.js';

export const listarComentarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM comentarios ORDER BY creado_en DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener comentarios' });
  }
};
