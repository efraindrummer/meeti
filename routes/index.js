const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const usuariosController = require('../controllers/usuariosController');

module.exports = function(){
    //ruta de home
    router.get('/', homeController.home);
    //ruta de crar cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearNuevaCuenta);
    router.get('/confirmar-cuenta/:correo', usuariosController.confirmarCuenta);
    
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);

    return router;
}