const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Tarea = require('../models/tarea');



const tareasGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, tareas ] = await Promise.all([
        Tarea.countDocuments(query),
        Tarea.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        tareas
    });
}

/*
const usuariosPost = async(req, res = response) => {
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}



const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );


    res.json(usuario);
}

*/
const tareasPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - tareasPatch'
    });
}


module.exports = {
    tareasGet,
    tareasPatch
}