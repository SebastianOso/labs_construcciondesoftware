const express = require('express');

const router = express.Router();

const path = require('path');

router.get('/mostrar', (request, response, next) => {
  response.render('mostrar_peliculas')
})

router.get('/director', (request, response, next) => {
    response.render('mostrar_director')
})

router.get('/preguntas', (request, response, next) => {
    response.render('mostrar_pregunta')
})

router.get('/caca', (request, response, next) => {
  response.render('lab26')
})


module.exports = router;