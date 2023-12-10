const Categorias = require('../models/Categorias');
const Grupos = require('../models/Grupos');

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    limits: { filesize: 100000},
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname+'/../public/uploads/grupos/');
        },
        filename:(req, file, next) => {
            const extension = file.mimetype.split('/')[1];
            next(null, `${shortid.generate()}.${extension}`);
        }
    })

}

const upload = multer(configuracionMulter).single('imagen');

//sube una imagen en el servidor
exports.subirImagen = (req, res, next) => {
    upload(req, res, function(error){
        if(error){
            if(error instanceof multer.MulterError){
                if(error.code === 'LIMIT_FILE_SIZE'){
                    req.flash('error', 'El archvio es muy grande')
                }else{
                    req.flash('error', error.message)
                }
            }
            res.redirect('back');
            return;
        }else{
            next();
        }
    })
} 

exports.formNuevoGrupo = async(req, res) => {

    const categorias = await Categorias.findAll();
    
    res.render('nuevo-grupo', {
        nombrePagina: 'Crea un nuevo grupo',
        categorias
    });
}

//alamacena los grupos en la base de datos

exports.crearGrupo = async(req, res) => {
    //sanitizar los campos
    req.sanitizeBody('nombre');
    req.sanitizeBody('url');

    const grupo = req.body;
    //alamacena el usuaio autwenticado
    grupo.usuarioId = req.user.id;
    grupo.categoriaId = req.body.categoria;

    //leer la imagen 
    grupo.imagen = req.file.filename;

    
    //console.log(grupo);
    try {
        //alamacenar 
        await Grupos.create(grupo);

        req.flash('exito', 'Se ha creado el grupo correctamente');
        res.redirect('/administracion');
        
    } catch (error) {
        const erroresSequelize = error.errors.map(err => err.message);
        req.flash('error', erroresSequelize);
        res.redirect('/nuevo-grupo');
    }
}