exports.post_mail = async (request, response, next) => {
  const { nombre, email, asunto, mensaje } = req.body; 

  // Configura Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'tu_correo@gmail.com', 
      pass: 'tu_contraseña_o_app_password' 
    }
  });

  // Opciones del correo que se enviará
  const mailOptions = {
    from: email, 
    to: 'destinatario@example.com', 
    subject: `Mensaje de ${nombre} - ${asunto}`, 
    text: mensaje 
  };

  try {
    // Envia el correo con Nodemailer
    await transporter.sendMail(mailOptions);
    res.send('Mensaje enviado correctamente'); 
  } catch (error) {
    console.error(error); 
    res.status(500).send('Error al enviar el mensaje'); 
  }
}

exports.get_mail = (request, response, next) => {
  console.log(request.session)
  response.render('lab26', {
      isLoggedIn: request.session.isLoggedIn || false,
      username: request.session.username || ''
  })
}