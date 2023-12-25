const Grupos = require('../models/Grupos');

//Muestra el formulario para nuevos meeti
exports.formNuevoMeeti = async (req, res) => {
    const grupos = await Grupos.findAll({ where: { usuarioId: req.user.id }});

    const data = {
        nombrePagina: 'Crear nuevo Meeti',
        grupos,
    }

    res.render('nuevo-meeti', data);
}