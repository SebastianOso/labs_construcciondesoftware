//las funciones que estan en personajes se van a a ejecutar aqui
//aqui va la funcion que anteriormente se va puso 
exports.get_agregar = (request, response, next) => {
    response.render('agregar_personaje')
}

const personajes = [];

exports.post_agregar = (request, response, next) => {
  console.log(request.body);
  personajes.push(request.body.nombre);
  console.log(personajes);
  response.render('lista_personajes', {
    personajes: personajes,
  });
}