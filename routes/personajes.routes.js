const express = require('express');

const router = express.Router();

const html_header = ``;

const html_content_form = ``;

const html_footer = ``;

let html_card_header = `
`;

let html_card_footer = `

`;

const personajes = [];

//Cuando se registra un middleware con app.get(), 
//el middleware sólo se registra para el método HTTP GET
router.get('/agregar', (request, response, next) => {
  response.render('agregar_personaje')
});

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