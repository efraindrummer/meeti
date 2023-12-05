const express = require('express');
const path = require('path');
const router = require('./routes');
const expressEjsLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const expressValidator = require('express-validator');

require('dotenv').config({path: 'variables.env'});
const db = require('./config/db');
require('./models/Usuarios');
require('./models/Categorias');
require('./models/Grupos');

db.sync().then(
    () => console.log('DB CONECTADA')
).catch(
    (error) => console.log(error)
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//expres validator
app.use(expressValidator());

//habilitar ejs como template engine
app.use(expressEjsLayouts);
app.set('view engine', 'ejs');

//ubicacion de vistas
app.set('views', path.join(__dirname, './views'));

//archivos estaticos
app.use(express.static('public'));

//abilitar cookie parser
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

//agrega flashmessages
app.use(flash());

//middleware(usuario logueado, flash messages, fecha actual);
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();
});

//routing
app.use('/', router());
//puerto
app.listen(process.env.PORT, () => {
    console.log('EL servidor esta funcionando');
});