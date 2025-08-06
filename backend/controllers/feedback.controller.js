import pool from '../db/db-connection.js';

export const guardarFeedback = async (req, res) => {
  const { estrellas, comentario, email } = req.body;

  if (!estrellas || estrellas < 1 || estrellas > 5) {
    return res.status(400).json({ message: 'Estrellas inválidas' });
  }

  let emailValue = null;
  if (email) {
    if (typeof email !== 'string') {
      return res.status(400).json({ message: 'Email inválido' });
    }
    const emailTrim = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailTrim.length > 255 || !emailRegex.test(emailTrim)) {
      return res.status(400).json({ message: 'Email inválido' });
    }
    emailValue = emailTrim;
  }

  try {
    const sql = 'INSERT INTO comentarios (estrellas, comentario, email) VALUES (?, ?, ?)';
    await pool.query(sql, [estrellas, comentario || null, emailValue]);

    let redirectUrl = null;
    if (estrellas >= 4) {
      redirectUrl = 'https://www.google.com/maps/place/H%26Z+indumentaria/@-31.395724,-58.0209471,17z/data=!4m8!3m7!1s0x95ade9005f84d9cb:0x34badc5cce1397d7!8m2!3d-31.3957286!4d-58.0183722!9m1!1b1!16s%2Fg%2F11rj92xbc9?entry=ttu&g_ep=EgoyMDI1MDgwNC4wIKXMDSoASAFQAw%3D%3D';
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

export const obtenerComentarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM comentarios ORDER BY creado_en DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
};