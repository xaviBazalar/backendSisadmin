const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Gerencia = require('../models/gerencia');



const gerenciaGet = async(req = request, res = response) => {

    const { limite = 8, desde = 0 } = req.query;
    const query = { estado: true };


    const [ total, gerencias ] = await Promise.all([
            Gerencia.countDocuments(query),
            Gerencia.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        gerencias
    });
}

// const usuariosPost = async(req, res = response) => {
    
//     const { nombre, correo, password, rol } = req.body;
//     const usuario = new Usuario({ nombre, correo, password, rol });

//     // Encriptar la contraseña
//     const salt = bcryptjs.genSaltSync();
//     usuario.password = bcryptjs.hashSync( password, salt );

//     // Guardar en BD
//     await usuario.save();

//     res.json({
//         usuario
//     });
// }

// const usuariosPut = async(req, res = response) => {

//     const { id } = req.params;
//     const { _id, password, google, correo, ...resto } = req.body;

//     if ( password ) {
//         // Encriptar la contraseña
//         const salt = bcryptjs.genSaltSync();
//         resto.password = bcryptjs.hashSync( password, salt );
//     }

//     const usuario = await Usuario.findByIdAndUpdate( id, resto );

//     res.json(usuario);
// }

// const usuariosPatch = (req, res = response) => {
//     res.json({
//         msg: 'patch API - usuariosPatch'
//     });
// }

// const usuariosDelete = async(req, res = response) => {

//     const { id } = req.params;

//     // Fisicamente lo borramos
//     // const usuario = await Usuario.findByIdAndDelete( id );

//     const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );


//     res.json(usuario);
// }


const gerenciaPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - gerenciaPatch'
    });
}




module.exports = {
    gerenciaGet,
    gerenciaPatch
   

    // usuariosGet,
    // usuariosPost,
    // usuariosPut,
    // usuariosPatch,
    // usuariosDelete,
}