const Usuarios = require("../models/Usuarios");
const enviarEmail = require('../handlers/emails')

exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta'
    })
}

exports.crearNuevaCuenta = async (req, res)  => {
    const usuario = req.body;

    req.checkBody('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 });
    req.checkBody('confirmar', 'El password confirmado no puede ir vacio').notEmpty();
    req.checkBody('confirmar', 'El password es diferente').equals(req.body.password);

    const errorsExpress = req.validationErrors();


    try {
        
        await Usuarios.create(usuario);
        //url de confirmacion
        const url = `http://${req.headers.host}/confirmar-cuenta/${usuario.email}`;

        //enviar email de confirmacion
        await enviarEmail.enviarEmail({
            usuario,
            url,
            subject: 'Confirma tu cuenta de  Meeti',
            archivo: 'confirmar-cuenta'
        });
        
        //redireccionar
        req.flash('exito', 'Hemos enviado un email, confirma tu cuenta.')
        res.redirect('/iniciar-sesion');
        
        //console.log('Usuario creado', nuevoUsuario)
    } catch (error) {
        
        const erroresSequelize = error.errors.map(err => err.message);
        const errExp = errorsExpress.map(err => err.msg);

        console.log(erroresSequelize);
        console.log(errExp);

        //unir errores
        const listaErrores = [...erroresSequelize, ...errExp];

        //console.log(errorSequelize);
        req.flash('error', listaErrores);
        res.redirect('/crear-cuenta');
    }
}

//confirma la suscripcion del user
exports.confirmarCuenta = async (req, res, next) => {
    //verificar que el usuario existe
    const usuario = await Usuarios.findOne({ where: { email: req.params.correo }});
    console.log(req.params.correo)
    console.log(usuario);
    //si no existe va a redireccionar
    if(!usuario){
        req.flash('error','No existe esa cuenta');
        res.redirect('/crear-cuenta');
        return next();
    }
    //si existe confirmar suscripcion y redirecciona
    usuario.activo = 1;
    await usuario.save();

    req.flash('exito', 'La cuenta se ha confirmado, ya puedes iniciar sesion');
    res.redirect('/iniciar-sesion');
}

//formualrio de inicar sesion
exports.formIniciarSesion = (req, res) => {
    res.render('inicar-sesion', {
        nombrePagina: 'Iniciar Sesion'
    })
}