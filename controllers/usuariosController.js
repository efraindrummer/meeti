const Usuarios = require("../models/Usuarios");

exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta'
    })
}

exports.crearNuevaCuenta = async (req, res)  => {
    const usuario = req.body;

    req.checkBody('confirmar', 'El password confirmado no puede ir vacio').notEmpty();
    req.checkBody('confirmar', 'El password es diferente').equals(req.body.password);

    const errorsExpress = req.validationErrors();


    try {
        
        await Usuarios.create(usuario);
        
        //redireccionar
        req.flash('exito', 'Hemos enviado un email, confirma tu cuenta.')
        res.redirect('/iniciar-sesion');
        
        //console.log('Usuario creado', nuevoUsuario)
    } catch (error) {
        const errorsSequelize = error.errors.map((err) => err.message);
        const errExp = errorsExpress.map((err) => err.message);

        console.log(errExp);

        //unir errores
        const listErrors = [...errorsSequelize, ...errExp];

        //console.log(errorSequelize);
        req.flash('error', listErrors);
        res.redirect('/crear-cuenta');
    }
}

//formualrio de inicar sesion
exports.formIniciarSesion = (req, res) => {
    res.render('inicar-sesion', {
        nombrePagina: 'Iniciar Sesion'
    })
}