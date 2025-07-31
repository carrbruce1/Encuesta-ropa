import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'brucearr1290@gmail.com', // tu mail
    pass: 'familiacarr123', // clave o app password de Gmail
  },
});

export const enviarMailFeedback = async (estrellas, comentario) => {
  const mailOptions = {
    from: 'tuemail@gmail.com',
    to: 'destino@correo.com',  // mail que recibe los feedbacks
    subject: `Nuevo feedback recibido - ${estrellas} estrellas`,
    text: `Calificación: ${estrellas}/5\nComentario: ${comentario || 'Sin comentario'}`,
  };

  return transporter.sendMail(mailOptions);
};
