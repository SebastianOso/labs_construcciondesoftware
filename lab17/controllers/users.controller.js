exports.get_signup = (request, response, next) => {
    response.render('login.ejs', {
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || '',
        isNew: true
    })
}

exports.post_signup = (request, response, next) => {
    const nuevo_usuario = new 
        Usuario(request.body.username, request.body.password);

    nuevo_usuario.save().then(() => {
        response.redirect('/users/login')
    }).catch((error) => {
        console.log(error)
    })
};

exports.get_login = (request, response, next) => {
    response.render('login.ejs', {
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || '',
        isNew: false
    })
}

exports.post_login = (request, response, next) => {
    request.session.username = request.body.username
    request.session.isLoggedIn = true;
    response.redirect('/personajes');
};


exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        //Este código se ejecuta cuando la sesión se elimina.
        response.redirect('/users/login'); 
    });
}