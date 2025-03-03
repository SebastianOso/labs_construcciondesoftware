const express = require('express');

const router = express.Router();

const personajes_controller = require('../controllers/personajes.controller')

const personajes = [];

router.get('/chewy', (request, response, next) => {
  response.sendFile(path.join(__dirname, '..', 'views', 'chewy.html'));
})

//Cuando se registra un middleware con app.get(), 
//el middleware sólo se registra para el método HTTP GET
router.get('/agregar', personajes_controller.get_agregar );

//Cuando se registra un middleware con app.post(), 
//el middleware sólo se registra para el método HTTP POST
router.post('/agregar', (request, response, next) => {
  console.log(request.body);
  personajes.push(request.body.nombre);
  console.log(personajes);
  response.render('lista_personajes', {
    personajes: personajes,
  });
});

const path = require('path');

router.get('/mostrar', (request, response, next) => {
  response.sendFile(path.join(__dirname, '..', 'views', 'lab1.html'));
})

module.exports = router;