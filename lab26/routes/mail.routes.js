const express = require('express');

const router = express.Router();

const mail_controller = require('../controllers/mail.controller')

//Cuando se registra un middleware con app.get(), 
//el middleware sólo se registra para el método HTTP GET


//Cuando se registra un middleware con app.post(), 
//el middleware sólo se registra para el método HTTP POST
router.post('/agregar', mail_controller.post_mail);


router.get('/', mail_controller.get_mail)

module.exports = router;