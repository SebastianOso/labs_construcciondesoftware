//las funciones que estan en personajes se van a a ejecutar aqui
//aqui va la funcion que anteriormente se va puso 
const path = require('path');

const Personaje= require('../models/personaje.model')

exports.get_mail = (request, response, next) => {
    response.send("Formulario de Lab26 aquí");
}

exports.get_agregar = (request, response, next) => {
    console.log(request.session)
    response.render('agregar_personaje', {
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || ''
    })
}


exports.post_agregar = (request, response, next) => {
  console.log(request.body);
  const personaje = new Personaje(request.body.nombre)
  personaje.save()
  response.setHeader('Set-Cookie', `ultimo_personaje=${personaje.nombre}`)
  response.redirect('/personajes')
}

exports.get_lista = (request, response, next) => {
    console.log(request.get('cookie'))
    response.render('lista_personajes', {
        personajes: Personaje.fetchAll(),
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || ''
    });
}

exports.get_mostrar = (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'lab1.html'));
}

