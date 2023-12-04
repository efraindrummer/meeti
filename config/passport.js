const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuarios = require('../models/Usuarios5');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    async (email, password, next) => {
        const usuario = await Usuarios.findOne({ email: req.body.email });
        console.log(JSON.stringify(usuario));

        
    }
))