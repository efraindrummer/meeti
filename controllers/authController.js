const passport = require("passport");

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/administracion',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

//si el user esta autentiucado
exports.usuarioAutenticado = (req, res, next) => {

    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/iniciar-sesion');
}