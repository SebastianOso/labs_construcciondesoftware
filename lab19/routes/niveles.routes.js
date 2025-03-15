const express = require('express');

const router = express.Router();

const niveles_controller = require('../controllers/niveles.controller')
const canCreateNivel = require('../util/canCreateNivel');



router.get('/chewy', (request, response, next) => {
  response.sendFile(path.join(__dirname, '..', 'views', 'chewy.html'));
}) //cambiarlo despues, pero lo mismo que la de mostrar

//Cuando se registra un middleware con app.get(), 
//el middleware sólo se registra para el método HTTP GET
router.get('/agregar', canCreateNivel, niveles_controller.get_agregar);

router.get('/mostrar', niveles_controller.get_niveles);

//Cuando se registra un middleware con app.post(), 
//el middleware sólo se registra para el método HTTP POST
router.post('/agregar', niveles_controller.post_agregar);

module.exports = router;