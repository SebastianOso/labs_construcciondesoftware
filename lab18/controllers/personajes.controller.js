//las funciones que estan en personajes se van a a ejecutar aqui
//aqui va la funcion que anteriormente se va puso 
const { info } = require('console');
const path = require('path');

const Personaje= require('../models/personaje.model')

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
    .then(()=>{ //se pasa la logica de la promesa
        request.session.info = `Personaje ${personaje.nombre} guardado.`;
        console.log(`personaje ${this.nombre} agregado`)
        response.redirect('/personajes')
    })//cuando se cumple la promesa
    .catch((error)=>{
        console.log(error)
    }) //cuando no se cumple la promesa
  response.setHeader('Set-Cookie', `ultimo_personaje=${personaje.nombre}`)
  
}

exports.get_lista = (request, response, next) => {
    console.log(request.get('cookie'))
    const mensaje = request.session.info || '';
    if (request.session.info) {
        request.session.info = '';
    }
    Personaje.fetch(request.params.id)
        .then(([rows, fielData]) => {
            console.log(fielData);
            console.log(rows);
            response.render('lista_personajes', {
                personajes: rows,
                isLoggedIn: request.session.isLoggedIn || false,
                username: request.session.username || '',
                info: mensaje,
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_mostrar = (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'lab1.html'));
}