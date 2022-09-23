const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const Rol = require('../models/role');
const Perfil = require('../models/perfil.js');


const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    /*const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite )).populate( { path: "rol" })
    ]);*/

    Usuario.find({}, function (err, usuarios) {
        Perfil.populate(usuarios, { path: "perfil" }, function (err, usuarios) {
          res.json({
                usuarios,

            });
        });
      });

    /*res.json({
    total,
        usuarios
    });*/
}

const usuariosPost = async(req, res = response) => {
    
    const { nombre, correo, login, password, estado, perfil } = req.body;
    const usuario = new Usuario({ nombre, correo, login, password,estado,perfil });

    // Encriptar la contraseña
    //const salt = bcryptjs.genSaltSync();
    //usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async(req, res = response) => {
    const { id,nombre,correo,login ,password,estado,perfil,autorizar} = req.body;

    const dataUpdate={
        _id:id,
        nombre:nombre,
        correo:correo,
        login:login,
        estado:estado,
        perfil:perfil,
        autorizar:autorizar,
    }

    if(password!==undefined & password!=""){
        dataUpdate.password=password
    }


    const usuario = await Usuario.findByIdAndUpdate( id, dataUpdate );

    res.json(usuario);
    /*const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);*/
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );


    res.json(usuario);
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}