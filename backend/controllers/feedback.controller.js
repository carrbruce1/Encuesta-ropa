import pool from '../db/db-connection.js';

export const guardarFeedback = async (req, res) => {
  const { estrellas, comentario } = req.body;

  if (!estrellas || estrellas < 1 || estrellas > 5) {
    return res.status(400).json({ message: 'Estrellas inválidas' });
  }

  try {
    const sql = 'INSERT INTO comentarios (estrellas, comentario) VALUES (?, ?)';
    await pool.query(sql, [estrellas, comentario]);

    let redirectUrl = null;
    if (estrellas >= 4) {
      redirectUrl = 'https://www.google.com/maps/place/H%26Z+indumentaria/@-31.395724,-58.0209471,17z/data=!4m8!3m7!1s0x95ade9005f84d9cb:0x34badc5cce1397d7!8m2!3d-31.3957286!4d-58.0183722!9m1!1b1!16s%2Fg%2F11rj92xbc9?entry=ttu&g_ep=EgoyMDI1MDcyOC4wIKXMDSoASAFQAw%3D%3D';
    }

    res.status(201).json({
      message: 'Feedback guardado correctamente',
      redirect: redirectUrl
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
