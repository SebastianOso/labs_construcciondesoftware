exports.get_login = (request, response, next) => {
    response.render('login.ejs')
}

exports.post_login = (request, response, next) => {
    response.redirect('/personajes');
};
