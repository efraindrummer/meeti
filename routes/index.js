const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const gruposController = require('../controllers/gruposController');

module.exports = function(){
    //ruta de home
    router.get('/', homeController.home);
    //ruta de crar cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearNuevaCuenta);
    router.get('/confirmar-cuenta/:correo', usuariosController.confirmarCuenta);
    
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    /* ********* PANEL DE ADMIN *********s */
    router.get('/administracion', authController.usuarioAutenticado, adminController.panelAdministracion);

    /*  nuevos grupos */
    router.get('/nuevo-grupo', authController.usuarioAutenticado, gruposController.formNuevoGrupo);


    return router;
}