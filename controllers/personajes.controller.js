//las funciones que estan en personajes se van a a ejecutar aqui
//aqui va la funcion que anteriormente se va puso 
const path = require('path');

const Personaje= require('../models/personaje.model')

exports.get_agregar = (request, response, next) => {
    response.render('agregar_personaje')
}


exports.post_agregar = (request, response, next) => {
  console.log(request.body);
  const personaje = new Personaje(request.body.nombre)
  personaje.save()
  console.log(personajes);
  response.render('lista_personajes', {
    personajes: Personaje.fetchAll(),
  });
}

exports.get_mostrar = (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'lab1.html'));
}