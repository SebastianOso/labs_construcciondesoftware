const express = require('express');

const router = express.Router();

const isAuth = require('../util/is-auth')

const personajes_controller = require('../controllers/personajes.controller')



router.get('/chewy', (request, response, next) => {
  response.sendFile(path.join(__dirname, '..', 'views', 'chewy.html'));
}) //cambiarlo despues, pero lo mismo que la de mostrar

//Cuando se registra un middleware con app.get(), 
//el middleware sólo se registra para el método HTTP GET
router.get('/agregar',isAuth, personajes_controller.get_agregar);
router.get('/add', personajes_controller.get_agregar);

//Cuando se registra un middleware con app.post(), 
//el middleware sólo se registra para el método HTTP POST
router.post('/agregar', personajes_controller.post_agregar);

router.get('/mostrar', personajes_controller.get_mostrar)

router.get('/:id', personajes_controller.get_lista)//ruta dinamica
router.get('/', personajes_controller.get_lista)

module.exports = router;