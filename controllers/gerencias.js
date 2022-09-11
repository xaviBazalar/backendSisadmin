const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Gerencia = require('../models/gerencia');



const gerenciaGet = async(req = request, res = response) => {

    const { limite = 8, desde = 0 } = req.query;
    const query = { estado: true };


    const [ total, gerencias ] = await Promise.all([
            Gerencia.countDocuments(query),
            Gerencia.find(query)

    ]);

    res.json({
        total,
        gerencias
    });
}

const gerenciaPost = async(req, res = response) => {

    const { nombre_gerencia,estado } = req.body;
    const gerencia = new Gerencia({ nombre_gerencia, estado });

    // Guardar en BD
    await gerencia.save();

    res.json({
        gerencia
    });

}

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
    gerenciaPost,
    gerenciaPatch

}