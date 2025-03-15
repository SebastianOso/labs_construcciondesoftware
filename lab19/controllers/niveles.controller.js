const Nivel = require('../models/nivel.model');

exports.get_agregar = (request, response, next) => {
    console.log(request.session);
    response.render('agregar_nivel', {
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
    });
};


exports.post_agregar = (request, response, next) => {
    console.log(request.body);
    const nivel = new Nivel(request.body.nivel);
    nivel.save()
        .then(() => {
            response.redirect('/niveles/mostrar');
        })
        .catch((error) => {
            console.log(error);
        });
};

exports.get_niveles = (request, response, next) => {
    const mensaje = request.session.info || '';
    if (request.session.info) {
        request.session.info = '';
    }

    Nivel.fetch(request.params.id)
        .then(([rows, fielData])=>{
            console.log(fielData);
            console.log(rows);
            response.render('lista_niveles', {
                niveles: rows,
                isLoggedIn: request.session.isLoggedIn || false,
                username: request.session.username || '',
                info: mensaje,
                privilegios: request.session.privilegios || [],
            });
        }).catch((error)=>{
            console.log(error);
        })

};