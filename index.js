const express = require('express');
const path = require('path');
const router = require('./routes');
const expressEjsLayouts = require('express-ejs-layouts');
require('dotenv').config({path: 'variables.env'});
const flash = require('connect-flash');
const session = require('express-session');
const cookieParse = require('cookie-parser');
const bodyParser = require('body-parser');

const db = require('./config/db');
require('./models/Usuarios');

db.sync().then(
    () => console.log('DB CONECTADA')
).catch(
    (error) => console.log(error)
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//habilitar ejs como template engine
app.use(expressEjsLayouts);
app.set('view engine', 'ejs');

//ubicacion de vistas
app.set('views', path.join(__dirname, './views'));

//archivos estaticos
app.use(express.static('public'));

//middleware(usuario logueado, flash messages, fecha actual);
app.use((req, res, next) => {
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