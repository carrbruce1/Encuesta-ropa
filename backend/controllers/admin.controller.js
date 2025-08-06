// import pool from '../db/db-connection.js';

// export const listarComentarios = async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM comentarios ORDER BY creado_en DESC');
//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error al obtener comentarios' });
//   }
// };

// export const eliminarComentario = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await pool.query('DELETE FROM comentarios WHERE id = ?', [id]);
//     res.json({ message: 'Comentario eliminado' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error al eliminar comentario' });
//   }
// };

// export const ocultarComentario = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await pool.query('UPDATE comentarios SET oculto = 1 WHERE id = ?', [id]);
//     res.json({ message: 'Comentario ocultado' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error al ocultar comentario' });
//   }
// };

// export const destacarComentario = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [rows] = await pool.query('SELECT destacado FROM comentarios WHERE id = ?', [id]);
//     if (rows.length === 0) {
//       return res.status(404).json({ message: 'Comentario no encontrado' });
//     }
//     const nuevoEstado = rows[0].destacado ? 0 : 1;
//     await pool.query('UPDATE comentarios SET destacado = ? WHERE id = ?', [nuevoEstado, id]);
//     res.json({ destacado: nuevoEstado });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error al destacar comentario' });
//   }
// };

import pool from '../db/db-connection.js';

// Listar comentarios
export const listarComentarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM comentarios ORDER BY creado_en DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error listarComentarios:', error);
    res.status(500).json({ message: 'Error al obtener comentarios' });
  }
};

// Eliminar comentario por id
export const eliminarComentario = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM comentarios WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    res.json({ ok: true, message: 'Comentario eliminado' });
  } catch (error) {
    console.error('Error eliminarComentario:', error);
    res.status(500).json({ message: 'Error al eliminar comentario' });
  }
};

// Alternar / setear destacado
export const toggleDestacado = async (req, res) => {
  const { id } = req.params;
  try {
    // obtenemos estado actual
    const [rows] = await pool.query('SELECT destacado FROM comentarios WHERE id = ?', [id]);
    if (!rows.length) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    const nuevo = rows[0].destacado ? 0 : 1;
    await pool.query('UPDATE comentarios SET destacado = ? WHERE id = ?', [nuevo, id]);
    res.json({ ok: true, destacado: Boolean(nuevo) });
  } catch (error) {
    console.error('Error toggleDestacado:', error);
    res.status(500).json({ message: 'Error al actualizar destacado' });
  }
};